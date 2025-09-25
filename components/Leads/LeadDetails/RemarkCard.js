import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";

export default function RemarkCard({ remarkText, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [remark, setRemark] = useState(remarkText || "");
  const [isRemarkExpanded, setIsRemarkExpanded] = useState(false);

  const isLongRemark = (remarkText || "").length > 140;
  const displayRemark =
    !isRemarkExpanded && isLongRemark
      ? `${remarkText.slice(0, 140).trim()}…`
      : remarkText;

  const handleRemarkChange = (t) => {
    setRemark(t);
  };

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
              onPress={() => onSave({ remark })}
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
          <View style={styles.remarkBox}>
            {remarkText ? (
              <Text style={styles.remarkText}>{displayRemark}</Text>
            ) : (
              <Text style={styles.remarkPlaceholder}>No remarks yet</Text>
            )}
          </View>
          {remarkText && isLongRemark && (
            <TouchableOpacity
              onPress={() => setIsRemarkExpanded((p) => !p)}
              style={styles.remarkToggle}
              activeOpacity={0.7}
            >
              <Text style={styles.remarkToggleText}>
                {isRemarkExpanded ? "Show less" : "Show more"}
              </Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Remark</Text>
            <TextInput
              style={styles.textArea}
              multiline
              value={remark}
              onChangeText={handleRemarkChange}
            />
          </View>
        </>
      )}
    </View>
  );
}
