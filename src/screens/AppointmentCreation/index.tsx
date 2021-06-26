import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
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

export function AppointmentCreation() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isGuildModalOpen, setIsGuildModalOpen] = useState(false);
  const [selectedGuild, setSelectedGuild] = useState<GuildProps>(
    {} as GuildProps
  );

  const handleGuildModalOpening = () => {
    setIsGuildModalOpen(true);
  };

  const handleGuildModalClosing = () => {
    setIsGuildModalOpen(false);
  };

  const handleGuildSelection = (guild: GuildProps) => {
    setSelectedGuild(guild);
    setIsGuildModalOpen(false);
  };

  const handleCategorySelection = (categoryId: string) => {
    setSelectedCategory(categoryId);
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
                  {selectedGuild.icon ? (
                    <GuildIcon />
                  ) : (
                    <View style={styles.image} />
                  )}

                  <View style={styles.serverContent}>
                    <Text style={styles.label}>
                      {selectedGuild.name
                        ? selectedGuild.name
                        : "Selecione um servidor"}
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
                    <SquareInput maxLength={2} />
                    <Text style={styles.divider}>/</Text>
                    <SquareInput maxLength={2} />
                  </View>
                </View>

                <View>
                  <Text style={[styles.label, { marginBottom: 12 }]}>
                    Hora e minuto
                  </Text>

                  <View style={styles.column}>
                    <SquareInput maxLength={2} />
                    <Text style={styles.divider}>:</Text>
                    <SquareInput maxLength={2} />
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
              />

              <View style={styles.footer}>
                <Button title="Agendar" />
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
