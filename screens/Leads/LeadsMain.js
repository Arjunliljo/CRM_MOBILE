import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { useSelector } from "react-redux";

// Import the separate screen components
import AllLeads from "./AllLeads";

// SVG strings removed; now shared via LeadsBottomNav

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

  // Bottom nav now handled by shared component; navigation occurs via that component

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

  const tabs = [];

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

      {/* Bottom Tab Navigation moved to Leads stack wrapper */}
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
  // Bottom tabs are now in shared component
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
