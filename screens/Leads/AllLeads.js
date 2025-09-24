import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import LeadCard from "../../components/Leads/LeadCard";
import { useLeads } from "./hooks/useLeads";
import LoadingScreen from "../../components/LoadingScreen";

const dummyLeads = [
  {
    _id: "68cd1beb2777fbc3ccc4f608",
    leadSource: "WhatsApp",
    name: "Aswin",
    email: "",
    phone: "8606785438",
    district: "Kozhikode",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Kozhikode",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "WhatsApp",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1bdb2777fbc3ccc39a75",
    leadSource: "Meta",
    name: "Athirasurendranath",
    email: "athirasnath0411@gmail.com",
    phone: "9656624929",
    district: "N/A",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "Meta",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1bd62777fbc3ccc341f5",
    leadSource: "Meta",
    name: "Sibin Raj",
    email: "sibinraj0123@gmail.com",
    phone: "9995336703",
    district: "N/A",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut  ",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "Meta",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1b022777fbc3ccbaf855",
    leadSource: "WhatsApp",
    name: "Ronald",
    email: "",
    phone: "8606832955",
    district: "Kozhikode",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut",
    status: "University Student",
    substatus: "University Rejected",
    country: "",
    source: "WhatsApp",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1beb2777fbc3ccc4f609",
    leadSource: "WhatsApp",
    name: "Aswin",
    email: "",
    phone: "8606785438",
    district: "Kozhikode",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Kozhikode",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "WhatsApp",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1bdb2777fbc3ccc39a76",
    leadSource: "Meta",
    name: "Athirasurendranath",
    email: "athirasnath0411@gmail.com",
    phone: "9656624929",
    district: "N/A",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "Meta",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1bd62777fbc3ccc341f6",
    leadSource: "Meta",
    name: "Sibin Raj",
    email: "sibinraj0123@gmail.com",
    phone: "9995336703",
    district: "N/A",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut  ",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "Meta",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1b022777fbc3ccbaf856",
    leadSource: "WhatsApp",
    name: "Ronald",
    email: "",
    phone: "8606832955",
    district: "Kozhikode",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut",
    status: "University Student",
    substatus: "University Rejected",
    country: "",
    source: "WhatsApp",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1beb2777fbc3ccc4f60a",
    leadSource: "WhatsApp",
    name: "Aswin",
    email: "",
    phone: "8606785438",
    district: "Kozhikode",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Kozhikode",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "WhatsApp",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1bdb2777fbc3ccc39a77",
    leadSource: "Meta",
    name: "Athirasurendranath",
    email: "athirasnath0411@gmail.com",
    phone: "9656624929",
    district: "N/A",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "Meta",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1bd62777fbc3ccc341f7",
    leadSource: "Meta",
    name: "Sibin Raj",
    email: "sibinraj0123@gmail.com",
    phone: "9995336703",
    district: "N/A",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut  ",
    status: "University Student",
    substatus: "University Rejected",
    country: "India",
    source: "Meta",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
  {
    _id: "68cd1b022777fbc3ccbaf857",
    leadSource: "WhatsApp",
    name: "Ronald",
    email: "",
    phone: "8606832955",
    district: "Kozhikode",
    img: "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg",
    countryCode: "+91",
    branch: "Calicut",
    status: "University Student",
    substatus: "University Rejected",
    country: "",
    source: "WhatsApp",
    followupDate: "Sep 20, 2025",
    createdAt: "Sep 15, 2025",
  },
];

export default function AllLeads({
  isSelectionMode,
  selectedLeads,
  onLeadSelection,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);

  const {
    leads,
    isLoading,
    totalLeads,
    isLoadingMore,
    error,
    refetch,
    fetchNextPage,
    hasMore,
  } = useLeads();

  useEffect(() => {
    if (leads.length > 0) {
      // setFilteredLeads(leads);
    }
  }, [leads]);

  const handleEndReached = () => {
    if (!isLoadingMore && hasMore) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = dummyLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(query.toLowerCase()) ||
          lead.email.toLowerCase().includes(query.toLowerCase()) ||
          lead.phone.includes(query)
      );
      // setFilteredLeads(filtered);
    } else {
      // setFilteredLeads(dummyLeads);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.iconLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          placeholderTextColor={colors.placeholderText}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Leads List */}
      <FlatList
        data={leads}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <LeadCard
            Lead={item}
            isSelectionMode={isSelectionMode}
            isSelected={selectedLeads?.includes(item._id)}
            onSelection={() => onLeadSelection?.(item._id)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        refreshing={isLoading}
        onRefresh={refetch}
        ListFooterComponent={isLoadingMore ? <LoadingScreen /> : null}
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
