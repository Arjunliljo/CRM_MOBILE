import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

const DEFAULT_DOC_TYPES = [
  "Degree provisional certificate",
  "Degree consolidated",
  "Degree individual mark sheet",
  "Degree transcript",
  "LOR 1",
  "IELTS",
  "Experience Certificate",
  "SOP 1",
  "SOP 2",
  "Medical",
  "Finance",
];

export default function DocumentUploader() {
  const [docs, setDocs] = useState(
    DEFAULT_DOC_TYPES.map((title, idx) => ({
      id: String(idx + 1),
      title,
      file: null,
      important: false,
    }))
  );
  const [editingId, setEditingId] = useState(null);
  const [titleDraft, setTitleDraft] = useState("");

  const pick = async (id) => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (!res.canceled && res.assets?.length) {
        setDocs((prev) =>
          prev.map((d) => (d.id === id ? { ...d, file: res.assets[0] } : d))
        );
      }
    } catch (e) {}
  };

  const toggleImportant = (id) => {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, important: !d.important } : d))
    );
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setTitleDraft(item.title);
  };

  const saveEdit = (id) => {
    setDocs((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, title: titleDraft.trim() || d.title } : d
      )
    );
    setEditingId(null);
    setTitleDraft("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitleDraft("");
  };

  const viewFile = (item) => {
    if (item.file?.uri) {
      Linking.openURL(item.file.uri).catch(() =>
        Alert.alert("Error", "Could not open the selected file")
      );
    } else {
      Alert.alert("No File", "Please select a file first");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Ionicons name="document-text" size={16} color={colors.primary} />
          {editingId === item.id ? (
            <TextInput
              style={styles.titleInput}
              value={titleDraft}
              onChangeText={setTitleDraft}
              placeholder="Document title"
              placeholderTextColor={colors.placeholderText}
            />
          ) : (
            <Text style={styles.cardTitle} numberOfLines={1}>
              {item.title}
            </Text>
          )}
        </View>
        <View style={styles.headerActions}>
          {editingId === item.id ? (
            <>
              <TouchableOpacity
                style={[styles.actionChip, styles.actionPrimary]}
                onPress={() => saveEdit(item.id)}
              >
                <Ionicons name="checkmark" size={14} color={colors.whiteText} />
                <Text style={styles.actionChipTextPrimary}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionChip} onPress={cancelEdit}>
                <Ionicons name="close" size={14} color={colors.primary} />
                <Text style={styles.actionChipText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : item.file ? (
            <>
              <TouchableOpacity
                style={styles.actionChip}
                onPress={() => viewFile(item)}
              >
                <Ionicons name="eye" size={14} color={colors.primary} />
                <Text style={styles.actionChipText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionChip}
                onPress={() => startEdit(item)}
              >
                <Ionicons
                  name="create-outline"
                  size={14}
                  color={colors.primary}
                />
                <Text style={styles.actionChipText}>Edit</Text>
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.checkboxRow, item.important && styles.checkboxRowActive]}
        onPress={() => toggleImportant(item.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={item.important ? "checkbox" : "square-outline"}
          size={18}
          color={item.important ? colors.primary : colors.iconLight}
        />
        <Text style={styles.checkboxText}>Mark as Important</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => pick(item.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.selectButtonText}>
          {item.file ? item.file.name : "Select File"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => {}}
        activeOpacity={0.8}
      >
        <Text style={styles.uploadButtonText}>
          {item.file ? "Upload" : "Upload"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ id: "add", add: true }, ...docs]}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) =>
          item.add ? (
            <TouchableOpacity
              style={[styles.card, styles.addCard]}
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={32} color={colors.iconLight} />
            </TouchableOpacity>
          ) : (
            renderItem({ item })
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 12,
    paddingBottom: 24,
  },
  row: {
    gap: 16,
    marginBottom: 16,
  },
  card: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 12,
    minHeight: 160,
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  addCard: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryText,
  },
  titleInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: colors.primaryText,
    backgroundColor: colors.backgroundLight,
  },
  actionChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionChipText: {
    marginLeft: 6,
    fontSize: 12,
    color: colors.primary,
    fontWeight: "600",
  },
  actionChipTextPrimary: {
    marginLeft: 6,
    fontSize: 12,
    color: colors.whiteText,
    fontWeight: "700",
  },
  badgeSmall: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.navActive,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeSmallText: {
    marginLeft: 4,
    fontSize: 11,
    color: colors.primary,
    fontWeight: "600",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.backgroundLight,
    marginBottom: 8,
  },
  checkboxRowActive: {
    borderColor: colors.primary,
  },
  checkboxText: {
    fontSize: 12,
    color: colors.primaryText,
  },
  selectButton: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 8,
    backgroundColor: colors.backgroundLight,
  },
  selectButtonText: {
    fontSize: 13,
    color: colors.primaryText,
  },
  uploadButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  uploadButtonText: {
    color: colors.whiteText,
    fontWeight: "700",
    fontSize: 14,
  },
});
