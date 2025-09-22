import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";

const dummyImageUrl =
  "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

const LeadCard = ({ Lead }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();
  const swipeableRef = React.useRef(null);

  // === Swipe actions ===
  const handleSwipeLeft = () => {
    const phoneNumber = "+918714441727";
    const url = `whatsapp://send?phone=${phoneNumber}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Could not open WhatsApp")
    );
    // Close the swipe after action
    setTimeout(() => {
      swipeableRef.current?.close();
    }, 100);
  };

  const handleSwipeRight = () => {
    const phoneNumber = "8714441727";
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Could not make phone call")
    );
    // Close the swipe after action
    setTimeout(() => {
      swipeableRef.current?.close();
    }, 100);
  };

  // === Tap on card ===
  const handleCardPress = () => {
    navigation.navigate("LeadDetails", { lead: Lead });
  };

  const toggleExpanded = (e) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  // Optional swipe indicators (optional UI)
  const renderRightActions = () => (
    <View style={styles.rightSwipeContainer}>
      <View style={styles.swipeContent}>
        <View style={styles.swipeIconWrapper}>
          <Ionicons name="logo-whatsapp" size={24} color="#fff" />
        </View>
        <View style={styles.swipeTextContainer}>
          <Text style={styles.swipeTitle}>WhatsApp</Text>
          <Text style={styles.swipeSubtitle}>Send Message</Text>
        </View>
      </View>
    </View>
  );

  const renderLeftActions = () => (
    <View style={styles.leftSwipeContainer}>
      <View style={styles.swipeContent}>
        <View style={styles.swipeIconWrapper}>
          <Ionicons name="call" size={24} color="#fff" />
        </View>
        <View style={styles.swipeTextContainer}>
          <Text style={styles.swipeTitle}>Call</Text>
          <Text style={styles.swipeSubtitle}>8714441727</Text>
        </View>
      </View>
    </View>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderLeftActions={renderLeftActions}
      onSwipeableLeftOpen={handleSwipeRight}
      renderRightActions={renderRightActions}
      onSwipeableRightOpen={handleSwipeLeft}
      rightThreshold={40}
      leftThreshold={40}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardContainer}
        onPress={handleCardPress}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image
              source={{ uri: Lead?.img || dummyImageUrl }}
              style={styles.avatarImage}
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>{Lead?.name || "N/A"}</Text>
            <Text style={styles.company}>{Lead?.branch || "N/A"}</Text>
          </View>
        </View>

        {/* Actions Row */}
        <View style={styles.actionsRow}>
          <View style={styles.actionButton}>
            <Ionicons name="flag" size={12} color={colors.primary} />
            <Text style={styles.actionText}>{Lead?.status || "N/A"}</Text>
          </View>
          <View style={styles.actionButton}>
            <Ionicons name="flag-outline" size={12} color={colors.primary} />
            <Text style={styles.actionText}>{Lead?.country || "N/A"}</Text>
          </View>
        </View>

        {/* Details */}
        {isExpanded && (
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <Ionicons name="call-outline" size={16} color={colors.success} />
              <Text style={styles.detailText}>{Lead?.phone || "N/A"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="mail-outline" size={16} color={colors.primary} />
              <Text style={styles.detailText}>{Lead?.email || "N/A"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={16}
                color={colors.warning}
              />
              <Text style={styles.detailText}>{Lead?.leadSource || "N/A"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons
                name="globe-outline"
                size={16}
                color={colors.secondary}
              />
              <Text style={styles.detailText}>
                {Lead?.followupDate || "N/A"}
              </Text>
            </View>
          </View>
        )}

        {/* Footer */}
        <TouchableOpacity style={styles.footer} onPress={toggleExpanded}>
          <Text style={styles.footerText}>
            Added on {Lead?.createdAt || "N/A"}
          </Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={16}
            color={colors.iconLight}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

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
  rightSwipeContainer: {
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  leftSwipeContainer: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  swipeContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  swipeIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  swipeTextContainer: {
    alignItems: "center",
  },
  swipeTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 2,
  },
  swipeSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    fontSize: 11,
    textAlign: "center",
  },
});

export default LeadCard;
