import React, { useState, useMemo, useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { colors } from "../../constants/colors";
import UniversityCard from "../../components/University/UniversityCard";
import SearchBar from "../../components/University/SearchBar";
import FilterSection from "../../components/University/FilterSection";
import { useUniversities } from "./hooks/useUniversities";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";
import { useSelectedUniversity } from "./hooks/useSelectedUniversity";

export default function UniversityPage({ navigation, route }) {
  const { countries } = useSelector((state) => state.bootstrap);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const selectedFromParams = route?.params?.university;
  const selectedUniversityId = selectedFromParams || null;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useUniversities({
    searchQuery,
    country: selectedCountry,
  });

  const { data: fetchedSelectedUniversity } =
    useSelectedUniversity(selectedUniversityId);

  const universities = useMemo(() => {
    const items = data?.pages?.flatMap((p) => p.items) || [];
    if (!selectedUniversityId) return items;
    const idx = items.findIndex((u) => u?._id === selectedUniversityId);
    if (idx >= 0) {
      const selected = items[idx];
      const rest = items.filter((_, i) => i !== idx);
      return [selected, ...rest];
    }
    const selectedResolved = fetchedSelectedUniversity?.data?.data;
    if (selectedResolved && selectedResolved?._id) {
      // Avoid dupes if later pages include it
      if (items.some((u) => u?._id === selectedResolved._id)) return items;
      return [selectedResolved, ...items];
    }
    return items;
  }, [data, selectedUniversityId, fetchedSelectedUniversity]);
  const navigateToCourses = (university) => {
    navigation.navigate("CourseListing", {
      university: university,
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCountry={selectedCountry}
        onFilterPress={() => setShowFilters(!showFilters)}
        showFilters={showFilters}
      />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <>
            <FilterSection
              showFilters={showFilters}
              selectedCountry={selectedCountry}
              onCountrySelect={setSelectedCountry}
              onClearFilters={() => setSelectedCountry("all")}
              showCountryDropdown={showCountryDropdown}
              setShowCountryDropdown={setShowCountryDropdown}
            />

            {/* Universities List */}
            <FlatList
              data={universities}
              keyExtractor={(item) => item._id || item.id}
              renderItem={({ item }) => (
                <UniversityCard
                  university={item}
                  onPress={navigateToCourses}
                  countries={countries}
                  selected={
                    !!selectedUniversityId && item?._id === selectedUniversityId
                  }
                />
              )}
              contentContainerStyle={styles.universitiesList}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              key={viewMode} // Force re-render when view mode changes
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              ListFooterComponent={
                isFetchingNextPage ? (
                  <View style={{ paddingVertical: 16 }}>
                    <ActivityIndicator />
                  </View>
                ) : null
              }
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          </>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  universitiesList: {
    padding: 16,
  },
});
