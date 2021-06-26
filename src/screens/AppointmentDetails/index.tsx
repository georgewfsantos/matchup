import React from "react";
import { FlatList, ImageBackground, Text, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { ListHeader } from "../../components/ListHeader";

import { theme } from "../../global/styles/theme";
import BannerImage from "../../assets/banner.png";
import { styles } from "./styles";
import { Member, MemberProps } from "../../components/Member";
import ListDivider from "../../components/ListDivider";
import { IconButton } from "../../components/IconButton";

export function AppointmentDetails() {
  const members = [
    {
      id: "1",
      username: "John Doe",
      avatar_url: "https://github.com/georgewfsantos.png",
      status: "online",
    },
    {
      id: "2",
      username: "Someone",
      avatar_url: "https://github.com/georgewfsantos.png",
      status: "ocupado",
    },
  ];
  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImage} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>Lendários</Text>
          <Text style={styles.statement}>
            É hoje que vamos chegar ao challenger sem perder uma partida da md10
          </Text>
        </View>
      </ImageBackground>

      <ListHeader leftText="Jogadores" rightText="Total 3" />

      <FlatList
        data={members}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Member data={item} />}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.memberList}
      />

      <View style={styles.footer}>
        <IconButton title="Entrar na partida" />
      </View>
    </Background>
  );
}
