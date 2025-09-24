import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function UniversityCTA({ navigation }) {
  return (
    <TouchableOpacity
      style={[styles.ctaCard, { marginTop: 8 }]}
      onPress={() => navigation.navigate("Main", { screen: "University" })}
      activeOpacity={0.85}
    >
      <View style={styles.ctaIconWrap}>
        <Ionicons name="school-outline" size={20} color={colors.primary} />
      </View>
      <View style={styles.ctaTextWrap}>
        <Text style={styles.ctaTitle}>University & Courses</Text>
        <Text style={styles.ctaSubtitle}>Open university selection</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}
