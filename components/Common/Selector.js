import React, { useState } from "react";
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
  zIndex = 1000,
  zIndexInverse = 1000,
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [value, setValue] = useState(selectedValue);
  const [items, setItems] = useState(options);

  const isOpen = onOpen !== null ? open : internalOpen;

  const handleValueChange = (newValue) => {
    setValue(newValue);
    onValueChange && onValueChange(newValue);
  };

  const handleSetOpen = (openState) => {
    if (onOpen !== null) {
      onOpen(openState);
    } else {
      setInternalOpen(openState);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <DropDownPicker
        open={isOpen}
        value={value}
        items={items}
        setOpen={handleSetOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={handleValueChange}
        placeholder={placeholder}
        searchable={false}
        multiple={multiple}
        disabled={disabled}
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        placeholderStyle={styles.placeholderText}
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
