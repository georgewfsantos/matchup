import React, { createContext, useState, ReactNode, useContext } from "react";
import * as AuthSession from "expo-auth-session";
import { api } from "../service/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_USERS } from "../config/database";
import { useEffect } from "react";

const { CDN_IMAGE } = process.env;
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;
const { SCOPE } = process.env;

type User = {
  id: string;
  userName: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
};

type AuthContextData = {
  user: User;
  authLoading: boolean;
  signIn: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

const AuthContext = createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [authLoading, setAuthLoading] = useState(false);

  const signIn = async () => {
    try {
      setAuthLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success" && !params.error) {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get("/users/@me");

        const firstName = userInfo.data.username.split(" ")[0];
        userInfo.data.avatar =
          userInfo.data.avatar &&
          `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token,
        };

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));
        setUser(userData);
      }
    } catch {
      throw new Error("Não foi possível realizar a autenticação.");
    } finally {
      setAuthLoading(false);
    }
  };

  const getUserDataFromStorage = async () => {
    const storageData = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storageData) {
      const loggedUser = JSON.parse(storageData) as User;
      api.defaults.headers.authorization = `Bearer ${loggedUser.token}`;

      setUser(loggedUser);
    }
  };

  useEffect(() => {
    getUserDataFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
