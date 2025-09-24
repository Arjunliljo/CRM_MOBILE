import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function ChatCTA({ navigation, leadId, leadName }) {
  return (
    <TouchableOpacity
      style={styles.ctaCard}
      onPress={() =>
        navigation.navigate("LeadChat", {
          leadId,
          leadName,
        })
      }
      activeOpacity={0.85}
    >
      <View style={styles.ctaIconWrap}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={20}
          color={colors.primary}
        />
      </View>
      <View style={styles.ctaTextWrap}>
        <Text style={styles.ctaTitle}>Chat</Text>
        <Text style={styles.ctaSubtitle}>Open student conversation</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}
