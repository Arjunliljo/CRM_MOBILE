import React, { useState, memo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { colors } from "../../constants/colors";
import { updateTask } from "../../api/Tasks/taskBackendHandler";

const dummyImageUrl =
  "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg";

const TaskCard = memo(({ task, activeTab, onRefresh }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [followupDate, setFollowupDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const navigation = useNavigation();

  const onPressCard = () => {
    if (task?.type == "lead") {
      navigation.navigate("LeadDetails", { leadId: task?._id });
    } else {
      // temporary , it will be changed to application details
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTempDate(selectedDate);
      showConfirmationDialog(selectedDate);
    }
  };

  const showConfirmationDialog = (newDate) => {
    const formattedDate = formatDate(newDate);
    const currentFormattedDate = formatDate(followupDate);

    Alert.alert(
      "Update Followup Date",
      `Are you sure you want to change the followup date from ${currentFormattedDate} to ${formattedDate}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => {
            // Reset temp date to current date
            setTempDate(followupDate);
          },
        },
        {
          text: "Update",
          style: "default",
          onPress: () => {
            updateFollowupDate(newDate);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const updateFollowupDate = async (newDate) => {
    try {
      const response = await updateTask(task._id, {
        followupDate: newDate,
      });

      // Update local state immediately for better UX
      setFollowupDate(newDate);

      console.log("Updating followup date via API:", {
        taskId: task._id,
        newFollowupDate: newDate,
        taskName: task.name,
      });

      // Show success message
      Alert.alert("Success", "Followup date updated successfully!");

      // Call onRefresh to update the parent component
      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      // Revert the date if API call fails
      setFollowupDate(followupDate);
      console.error("Failed to update followup date:", error);
      Alert.alert("Error", "Failed to update followup date. Please try again.");
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isPendingCard = activeTab === "pending";

  // Determine card background color based on activeTab
  const getCardBackgroundColor = () => {
    if (activeTab === "pending") {
      return colors.pendingCardBackground;
    } else if (activeTab === "closed") {
      return colors.closedCardBackground;
    }
    return colors.cardBackground; // Default fallback
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.cardContainer,
        { backgroundColor: getCardBackgroundColor() },
      ]}
      onPress={onPressCard}
    >
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Image
            source={{ uri: task?.img || dummyImageUrl }}
            style={styles.avatarImage}
          />
        </View>
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{task?.name || "N/A"}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{task?.type || "Lead"}</Text>
            </View>
          </View>
          <View style={styles.phoneRow}>
            <Ionicons
              name="call-outline"
              size={14}
              color={colors.secondaryText}
            />
            <Text style={styles.phoneText}>{task?.phone || "N/A"}</Text>
          </View>
          <View style={styles.statusRow}>
            <Ionicons name="flag-outline" size={14} color={colors.primary} />
            <Text style={styles.statusText}>{task?.status || "N/A"}</Text>
          </View>
        </View>
      </View>

      {/* Followup Date Section - Only for pending cards */}
      {isPendingCard && (
        <View style={styles.followupSection}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => {
              setTempDate(followupDate);
              setShowDatePicker(true);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.dateButtonContent}>
              <Ionicons
                name="calendar-outline"
                size={18}
                color={colors.primary}
              />
              <View style={styles.dateInfo}>
                <Text style={styles.followupLabel}>Followup Date</Text>
                <Text style={styles.dateText}>{formatDate(followupDate)}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}
    </TouchableOpacity>
  );
});

// Custom comparison function for memo
TaskCard.displayName = "TaskCard";

export default TaskCard;

const styles = StyleSheet.create({
  cardContainer: {
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
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    marginRight: 16,
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarImage: { width: "100%", height: "100%" },
  info: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryText,
    flex: 1,
  },
  typeBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.whiteText,
    textTransform: "uppercase",
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  phoneText: {
    fontSize: 14,
    color: colors.secondaryText,
    marginLeft: 6,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    color: colors.primary,
    marginLeft: 6,
    fontWeight: "500",
  },
  followupSection: {
    marginTop: 16,
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  dateButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  dateInfo: {
    flex: 1,
    marginLeft: 12,
  },
  followupLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.secondaryText,
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
  },
});
