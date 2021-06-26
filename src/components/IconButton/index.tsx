import React from "react";
import {
  Image,
  View,
  Text,
} from "react-native";
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';


import discordImage from "../../assets/discord.png";
import { styles } from "./styles";

type Props = RectButtonProps & {
  title: string;
};

export function IconButton({ title, ...rest }: Props) {
  return (
    <RectButton style={styles.container} {...rest}>
      <View style={styles.iconWrapper}>
        <Image source={discordImage} style={styles.icon} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
}
