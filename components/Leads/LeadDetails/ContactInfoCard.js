import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";

export default function ContactInfoCard({ onHandleChange, data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editPhone, setEditPhone] = useState(data.phone);
  const [editEmail, setEditEmail] = useState(data.email);
  const [editDistrict, setEditDistrict] = useState(data.district);

  useEffect(() => {
    setEditDistrict(data.district);
    setEditEmail(data.email);
    setEditPhone(data.phone);
  }, [data]);
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Contact Information</Text>
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
              onPress={onHandleChange}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark" size={14} color={colors.whiteText} />
              <Text style={styles.editChipTextPrimary}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editChip}
              onPress={() => setIsEditing(false)}
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
                {data.phone || "Not provided"}
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
                {data.email || "Not provided"}
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
                {data?.district || "Not provided"}
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
              value={contactDraft.phone}
              onChangeText={(t) => setContactDraft((p) => ({ ...p, phone: t }))}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={contactDraft.email}
              onChangeText={(t) => setContactDraft((p) => ({ ...p, email: t }))}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>District</Text>
            <TextInput
              style={styles.input}
              value={contactDraft.district}
              onChangeText={(t) =>
                setContactDraft((p) => ({ ...p, district: t }))
              }
            />
          </View>
        </View>
      )}
    </View>
  );
}
