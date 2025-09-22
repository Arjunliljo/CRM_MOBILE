import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

export default function LeadDetails({ route }) {
  const { lead } = route.params || {};

  if (!lead) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No lead data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={{ uri: lead.img }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{lead.name}</Text>
          <Text style={styles.branch}>{lead.branch}</Text>
          <Text style={styles.status}>{lead.status}</Text>
        </View>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.infoRow}>
          <Ionicons name="call" size={20} color={colors.success} />
          <Text style={styles.infoText}>{lead.phone}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail" size={20} color={colors.primary} />
          <Text style={styles.infoText}>{lead.email || "Not provided"}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color={colors.warning} />
          <Text style={styles.infoText}>{lead.district}</Text>
        </View>
      </View>

      {/* Lead Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lead Details</Text>

        <View style={styles.infoRow}>
          <Ionicons name="chatbox-ellipses" size={20} color={colors.info} />
          <Text style={styles.infoText}>Source: {lead.leadSource}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="flag" size={20} color={colors.secondary} />
          <Text style={styles.infoText}>Country: {lead.country}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color={colors.primary} />
          <Text style={styles.infoText}>Follow-up: {lead.followupDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time" size={20} color={colors.lightText} />
          <Text style={styles.infoText}>Created: {lead.createdAt}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 4,
  },
  branch: {
    fontSize: 16,
    color: colors.secondaryText,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
  section: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: colors.primaryText,
    marginLeft: 12,
    flex: 1,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
    marginTop: 50,
  },
});
