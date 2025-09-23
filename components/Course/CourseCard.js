import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

const CourseCard = ({ course, university, onPress }) => (
  <TouchableOpacity
    style={styles.courseCard}
    onPress={() => onPress(course)}
    activeOpacity={0.7}
  >
    <View style={styles.courseHeader}>
      <View style={styles.courseInfo}>
        <Text style={styles.courseName} numberOfLines={2}>
          {course.name}
        </Text>
        <View style={styles.universityRow}>
          <Text style={styles.universityFlag}>{university.flag}</Text>
          <Text style={styles.universityName} numberOfLines={1}>
            {university.name}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.infoButton}
        onPress={() => onPress(course)}
      >
        <Ionicons
          name="information-circle-outline"
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>
    </View>

    <View style={styles.courseDetails}>
      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <Ionicons name="school-outline" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{course.degree}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{course.duration}</Text>
        </View>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <Ionicons name="cash-outline" size={16} color={colors.primary} />
          <Text style={styles.detailTextBold}>{course.fee}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{course.startDate}</Text>
        </View>
      </View>
    </View>

    <Text style={styles.courseDescription} numberOfLines={2}>
      {course.description}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  courseCard: {
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
  },
  courseHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
    marginRight: 12,
  },
  courseName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: 6,
  },
  universityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  universityFlag: {
    fontSize: 16,
  },
  universityName: {
    fontSize: 13,
    color: colors.secondaryText,
    fontWeight: "500",
  },
  infoButton: {
    padding: 4,
  },
  courseDetails: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: colors.secondaryText,
    fontWeight: "500",
  },
  detailTextBold: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: "700",
  },
  courseDescription: {
    fontSize: 13,
    color: colors.secondaryText,
    lineHeight: 18,
  },
});

export default CourseCard;
