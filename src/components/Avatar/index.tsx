import React from "react";
import { View, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import ilustrationImage from "../../assets/illustration.png";
import { useAuth } from "../../hooks/auth";

type Props = {
  urlImage: string;
};

export function Avatar({ urlImage }: Props) {
  const { user } = useAuth();
  const { secondary50, secondary70 } = theme.colors;

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.container}
        colors={[secondary50, secondary70]}
      >
        <Image
          source={user.avatar ? { uri: urlImage } : ilustrationImage}
          style={styles.avatar}
        />
      </LinearGradient>
    </View>
  );
}

export default Avatar;
