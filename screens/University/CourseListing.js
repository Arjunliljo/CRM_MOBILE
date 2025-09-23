import React, { useState, useMemo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { colors } from "../../constants/colors";
import CourseCard from "../../components/Course/CourseCard";
import CourseSearchBar from "../../components/Course/CourseSearchBar";
import CourseResultsHeader from "../../components/Course/CourseResultsHeader";
import CourseDetailsModal from "../../components/Course/CourseDetailsModal";

export default function CourseListing({ route, navigation }) {
  const { university } = route.params;
  const [searchQuery, setSearchQuery] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);

  // Filter courses based on search
  const filteredCourses = useMemo(() => {
    if (!searchQuery) return university.courses;
    return university.courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.degree.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [university.courses, searchQuery]);

  const showCourseDetailsModal = (course) => {
    setSelectedCourseDetails(course);
    setShowCourseDetails(true);
  };

  const handleApplyCourse = (selectionData) => {
    setShowCourseDetails(false);

    // You can navigate to application form or handle the application
    // navigation.navigate('ApplicationForm', {
    //   course: selectionData.course,
    //   university: selectionData.university,
    //   intake: {
    //     month: selectionData.intakeMonth,
    //     year: selectionData.intakeYear
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <CourseSearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <CourseResultsHeader count={filteredCourses.length} />

      {/* Courses List */}
      <FlatList
        data={filteredCourses}
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
