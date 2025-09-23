import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

export default function UniversityPage() {
  const activities = [
    {
      id: "1",
      type: "shortlist",
      title: "Shortlisted University",
      meta: "New York University • 2 mins ago",
    },
    {
      id: "2",
      type: "note",
      title: "Added note",
      meta: "Scholarship requirements • 12 mins ago",
    },
    {
      id: "3",
      type: "update",
      title: "Updated course preference",
      meta: "Computer Science → Data Science • 1 hr ago",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.iconWrap}>
            <Ionicons name="school-outline" size={20} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>University Selection</Text>
            <Text style={styles.subtitle}>
              Browse and choose universities and courses
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>Open University Selector</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Shortlisted</Text>
        <Text style={styles.placeholder}>No universities shortlisted yet.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        <Text style={styles.placeholder}>We will show suggestions here.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Activity Log</Text>
        {activities.map((a) => (
          <View key={a.id} style={styles.activityRow}>
            <View style={styles.activityIconWrap}>
              <Ionicons
                name={
                  a.type === "shortlist"
                    ? "star-outline"
                    : a.type === "note"
                    ? "create-outline"
                    : "refresh-outline"
                }
                size={16}
                color={colors.primary}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.activityTitle}>{a.title}</Text>
              <Text style={styles.activityMeta}>{a.meta}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.navActive,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 4,
  },
  primaryBtnText: {
    color: colors.whiteText,
    fontWeight: "700",
    fontSize: 14,
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
