import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import CountryDropdown from "./CountryDropdown";

const FilterSection = ({
  showFilters,
  selectedCountry,
  onCountrySelect,
  onClearFilters,
  showCountryDropdown,
  setShowCountryDropdown,
}) => {
  if (!showFilters) return null;

  return (
    <View style={styles.filtersContainer}>
      <View style={styles.filtersHeader}>
        <Text style={styles.filtersTitle}>Filters</Text>
        {selectedCountry !== "all" && (
          <TouchableOpacity onPress={onClearFilters} style={styles.clearButton}>
            <Ionicons name="close-circle" size={16} color={colors.primary} />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <CountryDropdown
        selectedCountry={selectedCountry}
        onCountrySelect={onCountrySelect}
        showDropdown={showCountryDropdown}
        setShowDropdown={setShowCountryDropdown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingTop: 8,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryText,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.inputBackground,
    borderRadius: 16,
    gap: 4,
  },
  clearButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: "600",
  },
});

export default FilterSection;
