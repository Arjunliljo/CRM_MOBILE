import React, { useState } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import TaskCard from "../../components/Tasks/TaskCard";

const dummyTasks = [
  {
    _id: "task-001",
    name: "Follow up with Aswin",
    email: "",
    phone: "8606785438",
    district: "Kozhikode",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    branch: "Kozhikode",
    status: "Open",
    substatus: "Pending Docs",
    country: "India",
    source: "CRM",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
];

export default function AllTasks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState(dummyTasks);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const f = dummyTasks.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.email.toLowerCase().includes(query.toLowerCase()) ||
          t.phone.includes(query)
      );
      setFiltered(f);
    } else {
      setFiltered(dummyTasks);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.iconLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search tasks..."
          placeholderTextColor={colors.placeholderText}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.primaryText,
  },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
});
