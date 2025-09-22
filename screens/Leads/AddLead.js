import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { colors } from "../../constants/colors";
import Selector from "../../components/Common/Selector";
import {
  leadSources,
  countries,
  branches,
  districts,
} from "../../constants/dropdownData";

export default function AddLead() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    leadSource: "",
    country: "",
    district: "",
    branch: "",
    notes: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // State to manage which dropdown is currently open
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Function to handle dropdown open/close
  const handleDropdownOpen = (dropdownName, isOpen) => {
    if (isOpen) {
      setOpenDropdown(dropdownName);
    } else {
      setOpenDropdown(null);
    }
  };

  // Function to get dynamic z-index based on which dropdown is open
  const getZIndex = (dropdownName) => {
    if (openDropdown === dropdownName) {
      return 10000; // Active dropdown gets highest z-index
    }
    return 1000; // All other dropdowns get lower z-index
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter the lead's name");
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert("Error", "Please enter the phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Here you would typically send the data to your backend
      Alert.alert("Success", "Lead added successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Reset form
            setFormData({
              name: "",
              email: "",
              phone: "",
              leadSource: "",
              country: "",
              district: "",
              branch: "",
              notes: "",
            });
            setSelectedFile(null);
          },
        },
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add New Lead</Text>

      <View style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter full name"
            placeholderTextColor={colors.placeholderText}
            value={formData.name}
            onChangeText={(value) => handleInputChange("name", value)}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            placeholderTextColor={colors.placeholderText}
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            placeholderTextColor={colors.placeholderText}
            keyboardType="phone-pad"
            value={formData.phone}
            onChangeText={(value) => handleInputChange("phone", value)}
          />
        </View>

        {/* Lead Source Selector */}
        <View style={styles.inputGroup}>
          <Selector
            label="Lead Source"
            options={leadSources}
            selectedValue={formData.leadSource}
            onValueChange={(value) => handleInputChange("leadSource", value)}
            placeholder="Select source"
            open={openDropdown === "leadSource"}
            onOpen={(isOpen) => handleDropdownOpen("leadSource", isOpen)}
            zIndex={getZIndex("leadSource")}
            zIndexInverse={1000}
          />
        </View>

        {/* Country Selector */}
        <View style={styles.inputGroup}>
          <Selector
            label="Country"
            options={countries}
            selectedValue={formData.country}
            onValueChange={(value) => handleInputChange("country", value)}
            placeholder="Select country"
            open={openDropdown === "country"}
            onOpen={(isOpen) => handleDropdownOpen("country", isOpen)}
            zIndex={getZIndex("country")}
            zIndexInverse={1000}
          />
        </View>

        {/* District Selector */}
        <View style={styles.inputGroup}>
          <Selector
            label="District/City"
            options={districts}
            selectedValue={formData.district}
            onValueChange={(value) => handleInputChange("district", value)}
            placeholder="Select district or city"
            searchable={true}
            open={openDropdown === "district"}
            onOpen={(isOpen) => handleDropdownOpen("district", isOpen)}
            zIndex={getZIndex("district")}
            zIndexInverse={1000}
          />
        </View>

        {/* Branch Selector */}
        <View style={styles.inputGroup}>
          <Selector
            label="Branch"
            options={branches}
            selectedValue={formData.branch}
            onValueChange={(value) => handleInputChange("branch", value)}
            placeholder="Select branch"
            open={openDropdown === "branch"}
            onOpen={(isOpen) => handleDropdownOpen("branch", isOpen)}
            zIndex={getZIndex("branch")}
            zIndexInverse={1000}
          />
        </View>

        {/* Notes Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Notes</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Enter any additional notes..."
            placeholderTextColor={colors.placeholderText}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={formData.notes}
            onChangeText={(value) => handleInputChange("notes", value)}
          />
        </View>

        {/* File Upload Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Attach File (Optional)</Text>

          {!selectedFile ? (
            <TouchableOpacity
              style={styles.fileUploadArea}
              onPress={pickDocument}
              activeOpacity={0.7}
            >
              <View style={styles.uploadIconContainer}>
                <Ionicons
                  name="cloud-upload-outline"
                  size={32}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.uploadTitle}>Tap to upload a file</Text>
              <Text style={styles.uploadSubtitle}>
                PDF, DOC, DOCX, JPG, PNG (Max 10MB)
              </Text>
              <View style={styles.browseButton}>
                <Ionicons
                  name="folder-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.browseButtonText}>Browse Files</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.fileSelectedContainer}>
              <View style={styles.filePreview}>
                <View style={styles.fileIconContainer}>
                  <Ionicons
                    name="document-text"
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <View style={styles.fileDetails}>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {selectedFile.name}
                  </Text>
                  <Text style={styles.fileSize}>
                    {selectedFile.size
                      ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                      : "Size unknown"}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={removeFile}
                  style={styles.removeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="trash-outline"
                    size={18}
                    color={colors.error}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.changeFileButton}
                onPress={pickDocument}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="refresh-outline"
                  size={16}
                  color={colors.primary}
                />
                <Text style={styles.changeFileText}>Change File</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Add Lead</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.primaryText,
    backgroundColor: colors.backgroundLight,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.whiteText,
  },
  // File Upload Styles - Modern Design
  fileUploadArea: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    borderStyle: "dashed",
    padding: 24,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    minHeight: 140,
    justifyContent: "center",
  },
  uploadIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.navActive,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontSize: 12,
    color: colors.secondaryText,
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 16,
  },
  browseButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  browseButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
  fileSelectedContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.backgroundLight,
    overflow: "hidden",
  },
  filePreview: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.backgroundLight,
  },
  fileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.navActive,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  fileDetails: {
    flex: 1,
    marginRight: 12,
  },
  fileName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 2,
  },
  fileSize: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  removeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightOverlay,
    alignItems: "center",
    justifyContent: "center",
  },
  changeFileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  changeFileText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
  },
});
