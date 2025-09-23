import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";

const UniversityCard = ({ university, onPress }) => (
  <TouchableOpacity
    style={styles.universityCard}
    onPress={() => onPress(university)}
    activeOpacity={0.7}
  >
    <View style={styles.universityHeader}>
      <View style={styles.universityLogo}>
        <Text style={styles.logoText}>{university.name.charAt(0)}</Text>
      </View>
      <View style={styles.universityInfo}>
        <Text style={styles.universityName} numberOfLines={2}>
          {university.name}
        </Text>
        <View style={styles.locationRow}>
          <Text style={styles.countryFlag}>{university.flag}</Text>
          <Text style={styles.universityLocation}>{university.location}</Text>
        </View>
        <Text style={styles.universityRanking}>{university.ranking}</Text>
      </View>
    </View>

    <View style={styles.coursesPreview}>
      <Text style={styles.coursesCount}>
        {university.courses.length} Course
        {university.courses.length !== 1 ? "s" : ""} Available
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  universityCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    position: "relative",
  },
  universityHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    gap: 12,
  },
  universityLogo: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.whiteText,
  },
  universityInfo: {
    flex: 1,
  },
  universityName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  countryFlag: {
    fontSize: 16,
  },
  universityLocation: {
    fontSize: 13,
    color: colors.secondaryText,
  },
  universityRanking: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
  coursesPreview: {
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 12,
  },
  coursesCount: {
    fontSize: 13,
    color: colors.secondaryText,
    fontWeight: "600",
    marginBottom: 8,
  },
});

export default UniversityCard;
