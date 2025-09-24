import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants/colors";
import { styles } from "../studentDetailsStyle";

export default function HeaderSection({
  editable,
  statusName,
  branchName,
  primaryCountryName,
}) {
  const hasImage = Boolean(editable?.img);

  return (
    <View style={styles.header}>
      <View style={styles.headerTop} />
      <View style={styles.headerContent}>
        {hasImage ? (
          <Image source={{ uri: editable.img }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>
              {(editable?.name || "?").trim().charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <View style={styles.headerInfo}>
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {editable.name}
            </Text>
            {Boolean(editable?.status) && (
              <View style={styles.statusChip}>
                <Ionicons name="ellipse" size={10} color={colors.primary} />
                <Text style={styles.statusText}>{statusName}</Text>
              </View>
            )}
          </View>
          <View style={styles.metaRow}>
            {Boolean(editable?.branch) && (
              <View style={styles.metaChip}>
                <Ionicons name="school" size={12} color={colors.primary} />
                <Text style={styles.metaText}>{branchName}</Text>
              </View>
            )}
            {Boolean(primaryCountryName) && (
              <View style={styles.metaChip}>
                <Ionicons name="flag" size={12} color={colors.primary} />
                <Text style={styles.metaText}>{primaryCountryName}</Text>
              </View>
            )}
          </View>
          <View style={styles.badgesRow}>
            {Boolean(editable?.followupDate) && (
              <View style={styles.badge}>
                <Ionicons name="calendar" size={12} color={colors.primary} />
                <Text style={styles.badgeText}>{editable.followupDate}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
