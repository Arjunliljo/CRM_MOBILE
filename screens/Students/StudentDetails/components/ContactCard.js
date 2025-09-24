import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function ContactCard({ initial, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState({
    phone: initial?.phone || "",
    email: initial?.email || "",
    district: initial?.district || "",
  });

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Student Contact</Text>
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
                onSave(draft);
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
                setDraft({
                  phone: initial?.phone || "",
                  email: initial?.email || "",
                  district: initial?.district || "",
                });
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
              style={[styles.iconBadge, { backgroundColor: colors.success }]}
            >
              <Ionicons name="call" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Phone</Text>
              <Text style={styles.itemValue}>
                {initial?.phone || "Not provided"}
              </Text>
            </View>
          </View>
          <View style={styles.itemRow}>
            <View
              style={[styles.iconBadge, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="mail" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Email</Text>
              <Text style={styles.itemValue}>
                {initial?.email || "Not provided"}
              </Text>
            </View>
          </View>
          <View style={styles.itemRow}>
            <View
              style={[styles.iconBadge, { backgroundColor: colors.warning }]}
            >
              <Ionicons name="location" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>District</Text>
              <Text style={styles.itemValue}>
                {initial?.district || "Not provided"}
              </Text>
            </View>
          </View>
        </>
      ) : (
        <View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={draft.phone}
              onChangeText={(t) => setDraft((p) => ({ ...p, phone: t }))}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={draft.email}
              onChangeText={(t) => setDraft((p) => ({ ...p, email: t }))}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>District</Text>
            <TextInput
              style={styles.input}
              value={draft.district}
              onChangeText={(t) => setDraft((p) => ({ ...p, district: t }))}
            />
          </View>
        </View>
      )}
    </View>
  );
}
