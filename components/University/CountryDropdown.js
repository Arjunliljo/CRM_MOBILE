import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { countries } from "../../constants/universityData";

const CountryDropdown = ({
  selectedCountry,
  onCountrySelect,
  showDropdown,
  setShowDropdown,
}) => {
  const selectedCountryData = countries.find(
    (c) => c.value === selectedCountry
  );

  return (
    <View style={styles.filterDropdown}>
      <Text style={styles.filterLabel}>Country</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowDropdown(true)}
      >
        <View style={styles.dropdownButtonContent}>
          <Text style={styles.flagEmoji}>{selectedCountryData?.flag}</Text>
          <Text style={styles.dropdownButtonText}>
            {selectedCountryData?.label}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color={colors.secondaryText} />
      </TouchableOpacity>

      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownModal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowDropdown(false)}>
                <Ionicons name="close" size={24} color={colors.primaryText} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsList}>
              {countries.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionItem,
                    selectedCountry === option.value && styles.optionItemActive,
                  ]}
                  onPress={() => {
                    onCountrySelect(option.value);
                    setShowDropdown(false);
                  }}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.flagEmoji}>{option.flag}</Text>
                    <Text
                      style={[
                        styles.optionText,
                        selectedCountry === option.value &&
                          styles.optionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                  {selectedCountry === option.value && (
                    <Ionicons
                      name="checkmark"
                      size={20}
                      color={colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  filterDropdown: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dropdownButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dropdownButtonText: {
    fontSize: 14,
    color: colors.primaryText,
    fontWeight: "500",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  dropdownModal: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    width: "100%",
    maxHeight: "70%",
    shadowColor: colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryText,
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  optionItemActive: {
    backgroundColor: colors.navActive,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: colors.primaryText,
    fontWeight: "500",
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: "600",
  },
  flagEmoji: {
    fontSize: 18,
  },
});

export default CountryDropdown;
