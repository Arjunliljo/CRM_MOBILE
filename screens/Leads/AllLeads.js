import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import LeadCard from "../../components/Leads/LeadCard";
import { useLeads } from "./hooks/useLeads";
import LoadingScreen from "../../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { setLeadSearchQuery } from "../../global/leadSlice";

export default function AllLeads({
  isSelectionMode,
  selectedLeads,
  onLeadSelection,
}) {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.lead.searchQuery) || "";

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

  const handleEndReached = () => {
    if (!isLoadingMore && hasMore) {
      fetchNextPage();
    }
  };

  const handleSearch = (query) => {
    dispatch(setLeadSearchQuery(query));
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#999999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search leads..."
          placeholderTextColor="rgba(7,20,29,0.6)"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Leads List */}
      {isLoading ? (
        <LoadingScreen />
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    borderRadius: 74,
    paddingHorizontal: 14,
    paddingVertical: 12,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    color: colors.primaryText,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
