import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";

const dummyImageUrl =
  "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

export default function StudentCard({ student }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();

  const onPressCard = () => {
    navigation.navigate("StudentDetails", { student });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardContainer}
      onPress={onPressCard}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: student?.img || dummyImageUrl }}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{student?.name || "N/A"}</Text>
          <Text style={styles.company}>{student?.branch || "N/A"}</Text>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <View style={styles.actionButton}>
          <Ionicons name="flag" size={12} color={colors.primary} />
          <Text style={styles.actionText}>{student?.status || "N/A"}</Text>
        </View>
        <View style={styles.actionButton}>
          <Ionicons name="flag-outline" size={12} color={colors.primary} />
          <Text style={styles.actionText}>{student?.country || "N/A"}</Text>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={16} color={colors.success} />
            <Text style={styles.detailText}>{student?.phone || "N/A"}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={16} color={colors.primary} />
            <Text style={styles.detailText}>{student?.email || "N/A"}</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={styles.footer}
        onPress={() => setIsExpanded((p) => !p)}
      >
        <Text style={styles.footerText}>
          Added on {student?.createdAt || "N/A"}
        </Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={colors.iconLight}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
  },
  company: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.navActive,
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 12,
  },
  actionText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.primaryText,
    marginLeft: 4,
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 8,
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.primaryText,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  footerText: {
    fontSize: 12,
    color: colors.lightText,
  },
});
