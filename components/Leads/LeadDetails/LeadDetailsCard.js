import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";
import { formatDate } from "../../../helpers/dateFormater";

export default function LeadDetailsCard({
  isEditing,
  setIsEditing,
  editableLead,
  detailsDraft,
  setDetailsDraft,
  onSave,
  onCancel,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Lead Details</Text>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editChip}
            onPress={() => setIsEditing(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={14} color={colors.primary} />
            <Text style={styles.editChipText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActionsRow}>
            <TouchableOpacity
              style={[styles.editChip, styles.editChipPrimary]}
              onPress={onSave}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark" size={14} color={colors.whiteText} />
              <Text style={styles.editChipTextPrimary}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editChip}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={14} color={colors.primary} />
              <Text style={styles.editChipText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!isEditing ? (
        <>
          <View style={styles.itemRow}>
            <View style={[styles.iconBadge, { backgroundColor: colors.info }]}>
              <Ionicons
                name="chatbox-ellipses"
                size={18}
                color={colors.whiteText}
              />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Source</Text>
              <Text style={styles.itemValue}>
                {editableLead.leadSource || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View
              style={[styles.iconBadge, { backgroundColor: colors.secondary }]}
            >
              <Ionicons name="flag" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Country</Text>
              <Text style={styles.itemValue}>
                {editableLead.country || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View
              style={[styles.iconBadge, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="calendar" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Follow-up</Text>
              <Text style={styles.itemValue}>
                {editableLead.followupDate || "Not set"}
              </Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View
              style={[styles.iconBadge, { backgroundColor: colors.lightText }]}
            >
              <Ionicons name="time" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Created</Text>
              <Text style={styles.itemValue}>
                {editableLead.createdAt || "-"}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Source</Text>
            <TextInput
              style={styles.input}
              value={detailsDraft.leadSource}
              onChangeText={(t) =>
                setDetailsDraft((p) => ({ ...p, leadSource: t }))
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Country</Text>
            <TextInput
              style={styles.input}
              value={detailsDraft.country}
              onChangeText={(t) =>
                setDetailsDraft((p) => ({ ...p, country: t }))
              }
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Follow-up</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={formatDate(detailsDraft.followupDate)}
              onChangeText={(t) =>
                setDetailsDraft((p) => ({ ...p, followupDate: t }))
              }
            />
          </View>
        </View>
      )}
    </View>
  );
}
