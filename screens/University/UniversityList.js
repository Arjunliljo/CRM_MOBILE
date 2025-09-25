import React, { useState, useMemo } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { colors } from "../../constants/colors";
import UniversityCard from "../../components/University/UniversityCard";
import SearchBar from "../../components/University/SearchBar";
import FilterSection from "../../components/University/FilterSection";
import ResultsHeader from "../../components/University/ResultsHeader";
import { useUniversities } from "./hooks/useUniversities";
import { useSelector } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen";

export default function UniversityPage({ navigation }) {
  const { countries } = useSelector((state) => state.bootstrap);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

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

  const universities = useMemo(
    () => data?.pages?.flatMap((p) => p.items) || [],
    [data]
  );
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

            {/* <ResultsHeader count={universities.length} /> */}

            {/* Universities List */}
            <FlatList
              data={universities}
              keyExtractor={(item) => item._id || item.id}
              renderItem={({ item }) => (
                <UniversityCard
                  university={item}
                  onPress={navigateToCourses}
                  countries={countries}
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
