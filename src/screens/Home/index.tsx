import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { FlatList, View } from "react-native";

import { AddButton } from "../../components/AddButton";
import { Appointment } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { CategoryList } from "../../components/CategoryList";
import ListDivider from "../../components/ListDivider";
import { ListHeader } from "../../components/ListHeader";
import Profile from "../../components/Profile";
import { styles } from "./styles";

const appointments = [
  {
    id: "1",
    guild: {
      id: "1",
      name: "lendários",
      icon: null,
      owner: true,
    },
    category: "1",
    date: "22/06 às 20:40",
    description:
      "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
  },

  {
    id: "2",
    guild: {
      id: "1",
      name: "lendários",
      icon: null,
      owner: true,
    },
    category: "1",
    date: "22/06 às 20:40",
    description:
      "É hoje que vamos chegar ao challenger sem perder uma partida da md10",
  },
];

export function Home() {
  const navigation = useNavigation();

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelection = (categoryId: string) => {
    selectedCategory === categoryId
      ? setSelectedCategory("")
      : setSelectedCategory(categoryId);
  };

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <AddButton onPress={() => navigation.navigate("AppointmentCreation")} />
      </View>

      <CategoryList
        selectedCategory={selectedCategory}
        handleCategorySelection={handleCategorySelection}
      />

      <ListHeader leftText="Partidas Agendadas" rightText="Total 6" />

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Appointment
            data={item}
            onPress={() => {
              navigation.navigate("AppointmentDetails");
            }}
          />
        )}
        style={styles.matches}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider />}
        contentContainerStyle={{ paddingBottom: 69 }}
      />
    </Background>
  );
}
