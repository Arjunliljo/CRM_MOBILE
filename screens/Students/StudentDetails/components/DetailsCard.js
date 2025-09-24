import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function DetailsCard({
  displayCountries,
  initialFollowup,
  onSave,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    country: "",
    followupDate: initialFollowup || "",
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Student Details</Text>
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
              onPress={() => {
                onSave({
                  country: draft.country,
                  followupDate: draft.followupDate,
                });
                setIsEditing(false);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark" size={14} color={colors.whiteText} />
              <Text style={styles.editChipTextPrimary}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editChip}
              onPress={() => {
                setDraft({ country: "", followupDate: initialFollowup || "" });
                setIsEditing(false);
              }}
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
            <View
              style={[styles.iconBadge, { backgroundColor: colors.secondary }]}
            >
              <Ionicons name="flag" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Countries</Text>
              <Text style={styles.itemValue}>{displayCountries}</Text>
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
                {initialFollowup || "Not set"}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Country</Text>
            <TextInput
              style={styles.input}
              value={draft.country}
              onChangeText={(t) => setDraft((p) => ({ ...p, country: t }))}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Follow-up</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={draft.followupDate}
              onChangeText={(t) => setDraft((p) => ({ ...p, followupDate: t }))}
            />
          </View>
        </View>
      )}
    </View>
  );
}
