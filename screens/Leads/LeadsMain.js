import React, { useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { useSelector } from "react-redux";

// Import the separate screen components
import AllLeads from "./AllLeads";
import Filters from "./Filters";
import Analytics from "./Analytics";

export default function LeadsMain({ navigation }) {
  // Determine if any filters are applied
  const {
    searchQuery = "",
    curBranch,
    curCountry,
    curStatus,
    curSubStatus,
    curForm,
    curRole,
    curUser,
    curSource,
  } = useSelector((state) => state.lead) || {};
  const hasActiveFilters =
    [
      curBranch,
      curCountry,
      curStatus,
      curSubStatus,
      curForm,
      curRole,
      curUser,
      curSource,
    ].some((v) => v && v !== "All") || (searchQuery || "").trim() !== "";
  const [activeTab, setActiveTab] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedLeads, setSelectedLeads] = useState([]);

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    if (isSelectionMode) {
      // Exit selection mode - clear selections
      setSelectedLeads([]);
    }
  };

  // Update header button dynamically
  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      parent.setOptions({
        headerRight: () => (
          <TouchableOpacity
            onPress={toggleSelectionMode}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              paddingHorizontal: 8,
              paddingVertical: 6,
              marginRight: 12,
              borderRadius: 20,
              backgroundColor: isSelectionMode ? colors.primary : "white",
              borderWidth: 0.5,
              borderColor: isSelectionMode
                ? colors.primary
                : "rgba(0, 0, 0, 0.2)",
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isSelectionMode ? "close" : "ellipse-outline"}
              size={19}
              color={isSelectionMode ? "white" : "black"}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "500",
                color: isSelectionMode ? "white" : "#000000",
              }}
            >
              {isSelectionMode ? "Cancel" : "Select"}
            </Text>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, isSelectionMode, toggleSelectionMode]);

  const handleTabPress = (tabId) => {
    if (tabId === "all") {
      // Show All Leads directly (not in modal)
      setActiveTab(tabId);
      setModalVisible(false);
    } else if (tabId === "add") {
      // Navigate to AddLead route instead of modal
      navigation.navigate("AddLead");
    } else {
      // Show other tabs in modal
      setActiveTab(tabId);
      setModalContent(getModalContent(tabId));
      setModalVisible(true);
    }
  };

  const getModalContent = (tabId) => {
    switch (tabId) {
      case "filters":
        return <Filters onClose={closeModal} />;
      case "analytics":
        return <Analytics onClose={closeModal} />;
      default:
        return null;
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveTab("all"); // Reset to All Leads when modal closes
  };

  const handleLeadSelection = (leadId) => {
    setSelectedLeads((prev) => {
      if (prev.includes(leadId)) {
        return prev.filter((id) => id !== leadId);
      } else {
        return [...prev, leadId];
      }
    });
  };

  const selectAllLeads = () => {
    // This will be implemented when we pass leads data
    // For now, we'll handle it in AllLeads component
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on leads:`, selectedLeads);
    // Handle bulk actions like delete, assign, etc.
  };

  const tabs = [
    { id: "all", label: "All Leads", icon: "list" },
    { id: "filters", label: "Filters", icon: "funnel" },
    { id: "analytics", label: "Analytics", icon: "bar-chart" },
    { id: "add", label: "Add Lead", icon: "add-circle" },
  ];

  return (
    <View style={styles.container}>
      {/* Selection Actions Bar */}
      {isSelectionMode && selectedLeads.length > 0 && (
        <View style={styles.selectionActionsBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBulkAction("delete")}
          >
            <Ionicons name="trash-outline" size={18} color={colors.error} />
            <Text style={[styles.actionButtonText, { color: colors.error }]}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBulkAction("assign")}
          >
            <Ionicons
              name="person-add-outline"
              size={18}
              color={colors.primary}
            />
            <Text style={styles.actionButtonText}>Assign</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBulkAction("export")}
          >
            <Ionicons
              name="download-outline"
              size={18}
              color={colors.success}
            />
            <Text style={[styles.actionButtonText, { color: colors.success }]}>
              Export
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Main Content - Always show All Leads */}
      <View style={styles.content}>
        <AllLeads
          isSelectionMode={isSelectionMode}
          selectedLeads={selectedLeads}
          onLeadSelection={handleLeadSelection}
        />
      </View>

      {/* Modal for other tabs */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.primaryText} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {tabs.find((tab) => tab.id === activeTab)?.label || ""}
            </Text>
            <View style={styles.placeholder} />
          </View>

          {/* Modal Content */}
          <View style={styles.modalContent}>{modalContent}</View>
        </SafeAreaView>
      </Modal>

      {/* Bottom Tab Navigation */}
      <View style={styles.bottomTabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tabButton,
              activeTab === tab.id && styles.activeTabButton,
            ]}
            onPress={() => handleTabPress(tab.id)}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={tab.icon}
                size={20}
                color={activeTab === tab.id ? colors.primary : colors.iconLight}
              />
              {tab.id === "filters" && hasActiveFilters && (
                <View style={styles.filterBadgeDot} />
              )}
            </View>
            <Text
              style={[
                styles.tabLabel,
                activeTab === tab.id && styles.activeTabLabel,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  // Bottom Tabs
  bottomTabs: {
    flexDirection: "row",
    backgroundColor: colors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  activeTabButton: {
    backgroundColor: colors.navActive,
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 10,
    color: colors.iconLight,
    marginTop: 4,
    textAlign: "center",
  },
  activeTabLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
  iconWrap: {
    position: "relative",
  },
  filterBadgeDot: {
    position: "absolute",
    top: -2,
    right: -6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  placeholder: {
    width: 34, // Same width as close button for centering
  },
  modalContent: {
    flex: 1,
  },
  // Selection Actions Bar
  selectionActionsBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.inputBackground,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
});
