import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function StatusCard({ statusName, subStatusName }) {
  return (
    <View style={[styles.card, { zIndex: 9000 }]}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Status</Text>
      </View>
      <View style={styles.itemRow}>
        <View style={[styles.iconBadge, { backgroundColor: colors.primary }]}>
          <Ionicons name="ellipse" size={18} color={colors.whiteText} />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemLabel}>Status</Text>
          <Text style={styles.itemValue}>{statusName || "N/A"}</Text>
        </View>
      </View>
      <View style={styles.itemRow}>
        <View style={[styles.iconBadge, { backgroundColor: colors.secondary }]}>
          <Ionicons name="flag" size={18} color={colors.whiteText} />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemLabel}>Substatus</Text>
          <Text style={styles.itemValue}>{subStatusName || "N/A"}</Text>
        </View>
      </View>
    </View>
  );
}
