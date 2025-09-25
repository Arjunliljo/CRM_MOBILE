import React, { useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { colors } from "../../constants/colors";
import CourseCard from "../../components/Course/CourseCard";
import CourseSearchBar from "../../components/Course/CourseSearchBar";
import CourseResultsHeader from "../../components/Course/CourseResultsHeader";
import CourseDetailsModal from "../../components/Course/CourseDetailsModal";
import { useSelector } from "react-redux";

export default function CourseListing({ route, navigation }) {
  const { university } = route.params;
  const { countries } = useSelector((state) => state.bootstrap);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  const courses = university.courses;

  const showCourseDetailsModal = (course) => {
    setSelectedCourseDetails(course);
    setShowCourseDetails(true);
  };

  const handleApplyCourse = (selectionData) => {
    setShowCourseDetails(false);
  };

  return (
    <View style={styles.container}>
      <CourseSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CourseResultsHeader count={courses.length} />

      {/* Courses List */}
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            university={university}
            onPress={showCourseDetailsModal}
          />
        )}
        contentContainerStyle={styles.coursesList}
        showsVerticalScrollIndicator={false}
      />

      <CourseDetailsModal
        visible={showCourseDetails}
        onClose={() => setShowCourseDetails(false)}
        course={selectedCourseDetails}
        university={university}
        onApply={handleApplyCourse}
        countries={countries}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  coursesList: {
    padding: 16,
  },
});
