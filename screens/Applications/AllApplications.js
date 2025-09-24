import React, { useState } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import ApplicationCard from "../../components/Applications/ApplicationCard";
import { useApplication } from "./hooks/useApplications";

const dummyApplications = [
  {
    _id: "app-001",
    name: "Aswin",
    email: "",
    phone: "8606785438",
    district: "Kozhikode",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Kozhikode",
    status: "In Review",
    substatus: "Docs Pending",
    country: "India",
    source: "Portal",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "app-002",
    name: "Athira",
    email: "athira@example.com",
    phone: "9656624929",
    district: "N/A",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut",
    status: "Submitted",
    substatus: "Under Review",
    country: "India",
    source: "Agent",
    followupDate: "Sep 21, 2025",
    createdAt: "Sep 16, 2025",
  },
];

export default function AllApplications() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState(dummyApplications);

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    refetch,
  } = useApplication();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const f = dummyApplications.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.email.toLowerCase().includes(query.toLowerCase()) ||
          item.phone.includes(query)
      );
      setFiltered(f);
    } else {
      setFiltered(dummyApplications);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.iconLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search applications..."
          placeholderTextColor={colors.placeholderText}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ApplicationCard application={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
