import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./leadDetailsStyle";

export default function LeadDetails({ route }) {
  // const { lead } = route.params || {};
  const lead = {
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    name: "John Doe",
    phone: "1234567890",
    email: "john.doe@example.com",
    district: "New York",
    country: "United States",
    followupDate: "2025-01-01",
    createdAt: "2025-01-01",
    leadSource: "Website",
    status: "New",
    university: "New York University",
    branch: "Computer Science",
    course: "Bachelor of Science",
  };
  const hasImage = Boolean(lead?.img);

  const handleCall = () => {
    if (lead?.phone) Linking.openURL(`tel:${lead.phone}`);
  };

  const handleSms = () => {
    if (lead?.phone) Linking.openURL(`sms:${lead.phone}`);
  };

  const handleEmail = () => {
    if (lead?.email) Linking.openURL(`mailto:${lead.email}`);
  };

  if (!lead) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No lead data available</Text>
      </View>
    );
  }

  const universityText = lead?.university || lead?.branch || "";
  const countryText = lead?.country || "";
  const courseText = lead?.course || lead?.courseName || "";
  const metaLine = [universityText, countryText, courseText]
    .filter(Boolean)
    .join(" • ");

  const getStatusDotColor = (status) => {
    if (!status) return colors.primary;
    const s = String(status).toLowerCase();
    if (s.includes("new") || s.includes("open")) return colors.info;
    if (s.includes("follow") || s.includes("pending")) return colors.warning;
    if (s.includes("rejected") || s.includes("lost")) return colors.error;
    if (s.includes("converted") || s.includes("won") || s.includes("success"))
      return colors.success;
    return colors.secondary;
  };
  const statusDotColor = getStatusDotColor(lead?.status);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Hero Header */}
      <View style={styles.header}>
        <View style={styles.headerTop} />
        <View style={styles.headerContent}>
          {hasImage ? (
            <Image source={{ uri: lead.img }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>
                {(lead?.name || "?").trim().charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.headerInfo}>
            <View style={styles.topRow}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {lead.name}
              </Text>
              {Boolean(lead?.status) && (
                <View style={styles.statusChip}>
                  <Ionicons name="ellipse" size={10} color={statusDotColor} />
                  <Text style={styles.statusText}>{lead.status}</Text>
                </View>
              )}
            </View>
            <View style={styles.metaRow}>
              {Boolean(universityText) && (
                <View style={styles.metaChip}>
                  <Ionicons name="school" size={12} color={colors.primary} />
                  <Text style={styles.metaText}>{universityText}</Text>
                </View>
              )}
              {Boolean(countryText) && (
                <View style={styles.metaChip}>
                  <Ionicons name="flag" size={12} color={colors.primary} />
                  <Text style={styles.metaText}>{countryText}</Text>
                </View>
              )}
              {Boolean(courseText) && (
                <View style={styles.metaChip}>
                  <Ionicons name="book" size={12} color={colors.primary} />
                  <Text style={styles.metaText}>{courseText}</Text>
                </View>
              )}
              {!universityText && !countryText && !courseText && (
                <View style={styles.metaChip}>
                  <Ionicons
                    name="information-circle"
                    size={12}
                    color={colors.primary}
                  />
                  <Text style={styles.metaText}>Not provided</Text>
                </View>
              )}
            </View>
            <View style={styles.badgesRow}>
              {Boolean(lead?.followupDate) && (
                <View style={styles.badge}>
                  <Ionicons name="calendar" size={12} color={colors.primary} />
                  <Text style={styles.badgeText}>{lead.followupDate}</Text>
                </View>
              )}
              {Boolean(lead?.leadSource || lead?.source) && (
                <View style={styles.badge}>
                  <Ionicons
                    name="chatbox-ellipses"
                    size={12}
                    color={colors.primary}
                  />
                  <Text style={styles.badgeText}>
                    {lead.leadSource || lead.source}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Primary Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionPrimary]}
          onPress={handleCall}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={20} color={colors.whiteText} />
          <Text style={styles.actionLabelPrimary}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSms}
          activeOpacity={0.8}
        >
          <Ionicons name="chatbubble" size={20} color={colors.primary} />
          <Text style={styles.actionLabel}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleEmail}
          activeOpacity={0.8}
        >
          <Ionicons name="mail" size={20} color={colors.primary} />
          <Text style={styles.actionLabel}>Email</Text>
        </TouchableOpacity>
      </View>

      {/* Contact Information */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>

        <View style={styles.itemRow}>
          <View style={[styles.iconBadge, { backgroundColor: colors.success }]}>
            <Ionicons name="call" size={18} color={colors.whiteText} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemLabel}>Phone</Text>
            <Text style={styles.itemValue}>{lead.phone || "Not provided"}</Text>
          </View>
        </View>

        <View style={styles.itemRow}>
          <View style={[styles.iconBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="mail" size={18} color={colors.whiteText} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemLabel}>Email</Text>
            <Text style={styles.itemValue}>{lead.email || "Not provided"}</Text>
          </View>
        </View>

        <View style={styles.itemRow}>
          <View style={[styles.iconBadge, { backgroundColor: colors.warning }]}>
            <Ionicons name="location" size={18} color={colors.whiteText} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemLabel}>District</Text>
            <Text style={styles.itemValue}>
              {lead.district || "Not provided"}
            </Text>
          </View>
        </View>
      </View>

      {/* Lead Details */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lead Details</Text>

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
              {lead.leadSource || "Not provided"}
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
              {lead.country || "Not provided"}
            </Text>
          </View>
        </View>

        <View style={styles.itemRow}>
          <View style={[styles.iconBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="calendar" size={18} color={colors.whiteText} />
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemLabel}>Follow-up</Text>
            <Text style={styles.itemValue}>
              {lead.followupDate || "Not set"}
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
            <Text style={styles.itemValue}>{lead.createdAt || "-"}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
