import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

/**
 * ActivityLog
 * Props:
 * - title?: string
 * - activities?: Array<{ id: string, type?: string, title: string, meta?: string }>
 */
export default function ActivityLog({
  title = "Activity Log",
  activities = [],
}) {
  const renderIconName = (type) => {
    switch (type) {
      case "call":
        return "call-outline";
      case "sms":
        return "chatbubble-ellipses-outline";
      case "email":
        return "mail-outline";
      case "shortlist":
        return "star-outline";
      case "note":
        return "create-outline";
      case "status":
        return "flag-outline";
      case "doc":
        return "document-text-outline";
      case "university":
      case "course":
        return "school-outline";
      case "update":
      default:
        return "refresh-outline";
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {activities.length === 0 ? (
        <Text style={styles.placeholder}>No activities yet.</Text>
      ) : (
        activities.map((a) => (
          <View key={a.id} style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <Ionicons
                name={renderIconName(a.type)}
                size={16}
                color={colors.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>{a.title}</Text>
              {a.meta ? (
                <Text style={styles.activityMeta}>{a.meta}</Text>
              ) : null}
            </View>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: 8,
  },
  placeholder: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  activityIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: colors.navActive,
    alignItems: "center",
    justifyContent: "center",
  },
  activityTitle: {
    fontSize: 13,
    color: colors.primaryText,
    fontWeight: "600",
  },
  activityMeta: {
    fontSize: 11,
    color: colors.secondaryText,
    marginTop: 2,
  },
});
