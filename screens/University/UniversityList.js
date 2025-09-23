import React, { useState, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { colors } from "../../constants/colors";
import { universities } from "../../constants/universityData";
import UniversityCard from "../../components/University/UniversityCard";
import SearchBar from "../../components/University/SearchBar";
import FilterSection from "../../components/University/FilterSection";
import ResultsHeader from "../../components/University/ResultsHeader";

export default function UniversityPage({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  // Filter universities based on search and filters
  const filteredUniversities = useMemo(() => {
    return universities.filter((university) => {
      const matchesSearch =
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.courses.some((course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCountry =
        selectedCountry === "all" || university.country === selectedCountry;

      return matchesSearch && matchesCountry;
    });
  }, [searchQuery, selectedCountry]);

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

      <FilterSection
        showFilters={showFilters}
        selectedCountry={selectedCountry}
        onCountrySelect={setSelectedCountry}
        onClearFilters={() => setSelectedCountry("all")}
        showCountryDropdown={showCountryDropdown}
        setShowCountryDropdown={setShowCountryDropdown}
      />

      <ResultsHeader count={filteredUniversities.length} />

      {/* Universities List */}
      <FlatList
        data={filteredUniversities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UniversityCard university={item} onPress={navigateToCourses} />
        )}
        contentContainerStyle={styles.universitiesList}
        showsVerticalScrollIndicator={false}
        numColumns={viewMode === "grid" ? 1 : 1}
        key={viewMode} // Force re-render when view mode changes
      />
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
