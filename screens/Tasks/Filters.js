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
import { useDispatch, useSelector } from "react-redux";
import {
  setBranch,
  setStatus,
  setSubStatus,
  setRole,
  setSelectedUser,
} from "../../global/taskSlice";

export default function Filters({ onClose }) {
  const { branches, statuses, substatuses, roles, users } = useSelector(
    (state) => state.bootstrap
  );
  const { branch, status, subStatus, role, selectedUser } = useSelector(
    (state) => state.task
  );
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState({
    branch: branch,
    status: status,
    subStatus: subStatus,
    role: role,
    user: selectedUser,
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
      role: "all",
      user: "all",
    });
    setOpenDropdown(null); // Close any open dropdown
    dispatch(setBranch("All"));
    dispatch(setStatus("All"));
    dispatch(setSubStatus("All"));
    dispatch(setRole("All"));
    dispatch(setSelectedUser("All"));
  };

  const applyFilters = () => {
    const norm = (v) => (v && v !== "all" ? v : "All");
    dispatch(setBranch(norm(selectedFilters.branch)));
    dispatch(setStatus(norm(selectedFilters.status)));
    dispatch(setSubStatus(norm(selectedFilters.subStatus)));
    dispatch(setRole(norm(selectedFilters.role)));
    dispatch(setSelectedUser(norm(selectedFilters.user)));
    if (onClose) onClose();
  };

  return (
    <ScrollView style={styles.container} alwaysBounceVertical={false}>
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
            options={roles.map((role) => ({
              label: role.name,
              value: role.id,
            }))}
            selectedValue={selectedFilters.role}
            onValueChange={createFilterHandler("role")}
            placeholder="Select Role"
            label="Role"
            open={openDropdown === "role"}
            onOpen={(isOpen) => handleDropdownOpen("role", isOpen)}
            zIndex={getZIndex("role")}
            zIndexInverse={1000}
          />
          <Selector
            options={users.map((user) => ({
              label: user.name,
              value: user.id,
            }))}
            selectedValue={selectedFilters.user}
            onValueChange={createFilterHandler("user")}
            placeholder="Select User"
            label="User"
            open={openDropdown === "user"}
            onOpen={(isOpen) => handleDropdownOpen("user", isOpen)}
            zIndex={getZIndex("user")}
            zIndexInverse={1000}
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
  filterColumn: { flex: 1, marginHorizontal: 4 },
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
  applyButtonText: { fontSize: 14, fontWeight: "600", color: colors.whiteText },
});
