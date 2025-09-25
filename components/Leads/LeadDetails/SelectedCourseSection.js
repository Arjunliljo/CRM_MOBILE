import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles as leadDetailsStyles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";
import { getCountryName } from "../../../helpers/bootstrapHelpers";
import { useSelectedUniversity } from "../../../screens/University/hooks/useSelectedUniversity";
import { useNavigation } from "@react-navigation/native";

export default function SelectedCourseSection({
  universityId,
  courseId,
  intakeMonth,
  intakeYear,
  countries,
}) {
  const navigation = useNavigation();
  const uniId =
    typeof universityId === "object" ? universityId?._id : universityId;
  const crsId = typeof courseId === "object" ? courseId?._id : courseId;

  const { data: uniRes } = useSelectedUniversity(uniId);
  const university = uniRes?.data?.data;

  const course = useMemo(() => {
    if (!university || !Array.isArray(university?.courses)) return null;
    return (
      university.courses.find((c) => c?._id === crsId || c?.id === crsId) ||
      null
    );
  }, [university, crsId]);

  const countryName = getCountryName(university?.country, countries);

  const handleEdit = () => {
    navigation.navigate("Main", {
      screen: "University",
      params: {
        university: universityId,
        course: courseId,
      },
    });
  };

  return (
    <View style={leadDetailsStyles.card}>
      <View style={leadDetailsStyles.cardHeaderRow}>
        <Text style={leadDetailsStyles.cardTitle}>Selected Course</Text>
        <TouchableOpacity
          style={leadDetailsStyles.editChip}
          onPress={handleEdit}
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={14} color={colors.primary} />
          <Text style={leadDetailsStyles.editChipText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* University */}
      <View style={leadDetailsStyles.itemRow}>
        <View
          style={[
            leadDetailsStyles.iconBadge,
            { backgroundColor: colors.primary },
          ]}
        >
          <Ionicons name="school" size={18} color={colors.whiteText} />
        </View>
        <View style={leadDetailsStyles.itemContent}>
          <Text style={leadDetailsStyles.itemLabel}>University</Text>
          <Text style={leadDetailsStyles.itemValue}>
            {university?.name || "-"}
          </Text>
          {countryName ? (
            <Text
              style={[
                leadDetailsStyles.itemValue,
                { color: colors.secondaryText },
              ]}
            >
              {countryName}
            </Text>
          ) : null}
        </View>
      </View>

      {/* Course */}
      <View style={leadDetailsStyles.itemRow}>
        <View
          style={[
            leadDetailsStyles.iconBadge,
            { backgroundColor: colors.info },
          ]}
        >
          <Ionicons name="book" size={18} color={colors.whiteText} />
        </View>
        <View style={leadDetailsStyles.itemContent}>
          <Text style={leadDetailsStyles.itemLabel}>Course</Text>
          <Text style={leadDetailsStyles.itemValue}>{course?.name || "-"}</Text>
        </View>
      </View>

      {/* Intake */}
      <View style={leadDetailsStyles.itemRow}>
        <View
          style={[
            leadDetailsStyles.iconBadge,
            { backgroundColor: colors.secondary },
          ]}
        >
          <Ionicons name="calendar" size={18} color={colors.whiteText} />
        </View>
        <View style={leadDetailsStyles.itemContent}>
          <Text style={leadDetailsStyles.itemLabel}>Intake</Text>
          <Text style={leadDetailsStyles.itemValue}>
            {intakeMonth && intakeYear ? `${intakeMonth} ${intakeYear}` : "-"}
          </Text>
        </View>
      </View>
    </View>
  );
}
