import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  setCurBranch,
  setCurCountry,
  setCurStatus,
  setCurSubStatus,
  setCurForm,
  setCurRole,
  setCurUser,
  setCurSource,
} from "../../global/leadSlice";

export default function Filters({ onClose }) {
  const { branches, statuses, substatuses, countries, forms, roles, users } =
    useSelector((state) => state.bootstrap);
  const {
    curBranch,
    curCountry,
    curStatus,
    curSubStatus,
    curForm,
    curRole,
    curUser,
    curSource,
  } = useSelector((state) => state.lead);
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState({
    branch: curBranch,
    status: curStatus,
    subStatus: curSubStatus,
    country: curCountry,
    form: curForm,
    source: curSource,
    role: curRole,
    user: curUser,
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  // Removed dynamic substatus derivation; using global substatuses list directly

  // Generic handler for all selector components
  const createFilterHandler = (filterType) => (value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle dropdown open/close to ensure only one is open at a time
  const handleDropdownOpen = (filterType, isOpen) => {
    if (isOpen) {
      setOpenDropdown(filterType);
    } else if (openDropdown === filterType) {
      setOpenDropdown(null);
    }
  };

  // Function to get dynamic z-index based on which dropdown is open
  const getZIndex = (filterType) => {
    if (openDropdown === filterType) {
      return 10000; // Active dropdown gets highest z-index
    }
    return 1000; // All other dropdowns get lower z-index
  };

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
    setOpenDropdown(null); // Close any open dropdown
    dispatch(setCurBranch("All"));
    dispatch(setCurStatus("All"));
    dispatch(setCurSubStatus("All"));
    dispatch(setCurCountry("All"));
    dispatch(setCurForm("All"));
    dispatch(setCurRole("All"));
    dispatch(setCurUser("All"));
    dispatch(setCurSource("All"));
  };

  const applyFilters = () => {
    const norm = (v) => (v && v !== "all" ? v : "All");
    dispatch(setCurBranch(norm(selectedFilters.branch)));
    dispatch(setCurStatus(norm(selectedFilters.status)));
    dispatch(setCurSubStatus(norm(selectedFilters.subStatus)));
    dispatch(setCurCountry(norm(selectedFilters.country)));
    dispatch(setCurForm(norm(selectedFilters.form)));
    dispatch(setCurRole(norm(selectedFilters.role)));
    dispatch(setCurUser(norm(selectedFilters.user)));
    dispatch(setCurSource(norm(selectedFilters.source)));
    if (onClose) onClose();
  };

  return (
    <ScrollView style={styles.container} alwaysBounceVertical={false}>
      {/* <Text style={styles.title}>Filter Options</Text> */}

      {/* Filter Grid - 2 columns */}
      <View style={styles.filterGrid}>
        <View style={styles.filterColumn}>
          <Selector
            options={branches.map((branch) => ({
              label: branch.name,
              value: branch.id,
            }))}
            selectedValue={selectedFilters.branch}
            onValueChange={createFilterHandler("branch")}
            placeholder="Select Branch"
            label="Branch"
            open={openDropdown === "branch"}
            onOpen={(isOpen) => handleDropdownOpen("branch", isOpen)}
            zIndex={getZIndex("branch")}
            zIndexInverse={1000}
          />
          <Selector
            options={substatuses.map((sub) => ({
              label: sub.subStatus || sub.name || sub.label,
              value: sub.id || sub._id || sub.value,
            }))}
            selectedValue={selectedFilters.subStatus}
            onValueChange={createFilterHandler("subStatus")}
            placeholder="Sub Status"
            label="Sub Status"
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
            open={openDropdown === "form"}
            onOpen={(isOpen) => handleDropdownOpen("form", isOpen)}
            zIndex={getZIndex("form")}
            zIndexInverse={1000}
            disabled={true}
          />
          <Selector
            options={filterOptions.role}
            selectedValue={selectedFilters.role}
            onValueChange={createFilterHandler("role")}
            placeholder="Select Role"
            label="Role"
            open={openDropdown === "role"}
            onOpen={(isOpen) => handleDropdownOpen("role", isOpen)}
            zIndex={getZIndex("role")}
            zIndexInverse={1000}
            disabled={true}
          />
        </View>

        <View style={styles.filterColumn}>
          <Selector
            options={statuses
              .filter((status) => !status.isApplication)
              .map((status) => ({
                label: status.name,
                value: status.id,
              }))}
            selectedValue={selectedFilters.status}
            onValueChange={createFilterHandler("status")}
            placeholder="Select Status"
            label="Status"
            open={openDropdown === "status"}
            onOpen={(isOpen) => handleDropdownOpen("status", isOpen)}
            zIndex={getZIndex("status")}
            zIndexInverse={1000}
          />
          <Selector
            options={countries.map((country) => ({
              label: country.name,
              value: country.id,
            }))}
            selectedValue={selectedFilters.country}
            onValueChange={createFilterHandler("country")}
            placeholder="Select Country"
            label="Country"
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
            open={openDropdown === "source"}
            onOpen={(isOpen) => handleDropdownOpen("source", isOpen)}
            zIndex={getZIndex("source")}
            zIndexInverse={1000}
            disabled={true}
          />
          <Selector
            options={filterOptions.user}
            selectedValue={selectedFilters.user}
            onValueChange={createFilterHandler("user")}
            placeholder="Select User"
            label="User"
            open={openDropdown === "user"}
            onOpen={(isOpen) => handleDropdownOpen("user", isOpen)}
            zIndex={getZIndex("user")}
            zIndexInverse={1000}
            disabled={true}
          />
        </View>
      </View>

      {/* Action Buttons */}
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
