import React from "react";
import { View, Text, Image, Alert } from "react-native";

import illustrationImage from "../../assets/illustration.png";
import { IconButton } from "../../components/IconButton";
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator } from "react-native";
import { theme } from "../../global/styles/theme";

export function SignIn() {
  const { signIn, authLoading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={illustrationImage}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {"\n"}e organize suas {"\n"}
            jogatinas
          </Text>

          <Text style={styles.secondaryTitle}>
            Crie grupos para jogar seus games {"\n"}
            favoritos com seus amigos
          </Text>

          {authLoading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <IconButton title="Entrar com Discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}
