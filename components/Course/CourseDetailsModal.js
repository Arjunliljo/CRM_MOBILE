import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

const CourseDetailsModal = ({
  visible,
  onClose,
  course,
  university,
  onApply,
}) => {
  const [selectedIntakeMonth, setSelectedIntakeMonth] = useState("");
  const [selectedIntakeYear, setSelectedIntakeYear] = useState("");

  if (!course) return null;

  // Generate available years (current year + next 2 years)
  const currentYear = new Date().getFullYear();
  const availableYears = [currentYear, currentYear + 1, currentYear + 2];

  const handleSelectCourse = () => {
    if (!selectedIntakeMonth || !selectedIntakeYear) {
      Alert.alert(
        "Selection Required",
        "Please select both intake month and year before proceeding.",
        [{ text: "OK" }]
      );
      return;
    }

    // Call the onApply function with intake details
    onApply({
      course,
      university,
      intakeMonth: selectedIntakeMonth,
      intakeYear: selectedIntakeYear,
    });
  };

  // Reset selections when modal closes
  const handleClose = () => {
    setSelectedIntakeMonth("");
    setSelectedIntakeYear("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Course Details</Text>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={24} color={colors.primaryText} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.courseDetailCard}>
            <Text style={styles.courseDetailName}>{course.name}</Text>

            <View style={styles.universityDetailRow}>
              <Text style={styles.universityFlag}>{university.flag}</Text>
              <View>
                <Text style={styles.universityDetailName}>
                  {university.name}
                </Text>
                <Text style={styles.universityDetailLocation}>
                  {university.location}
                </Text>
              </View>
            </View>

            <View style={styles.courseMetrics}>
              <View style={styles.metricCard}>
                <Ionicons
                  name="school-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.metricLabel}>Degree</Text>
                <Text style={styles.metricValue}>{course.degree}</Text>
              </View>
              <View style={styles.metricCard}>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.metricLabel}>Duration</Text>
                <Text style={styles.metricValue}>{course.duration}</Text>
              </View>
              <View style={styles.metricCard}>
                <Ionicons
                  name="cash-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.metricLabel}>Fee</Text>
                <Text style={styles.metricValue}>{course.fee}</Text>
              </View>
              <View style={styles.metricCard}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.metricLabel}>Start Date</Text>
                <Text style={styles.metricValue}>{course.startDate}</Text>
              </View>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{course.description}</Text>
            </View>

            <View style={styles.requirementsSection}>
              <Text style={styles.sectionTitle}>Requirements</Text>
              {course.requirements.map((req, index) => (
                <View key={index} style={styles.requirementItem}>
                  <Ionicons
                    name="checkmark-circle"
                    size={16}
                    color={colors.success}
                  />
                  <Text style={styles.requirementText}>{req}</Text>
                </View>
              ))}
            </View>

            <View style={styles.scholarshipsSection}>
              <Text style={styles.sectionTitle}>Scholarships Available</Text>
              {course.scholarships.map((scholarship, index) => (
                <View key={index} style={styles.scholarshipItem}>
                  <Ionicons name="star" size={16} color={colors.warning} />
                  <Text style={styles.scholarshipText}>{scholarship}</Text>
                </View>
              ))}
            </View>

            {/* Intake Selection Section */}
            <View style={styles.intakeSelectionSection}>
              <Text style={styles.sectionTitle}>Select Intake</Text>

              {/* Intake Month Selection */}
              <View style={styles.selectionGroup}>
                <Text style={styles.selectionLabel}>Intake Month</Text>
                <View style={styles.optionsContainer}>
                  {course.intakeMonth.map((month, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionChip,
                        selectedIntakeMonth === month &&
                          styles.optionChipSelected,
                      ]}
                      onPress={() => setSelectedIntakeMonth(month)}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          selectedIntakeMonth === month &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {month}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Intake Year Selection */}
              <View style={styles.selectionGroup}>
                <Text style={styles.selectionLabel}>Intake Year</Text>
                <View style={styles.optionsContainer}>
                  {availableYears.map((year, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionChip,
                        selectedIntakeYear === year.toString() &&
                          styles.optionChipSelected,
                      ]}
                      onPress={() => setSelectedIntakeYear(year.toString())}
                    >
                      <Text
                        style={[
                          styles.optionChipText,
                          selectedIntakeYear === year.toString() &&
                            styles.optionChipTextSelected,
                        ]}
                      >
                        {year}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Selected Intake Summary */}
              {(selectedIntakeMonth || selectedIntakeYear) && (
                <View style={styles.selectionSummary}>
                  <Ionicons name="calendar" size={16} color={colors.primary} />
                  <Text style={styles.selectionSummaryText}>
                    {selectedIntakeMonth && selectedIntakeYear
                      ? `Selected: ${selectedIntakeMonth} ${selectedIntakeYear}`
                      : "Please complete your intake selection"}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalActions}>
          <TouchableOpacity
            style={[
              styles.applyButton,
              (!selectedIntakeMonth || !selectedIntakeYear) &&
                styles.applyButtonDisabled,
            ]}
            onPress={handleSelectCourse}
          >
            <Text
              style={[
                styles.applyButtonText,
                (!selectedIntakeMonth || !selectedIntakeYear) &&
                  styles.applyButtonTextDisabled,
              ]}
            >
              Select Course
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryText,
  },
  closeButton: {
    padding: 8,
  },
  modalContent: {
    flex: 1,
  },
  courseDetailCard: {
    margin: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 20,
  },
  courseDetailName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: 12,
  },
  universityDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  universityFlag: {
    fontSize: 16,
  },
  universityDetailName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
  },
  universityDetailLocation: {
    fontSize: 14,
    color: colors.secondaryText,
  },
  courseMetrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    fontWeight: "500",
  },
  metricValue: {
    fontSize: 14,
    color: colors.primaryText,
    fontWeight: "700",
    textAlign: "center",
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: colors.secondaryText,
    lineHeight: 20,
  },
  requirementsSection: {
    marginBottom: 24,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: colors.primaryText,
    flex: 1,
  },
  scholarshipsSection: {
    marginBottom: 24,
  },
  scholarshipItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  scholarshipText: {
    fontSize: 14,
    color: colors.primaryText,
    flex: 1,
  },
  modalActions: {
    padding: 16,
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: colors.whiteText,
    fontSize: 16,
    fontWeight: "700",
  },
  applyButtonDisabled: {
    backgroundColor: colors.secondaryText,
    opacity: 0.6,
  },
  applyButtonTextDisabled: {
    color: colors.background,
  },
  intakeSelectionSection: {
    marginBottom: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  selectionGroup: {
    marginBottom: 20,
  },
  selectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.inputBackground,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionChipText: {
    fontSize: 14,
    color: colors.primaryText,
    fontWeight: "500",
  },
  optionChipTextSelected: {
    color: colors.whiteText,
    fontWeight: "600",
  },
  selectionSummary: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.navActive,
    borderRadius: 8,
  },
  selectionSummaryText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
    flex: 1,
  },
});

export default CourseDetailsModal;
