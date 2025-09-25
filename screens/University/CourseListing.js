import React, { useMemo, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { colors } from "../../constants/colors";
import CourseCard from "../../components/Course/CourseCard";
import CourseSearchBar from "../../components/Course/CourseSearchBar";
import CourseResultsHeader from "../../components/Course/CourseResultsHeader";
import CourseDetailsModal from "../../components/Course/CourseDetailsModal";
import { useSelector, useDispatch } from "react-redux";
import { setCurSelectedCourse } from "../../global/leadSlice";

export default function CourseListing({ route, navigation }) {
  const { university } = route.params;
  const { countries } = useSelector((state) => state.bootstrap);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourseDetails, setSelectedCourseDetails] = useState(null);
  const dispatch = useDispatch();
  const courses = university.courses;

  const selectedFromParamsCourse = route?.params?.course;
  const selectedCourseId = selectedFromParamsCourse || null;

  const orderedCourses = useMemo(() => {
    if (!Array.isArray(courses)) return [];
    if (!selectedCourseId) return courses;
    const idx = courses.findIndex(
      (c) => c?._id === selectedCourseId || c?.id === selectedCourseId
    );
    if (idx < 0) return courses;
    const selected = courses[idx];
    const rest = courses.filter((_, i) => i !== idx);
    return [selected, ...rest];
  }, [courses, selectedCourseId]);

  const showCourseDetailsModal = (course) => {
    setSelectedCourseDetails(course);
    setShowCourseDetails(true);
  };

  const handleApplyCourse = (selectionData) => {
    dispatch(setCurSelectedCourse(selectionData));
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
        data={orderedCourses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CourseCard
            course={item}
            university={university}
            onPress={showCourseDetailsModal}
            selected={!!selectedCourseId && item?._id === selectedCourseId}
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
