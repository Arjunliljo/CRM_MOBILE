import React, { useState, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function RemarkCard({ initialRemark, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(initialRemark || "");
  const [expanded, setExpanded] = useState(false);

  const displayText = useMemo(() => {
    const text = draft || "";
    const isLong = text.length > 140;
    if (!expanded && isLong) return `${text.slice(0, 140).trim()}…`;
    return text;
  }, [draft, expanded]);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Remark</Text>
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
                setDraft(initialRemark || "");
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
        <View>
          <View style={styles.remarkBox}>
            {draft ? (
              <Text style={styles.remarkText}>{displayText}</Text>
            ) : (
              <Text style={styles.remarkPlaceholder}>No remarks yet</Text>
            )}
          </View>
          {Boolean(draft) && draft.length > 140 && (
            <TouchableOpacity
              onPress={() => setExpanded((p) => !p)}
              style={styles.remarkToggle}
              activeOpacity={0.7}
            >
              <Text style={styles.remarkToggleText}>
                {expanded ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Remark</Text>
            <TextInput
              style={styles.textArea}
              multiline
              value={draft}
              onChangeText={(t) => setDraft(t)}
            />
          </View>
        </View>
      )}
    </View>
  );
}
