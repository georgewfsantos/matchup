import React from "react";
import { View, Text } from "react-native";

type Props = {
  leftText: string;
  rightText: string;
};

import { styles } from "./styles";

export function ListHeader({ leftText, rightText }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.leftText}>{leftText}</Text>
      <Text style={styles.rightText}>{rightText}</Text>
    </View>
  );
}
