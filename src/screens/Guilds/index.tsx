import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { Guild, GuildProps } from "../../components/Guild";
import ListDivider from "../../components/ListDivider";
import { Load } from "../../components/Load";
import { api } from "../../service/api";

import { styles } from "./styles";

type Props = {
  handleGuildSelection: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelection }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [guildsLoading, setGuildsLoading] = useState(true);

  const fetchGuilds = async () => {
    const response = await api.get("/users/@me/guilds");

    setGuilds(response.data);
    setGuildsLoading(false);
  };

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {guildsLoading ? (
        <Load />
      ) : (
        <FlatList
          data={guilds}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Guild data={item} onPress={() => handleGuildSelection(item)} />
          )}
          ListHeaderComponent={() => <ListDivider isCentered />}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          showsVerticalScrollIndicator={false}
          style={styles.guilds}
          contentContainerStyle={{ paddingBottom: 68, paddingTop: 104 }}
        />
      )}
    </View>
  );
}
