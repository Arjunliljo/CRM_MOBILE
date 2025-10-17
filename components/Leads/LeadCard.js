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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import {
  getBranchName,
  getStatusName,
  getCountryName,
} from "../../helpers/bootstrapHelpers";
import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "../../helpers/dateFormater";
import { setCurLead } from "../../global/leadSlice";

const LeadCard = ({ Lead, isSelectionMode, isSelected, onSelection }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const branches = useSelector((state) => state.bootstrap.branches);
  const statuses = useSelector((state) => state.bootstrap.statuses);
  const countries = useSelector((state) => state.bootstrap.countries);
  const navigation = useNavigation();
  const swipeableRef = React.useRef(null);
  const dispatch = useDispatch();

  // === Swipe actions ===
  const handleSwipeLeft = () => {
    const phoneNumber = Lead?.phone;
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
    const phoneNumber = Lead?.phone;
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
    if (isSelectionMode) {
      onSelection?.();
    } else {
      dispatch(setCurLead(Lead));
      navigation.navigate("LeadDetails", { leadId: Lead._id });
    }
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
          <Text style={styles.swipeSubtitle}>{Lead?.phone}</Text>
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
        style={[
          styles.cardContainer,
          isSelectionMode && styles.selectionModeCard,
          isSelected && styles.selectedCard,
        ]}
        onPress={handleCardPress}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          {isSelectionMode && (
            <View style={styles.selectionIndicator}>
              <Ionicons
                name={isSelected ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={isSelected ? colors.primary : colors.secondaryText}
              />
            </View>
          )}

          <View style={styles.nameSection}>
            <Text style={styles.name}>{Lead?.name || "N/A"}</Text>
            <Text style={styles.branch}>
              {getBranchName(Lead?.branch, branches) || "N/A"}
            </Text>
          </View>

          <View style={styles.rightSection}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {getStatusName(Lead?.status, statuses) || "N/A"}
              </Text>
            </View>
            <View style={styles.dateRow}>
              <Ionicons
                name="calendar-outline"
                size={12}
                color="rgba(7,20,29,0.6)"
              />
              <Text style={styles.dateText}>
                {formatDate(Lead?.followupDate) || "N/A"}
              </Text>
            </View>
          </View>
        </View>

        {/* Country and Phone Row */}
        <View style={styles.infoRow}>
          <View style={styles.countryChip}>
            <Text style={styles.countryFlag}>🇨🇦</Text>
            <Text style={styles.countryText}>
              {Lead?.country ||
                getCountryName(
                  Lead?.countries?.length > 0
                    ? Lead?.countries?.[0]
                    : Lead?.country,
                  countries
                ) ||
                "N/A"}
            </Text>
          </View>

          <View style={styles.phoneChip}>
            <Ionicons name="call-outline" size={14} color={colors.primary} />
            <Text style={styles.phoneText}>{Lead?.phone || "N/A"}</Text>
          </View>
        </View>

        {/* Expanded Details */}
        {isExpanded && (
          <View style={styles.expandedDetails}>
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
          </View>
        )}

        {/* Footer */}
        <TouchableOpacity style={styles.footer} onPress={toggleExpanded}>
          <Text style={styles.footerText}>
            Added on {formatDate(Lead?.createdAt) || "N/A"}
          </Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="rgba(7,20,29,0.4)"
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#F7F7F7",
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  nameSection: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: "#000000",
  },
  branch: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(7,20,29,0.6)",
  },
  rightSection: {
    alignItems: "flex-end",
    gap: 6,
  },
  statusBadge: {
    backgroundColor: "#00C217",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  dateText: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(7,20,29,0.6)",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  countryChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 50,
    gap: 6,
  },
  countryFlag: {
    fontSize: 14,
  },
  countryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  phoneChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 40,
    gap: 3,
  },
  phoneText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
  },
  expandedDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
    marginTop: 4,
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
    marginTop: 8,
  },
  footerText: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(7,20,29,0.5)",
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
  // Selection Mode Styles
  selectionModeCard: {
    borderWidth: 2,
    borderColor: colors.border,
  },
  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: colors.navActive,
  },
  selectionIndicator: {
    marginRight: 12,
  },
});

export default LeadCard;
