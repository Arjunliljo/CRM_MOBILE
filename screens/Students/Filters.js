import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import Selector from "../../components/Common/Selector";
import { filterOptions } from "../../constants/dropdownData";

export default function Filters({ onClose }) {
  const [selectedFilters, setSelectedFilters] = useState({
    branch: "all",
    status: "all",
    subStatus: "all",
    country: "all",
    form: "all",
    source: "all",
    role: "all",
    user: "all",
  });
  const [openDropdown, setOpenDropdown] = useState(null);

  const createFilterHandler = (filterType) => (value) =>
    setSelectedFilters((prev) => ({ ...prev, [filterType]: value }));

  const handleDropdownOpen = (filterType, isOpen) => {
    if (isOpen) setOpenDropdown(filterType);
    else if (openDropdown === filterType) setOpenDropdown(null);
  };

  const getZIndex = (filterType) =>
    openDropdown === filterType ? 10000 : 1000;

  const clearAllFilters = () => {
    setSelectedFilters({
      branch: "all",
      status: "all",
      subStatus: "all",
      country: "all",
      form: "all",
      source: "all",
      role: "all",
      user: "all",
    });
    setOpenDropdown(null);
  };

  const applyFilters = () => {
    console.log("Applied Student Filters:", selectedFilters);
    if (onClose) onClose();
  };

  return (
    <ScrollView style={styles.container} alwaysBounceVertical={false}>
      <View style={styles.filterGrid}>
        <View style={styles.filterColumn}>
          <Selector
            options={filterOptions.branch}
            selectedValue={selectedFilters.branch}
            onValueChange={createFilterHandler("branch")}
            placeholder="Select Branch"
            label="Branch"
            searchable={true}
            open={openDropdown === "branch"}
            onOpen={(isOpen) => handleDropdownOpen("branch", isOpen)}
            zIndex={getZIndex("branch")}
            zIndexInverse={1000}
          />
          <Selector
            options={filterOptions.subStatus}
            selectedValue={selectedFilters.subStatus}
            onValueChange={createFilterHandler("subStatus")}
            placeholder="Select Sub Status"
            label="Sub Status"
            searchable={true}
            open={openDropdown === "subStatus"}
            onOpen={(isOpen) => handleDropdownOpen("subStatus", isOpen)}
            zIndex={getZIndex("subStatus")}
            zIndexInverse={1000}
          />
          <Selector
            options={filterOptions.form}
            selectedValue={selectedFilters.form}
            onValueChange={createFilterHandler("form")}
            placeholder="Select Form"
            label="Form"
            searchable={true}
            open={openDropdown === "form"}
            onOpen={(isOpen) => handleDropdownOpen("form", isOpen)}
            zIndex={getZIndex("form")}
            zIndexInverse={1000}
          />
          <Selector
            options={filterOptions.role}
            selectedValue={selectedFilters.role}
            onValueChange={createFilterHandler("role")}
            placeholder="Select Role"
            label="Role"
            searchable={true}
            open={openDropdown === "role"}
            onOpen={(isOpen) => handleDropdownOpen("role", isOpen)}
            zIndex={getZIndex("role")}
            zIndexInverse={1000}
          />
        </View>

        <View style={styles.filterColumn}>
          <Selector
            options={filterOptions.status}
            selectedValue={selectedFilters.status}
            onValueChange={createFilterHandler("status")}
            placeholder="Select Status"
            label="Status"
            searchable={true}
            open={openDropdown === "status"}
            onOpen={(isOpen) => handleDropdownOpen("status", isOpen)}
            zIndex={getZIndex("status")}
            zIndexInverse={1000}
          />
          <Selector
            options={filterOptions.country}
            selectedValue={selectedFilters.country}
            onValueChange={createFilterHandler("country")}
            placeholder="Select Country"
            label="Country"
            searchable={true}
            open={openDropdown === "country"}
            onOpen={(isOpen) => handleDropdownOpen("country", isOpen)}
            zIndex={getZIndex("country")}
            zIndexInverse={1000}
          />
          <Selector
            options={filterOptions.source}
            selectedValue={selectedFilters.source}
            onValueChange={createFilterHandler("source")}
            placeholder="Select Source"
            label="Source"
            searchable={true}
            open={openDropdown === "source"}
            onOpen={(isOpen) => handleDropdownOpen("source", isOpen)}
            zIndex={getZIndex("source")}
            zIndexInverse={1000}
          />
          <Selector
            options={filterOptions.user}
            selectedValue={selectedFilters.user}
            onValueChange={createFilterHandler("user")}
            placeholder="Select User"
            label="User"
            searchable={true}
            open={openDropdown === "user"}
            onOpen={(isOpen) => handleDropdownOpen("user", isOpen)}
            zIndex={getZIndex("user")}
            zIndexInverse={1000}
          />
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.clearButton} onPress={clearAllFilters}>
          <Ionicons name="refresh" size={16} color={colors.primary} />
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
          <Text style={styles.applyButtonText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  filterGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  filterColumn: {
    flex: 1,
    marginHorizontal: 4,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  clearButtonText: {
    color: colors.primary,
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "600",
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.whiteText,
  },
});
