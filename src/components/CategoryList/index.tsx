import React from "react";
import { ScrollView } from "react-native";

import { categories } from "../../utils/categories";
import { Category } from "../Category";
import { styles } from "./styles";

type Props = {
  selectedCategory: string;
  handleCategorySelection: (categoryId: string) => void;
  hasCheckBox?: boolean;
};

export function CategoryList({
  selectedCategory,
  handleCategorySelection,
  hasCheckBox = false,
}: Props) {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 40, paddingLeft: 4 }}
    >
      {categories.map((category) => (
        <Category
          key={category.id}
          title={category.title}
          icon={category.icon}
          checked={category.id === selectedCategory}
          onPress={() => handleCategorySelection(category.id)}
          hasCheckBox={hasCheckBox}
        />
      ))}
    </ScrollView>
  );
}
