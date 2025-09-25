import React from "react";
import { View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";

import { formatDate } from "../../../helpers/dateFormater";

export default function LeadHeader({ data }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerTop} />
      <View style={styles.headerContent}>
        <View style={styles.headerInfo}>
          <View style={styles.topRow}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {data.name}
            </Text>
          </View>
          <View style={styles.metaRow}>
            <View style={styles.metaChip}>
              <Ionicons name="school" size={12} color={colors.primary} />
              <Text style={styles.metaText}>{data.branch}</Text>
            </View>
            <View style={styles.metaChip}>
              <Ionicons name="flag" size={12} color={colors.primary} />
              <Text style={styles.metaText}>{data.country}</Text>
            </View>
          </View>
          <View style={styles.badgesRow}>
            {Boolean(data?.followupDate) && (
              <View style={styles.badge}>
                <Ionicons name="calendar" size={12} color={colors.primary} />
                <Text style={styles.badgeText}>
                  {formatDate(data.followupDate)}
                </Text>
              </View>
            )}
            <View style={styles.badge}>
              <Ionicons
                name="chatbox-ellipses"
                size={12}
                color={colors.primary}
              />
              <Text style={styles.badgeText}>{data?.source}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
