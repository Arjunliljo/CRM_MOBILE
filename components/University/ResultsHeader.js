import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";

const ResultsHeader = ({ count }) => {
  return (
    <View style={styles.resultsHeader}>
      <Text style={styles.resultsCount}>{count} Universities Found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBackground,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.secondaryText,
    fontWeight: "500",
  },
});

export default ResultsHeader;
