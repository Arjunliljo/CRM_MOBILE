import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

const SearchBar = ({
  searchQuery,
  onSearchChange,
  selectedCountry,
  onFilterPress,
  showFilters,
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.secondaryText} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search universities or courses..."
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholderTextColor={colors.placeholderText}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearchChange("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.secondaryText}
            />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={[
          styles.filterButton,
          selectedCountry !== "all" && styles.filterButtonActive,
        ]}
        onPress={onFilterPress}
      >
        <Ionicons
          name="filter"
          size={20}
          color={selectedCountry !== "all" ? colors.whiteText : colors.primary}
        />
        {selectedCountry !== "all" && <View style={styles.filterIndicator} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: colors.cardBackground,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.primaryText,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterIndicator: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.whiteText,
  },
});

export default SearchBar;
