import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { Feather } from "@expo/vector-icons";

import { Background } from "../../components/Background";
import { CategoryList } from "../../components/CategoryList";
import { Header } from "../../components/Header";
import { GuildIcon } from "../../components/GuildIcon";
import { SquareInput } from "../../components/SquareInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { ModalView } from "../../components/ModalView";
import { Guilds } from "../Guilds";
import { GuildProps } from "../../components/Guild";

import { styles } from "./styles";
import { theme } from "../../global/styles/theme";
import { COLLECTION_APPOINTMENTS } from "../../config/database";

export function AppointmentCreation() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isGuildModalOpen, setIsGuildModalOpen] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  const handleGuildModalOpening = () => {
    setIsGuildModalOpen(true);
  };

  const handleGuildModalClosing = () => {
    setIsGuildModalOpen(false);
  };

  const handleGuildSelection = (selectedGuild: GuildProps) => {
    setGuild(selectedGuild);
    setIsGuildModalOpen(false);
  };

  const handleCategorySelection = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSave = async () => {
    const newAppointment = {
      id: uuid.v4,
      guild,
      selectedCategory,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storageData = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storageData ? JSON.parse(storageData) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Background>
        <ScrollView>
          <Background>
            <Header title="Agendar Partida" />

            <Text
              style={[
                styles.label,
                { marginLeft: 24, marginTop: 36, marginBottom: 18 },
              ]}
            >
              Categoria
            </Text>

            <CategoryList
              hasCheckBox
              handleCategorySelection={handleCategorySelection}
              selectedCategory={selectedCategory}
            />

            <View style={styles.form}>
              <RectButton onPress={handleGuildModalOpening}>
                <View style={styles.server}>
                  {guild.icon ? (
                    <GuildIcon guildId={guild.id} iconId={guild.icon} />
                  ) : (
                    <View style={styles.image} />
                  )}

                  <View style={styles.serverContent}>
                    <Text style={styles.label}>
                      {guild.name ? guild.name : "Selecione um servidor"}
                    </Text>
                  </View>

                  <Feather
                    name="chevron-right"
                    size={18}
                    color={theme.colors.heading}
                  />
                </View>
              </RectButton>

              <View style={styles.field}>
                <View>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Dia e Mês
                  </Text>

                  <View style={styles.column}>
                    <SquareInput maxLength={2} onChangeText={setDay} />
                    <Text style={styles.divider}>/</Text>
                    <SquareInput maxLength={2} onChangeText={setMonth} />
                  </View>
                </View>

                <View>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Hora e minuto
                  </Text>

                  <View style={styles.column}>
                    <SquareInput maxLength={2} onChangeText={setHour} />
                    <Text style={styles.divider}>:</Text>
                    <SquareInput maxLength={2} onChangeText={setMinute} />
                  </View>
                </View>
              </View>

              <View style={[styles.field, { marginBottom: 12 }]}>
                <Text style={styles.label}>Descrição</Text>
                <Text style={styles.limit}>Max 100 caracteres</Text>
              </View>
              <TextArea
                multiline
                maxLength={100}
                numberOfLines={5}
                autoCorrect={false}
                onChangeText={setDescription}
              />

              <View style={styles.footer}>
                <Button title="Agendar" onPress={handleSave} />
              </View>
            </View>
          </Background>
        </ScrollView>
      </Background>
      <ModalView
        visible={isGuildModalOpen}
        closeModal={handleGuildModalClosing}
      >
        <Guilds handleGuildSelection={handleGuildSelection} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
