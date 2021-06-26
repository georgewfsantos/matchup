import React, { createContext, useState, ReactNode, useContext } from "react";
import * as AuthSession from "expo-auth-session";
import { api } from "../service/api";
import {
  CDN_IMAGE,
  CLIENT_ID,
  REDIRECT_URI,
  RESPONSE_TYPE,
  SCOPE,
} from "../config";

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
    access_token: string;
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

      if (type === "success") {
        api.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get("/users/@me");

        const firstName = userInfo.data.username.split(" ")[0];
        userInfo.data.avatar =
          userInfo.data.avatar &&
          `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token,
        });
        setAuthLoading(false);
      } else {
        setAuthLoading(false);
      }
    } catch {
      throw new Error("Não foi possível realizar a autenticação.");
    }
  };

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
