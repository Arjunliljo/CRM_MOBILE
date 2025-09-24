import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";
import {
  getStatusName,
  getBranchName,
  getCountryName,
} from "../../../helpers/bootstrapHelpers";
import { formatDate } from "../../../helpers/dateFormater";

export default function LeadHeader({
  editableLead,
  statuses,
  branches,
  countries,
}) {
  if (!editableLead) return null;

  const hasImage = Boolean(editableLead?.img);
  const getStatusDotColor = (status) => {
    if (!status) return colors.primary;
    const s = String(status).toLowerCase();
    if (s.includes("new") || s.includes("open")) return colors.info;
    if (s.includes("follow") || s.includes("pending")) return colors.warning;
    if (s.includes("rejected") || s.includes("lost")) return colors.error;
    if (s.includes("converted") || s.includes("won") || s.includes("success"))
      return colors.success;
    return colors.secondary;
  };
  const statusDotColor = getStatusDotColor(editableLead?.status);

  const universityText = editableLead?.university || editableLead?.branch || "";
  const countryText =
    editableLead?.countries?.length > 0
      ? editableLead?.countries?.[0]
      : editableLead?.country || "";
  const courseText = editableLead?.course || editableLead?.courseName || false;

  return (
    <View style={styles.header}>
      <View style={styles.headerTop} />
      <View style={styles.headerContent}>
        {hasImage ? (
          <Image source={{ uri: editableLead.img }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>
              {(editableLead?.name || "?").trim().charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.headerInfo}>
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {editableLead.name}
            </Text>
            {Boolean(editableLead?.status) && (
              <View style={styles.statusChip}>
                <Ionicons name="ellipse" size={10} color={statusDotColor} />
                <Text style={styles.statusText}>
                  {getStatusName(editableLead.status, statuses)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.metaRow}>
            {Boolean(universityText) && (
              <View style={styles.metaChip}>
                <Ionicons name="school" size={12} color={colors.primary} />
                <Text style={styles.metaText}>
                  {getBranchName(editableLead.branch, branches)}
                </Text>
              </View>
            )}
            {Boolean(countryText) && (
              <View style={styles.metaChip}>
                <Ionicons name="flag" size={12} color={colors.primary} />
                <Text style={styles.metaText}>
                  {getCountryName(
                    editableLead?.countries?.length > 0
                      ? editableLead?.countries?.[0]
                      : editableLead?.country,
                    countries
                  )}
                </Text>
              </View>
            )}
            {Boolean(courseText) && (
              <View style={styles.metaChip}>
                <Ionicons name="book" size={12} color={colors.primary} />
                <Text style={styles.metaText}>
                  {courseText || "Not provided"}
                </Text>
              </View>
            )}
            {!universityText && !countryText && !courseText && (
              <View style={styles.metaChip}>
                <Ionicons
                  name="information-circle"
                  size={12}
                  color={colors.primary}
                />
                <Text style={styles.metaText}>Not provided</Text>
              </View>
            )}
          </View>
          <View style={styles.badgesRow}>
            {Boolean(editableLead?.followupDate) && (
              <View style={styles.badge}>
                <Ionicons name="calendar" size={12} color={colors.primary} />
                <Text style={styles.badgeText}>
                  {formatDate(editableLead.followupDate)}
                </Text>
              </View>
            )}
            {Boolean(editableLead?.leadSource || editableLead?.source) && (
              <View style={styles.badge}>
                <Ionicons
                  name="chatbox-ellipses"
                  size={12}
                  color={colors.primary}
                />
                <Text style={styles.badgeText}>
                  {editableLead.leadSource || editableLead.source}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
