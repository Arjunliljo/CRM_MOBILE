import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";

export default function PrimaryActions({ phone, email }) {
  const handleCall = () => {
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  const handleSms = () => {
    if (phone) Linking.openURL(`sms:${phone}`);
  };

  const handleEmail = () => {
    if (email) Linking.openURL(`mailto:${email}`);
  };

  return (
    <View style={styles.actionsRow}>
      <TouchableOpacity
        style={[styles.actionButton, styles.actionPrimary]}
        onPress={handleCall}
        activeOpacity={0.8}
      >
        <Ionicons name="call" size={20} color={colors.whiteText} />
        <Text style={styles.actionLabelPrimary}>Call</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleSms}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble" size={20} color={colors.primary} />
        <Text style={styles.actionLabel}>Message</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleEmail}
        activeOpacity={0.8}
      >
        <Ionicons name="mail" size={20} color={colors.primary} />
        <Text style={styles.actionLabel}>Email</Text>
      </TouchableOpacity>
    </View>
  );
}
