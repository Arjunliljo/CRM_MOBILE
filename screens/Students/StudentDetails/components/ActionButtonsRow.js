import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function ActionButtonsRow({ onCall, onSms, onEmail }) {
  return (
    <View style={styles.actionsRow}>
      <TouchableOpacity
        style={[styles.actionButton, styles.actionPrimary]}
        onPress={onCall}
        activeOpacity={0.8}
      >
        <Ionicons name="call" size={20} color={colors.whiteText} />
        <Text style={styles.actionLabelPrimary}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onSms}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble" size={20} color={colors.primary} />
        <Text style={styles.actionLabel}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={onEmail}
        activeOpacity={0.8}
      >
        <Ionicons name="mail" size={20} color={colors.primary} />
        <Text style={styles.actionLabel}>Email</Text>
      </TouchableOpacity>
    </View>
  );
}
