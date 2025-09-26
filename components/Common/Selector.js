import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { colors } from "../../constants/colors";

export default function Selector({
  options = [],
  selectedValue,
  onValueChange,
  placeholder = "Select an option",
  label = null,
  style = {},
  searchable = false,
  multiple = false,
  disabled = false,
  open = false,
  onOpen = null,
  onClose = null,
  zIndex = 5000,
  zIndexInverse = 5000,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [value, setValue] = useState(selectedValue);
  const [items, setItems] = useState(options);

  // Keep items in sync with options prop
  useEffect(() => {
    setItems(Array.isArray(options) ? options : []);
  }, [options]);

  // Keep selected value in sync with selectedValue prop
  useEffect(() => {
    setValue(selectedValue);
  }, [selectedValue]);

  const isOpen = onOpen !== null ? open : internalOpen;

  const handleSelectItem = (item) => {
    if (!item) return;
    // Only fire external change handler for explicit user selections
    onValueChange && onValueChange(item.value);
  };

  const handleSetOpen = (openState) => {
    if (onOpen !== null) {
      onOpen(openState);
    } else {
      setInternalOpen(openState);
    }
  };

  return (
    <View
      style={[
        styles.container,
        style,
        { zIndex, elevation: zIndex, position: "relative" },
      ]}
    >
      {label && <Text style={styles.label}>{label}</Text>}

      <DropDownPicker
        open={isOpen}
        value={value}
        items={items}
        setOpen={handleSetOpen}
        setValue={setValue}
        setItems={setItems}
        // Trigger external change ONLY on user selection to avoid loops
        onSelectItem={handleSelectItem}
        placeholder={placeholder}
        searchable={searchable}
        multiple={multiple}
        disabled={disabled}
        dropDownDirection="AUTO"
        style={[styles.dropdown, disabled && styles.dropdownDisabled]}
        dropDownContainerStyle={[
          styles.dropdownContainer,
          { zIndex: zIndex + 1, elevation: (zIndex || 1) + 1 },
        ]}
        textStyle={[
          styles.dropdownText,
          disabled && styles.dropdownTextDisabled,
        ]}
        placeholderStyle={[
          styles.placeholderText,
          disabled && styles.dropdownTextDisabled,
        ]}
        selectedItemContainerStyle={styles.selectedItemContainer}
        selectedItemLabelStyle={styles.selectedItemLabel}
        listItemContainerStyle={styles.listItemContainer}
        listItemLabelStyle={styles.listItemLabel}
        arrowIconStyle={styles.arrowIcon}
        tickIconStyle={styles.tickIcon}
        closeIconStyle={styles.closeIcon}
        searchContainerStyle={styles.searchContainer}
        searchTextInputStyle={styles.searchTextInput}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        listMode="SCROLLVIEW"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 8,
  },
  dropdown: {
    backgroundColor: colors.dropdownBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 50,
  },
  dropdownDisabled: {
    backgroundColor: colors.border,
    borderColor: colors.border,
    opacity: 0.7,
  },
  dropdownContainer: {
    backgroundColor: colors.dropdownContainerBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 4,
    maxHeight: 200,
    elevation: 5000, // Android shadow - increased for better layering
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: 9999, // Ensure dropdown container has high z-index
  },
  dropdownText: {
    fontSize: 14,
    color: colors.primaryText,
  },
  dropdownTextDisabled: {
    color: colors.iconLight,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.iconLight,
  },
  selectedItemContainer: {
    backgroundColor: colors.navActive,
  },
  selectedItemLabel: {
    color: colors.primary,
    fontWeight: "600",
  },
  listItemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  listItemLabel: {
    fontSize: 14,
    color: colors.primaryText,
  },
  arrowIcon: {
    tintColor: colors.iconLight,
  },
  tickIcon: {
    tintColor: colors.primary,
  },
  closeIcon: {
    tintColor: colors.iconLight,
  },
  searchContainer: {
    backgroundColor: colors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchTextInput: {
    fontSize: 14,
    color: colors.primaryText,
    backgroundColor: colors.background,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
