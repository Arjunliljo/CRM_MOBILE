import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function DocumentsCTA({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.ctaCard}
      onPress={() => navigation.navigate("Main", { screen: "Documents" })}
      activeOpacity={0.85}
    >
      <View style={styles.ctaIconWrap}>
        <Ionicons
          name="document-text-outline"
          size={20}
          color={colors.primary}
        />
      </View>
      <View style={styles.ctaTextWrap}>
        <Text style={styles.ctaTitle}>Add Documents</Text>
        <Text style={styles.ctaSubtitle}>
          Upload certificates and other files
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}
