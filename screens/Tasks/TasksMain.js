import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

import AllTasks from "./AllTasks";
import Filters from "./Filters";

export default function TasksMain() {
  const [activeTab, setActiveTab] = useState("all");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleTabPress = (tabId) => {
    if (tabId === "all") {
      setActiveTab(tabId);
      setModalVisible(false);
    } else {
      setActiveTab(tabId);
      setModalContent(getModalContent(tabId));
      setModalVisible(true);
    }
  };

  const getModalContent = (tabId) => {
    switch (tabId) {
      case "filters":
        return <Filters onClose={closeModal} />;
      default:
        return null;
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveTab("all");
  };

  const tabs = [
    { id: "all", label: "All Tasks", icon: "list" },
    { id: "filters", label: "Filters", icon: "funnel" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <AllTasks />
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.primaryText} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {tabs.find((t) => t.id === activeTab)?.label || ""}
            </Text>
            <View style={styles.placeholder} />
          </View>
          <View style={styles.modalContent}>{modalContent}</View>
        </SafeAreaView>
      </Modal>

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
            <Ionicons
              name={tab.icon}
              size={20}
              color={activeTab === tab.id ? colors.primary : colors.iconLight}
            />
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
  container: { flex: 1, backgroundColor: colors.background },
  content: { flex: 1 },
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
  activeTabButton: { backgroundColor: colors.navActive, borderRadius: 8 },
  tabLabel: {
    fontSize: 10,
    color: colors.iconLight,
    marginTop: 4,
    textAlign: "center",
  },
  activeTabLabel: { color: colors.primary, fontWeight: "600" },
  modalContainer: { flex: 1, backgroundColor: colors.background },
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
  closeButton: { padding: 5 },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: colors.primaryText },
  placeholder: { width: 34 },
  modalContent: { flex: 1 },
});
