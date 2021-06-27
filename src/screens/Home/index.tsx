import React, { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FlatList, View } from "react-native";

import { AddButton } from "../../components/AddButton";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { Background } from "../../components/Background";
import { CategoryList } from "../../components/CategoryList";
import ListDivider from "../../components/ListDivider";
import Profile from "../../components/Profile";
import { COLLECTION_APPOINTMENTS } from "../../config/database";
import { styles } from "./styles";
import { Load } from "../../components/Load";
import { ListHeader } from "../../components/ListHeader";

export function Home() {
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("");

  const navigation = useNavigation();

  console.log(appointments);

  const handleCategorySelection = (categoryId: string) => {
    selectedCategory === categoryId
      ? setSelectedCategory("")
      : setSelectedCategory(categoryId);
    console.log(categoryId);
  };

  const getAppointmentsFromStorage = async () => {
    const storageData = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointmentsFromStorage: AppointmentProps[] = storageData
      ? JSON.parse(storageData)
      : [];

    if (selectedCategory) {
      setAppointments(
        appointmentsFromStorage.filter((appointment) => {
          appointment.category === selectedCategory;
          console.log(appointments);
        })
      );
    } else {
      setAppointments(appointmentsFromStorage);
    }

    setAppointmentsLoading(false);
  };

  const navigateToAppointmentDetails = (selectedGuild: AppointmentProps) => {
    navigation.navigate("AppointmentDetails", { selectedGuild });
  };

  useFocusEffect(
    useCallback(() => {
      getAppointmentsFromStorage();
    }, [selectedCategory])
  );

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

      {appointmentsLoading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            leftText="Partidas Agendadas"
            rightText={`Total ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => navigateToAppointmentDetails(item)}
              />
            )}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        </>
      )}
    </Background>
  );
}
