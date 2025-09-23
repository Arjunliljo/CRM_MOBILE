import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { colors } from "../../constants/colors";

const dummyStudents = [
  { _id: "stu-001", source: "Referral", status: "Active", country: "India" },
  { _id: "stu-002", source: "Website", status: "New", country: "UAE" },
  { _id: "stu-003", source: "Referral", status: "Active", country: "India" },
];

export default function Analytics() {
  const getTotal = () => dummyStudents.length;
  const getNew = () => dummyStudents.filter((a) => a.status === "New").length;
  const getActive = () =>
    dummyStudents.filter((a) => a.status === "Active").length;

  const getBySource = () => {
    const sources = ["Referral", "Website", "Agent", "Event"];
    return sources.map((source) => {
      const count = dummyStudents.filter((a) => a.source === source).length;
      const percentage = ((count / dummyStudents.length) * 100).toFixed(1);
      return { source, count, percentage };
    });
  };

  const getByCountry = () => {
    const countries = ["India", "UAE", "Canada", "Australia"];
    return countries.map((country) => {
      const count = dummyStudents.filter((a) => a.country === country).length;
      const percentage = ((count / dummyStudents.length) * 100).toFixed(1);
      return { country, count, percentage };
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Student Analytics</Text>

      <View style={styles.summaryCards}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getTotal()}</Text>
          <Text style={styles.summaryLabel}>Total Students</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getNew()}</Text>
          <Text style={styles.summaryLabel}>New</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getActive()}</Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>Sources</Text>
        {getBySource().map(({ source, count, percentage }) => (
          <View key={source} style={styles.chartItem}>
            <Text style={styles.chartLabel}>{source}</Text>
            <View style={styles.chartBar}>
              <View style={[styles.chartFill, { width: `${percentage}%` }]} />
            </View>
            <Text style={styles.chartValue}>{count}</Text>
          </View>
        ))}
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartTitle}>By Country</Text>
        {getByCountry().map(({ country, count, percentage }) => (
          <View key={country} style={styles.chartItem}>
            <Text style={styles.chartLabel}>{country}</Text>
            <View style={styles.chartBar}>
              <View style={[styles.chartFill, { width: `${percentage}%` }]} />
            </View>
            <Text style={styles.chartValue}>{count}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 20,
  },
  summaryCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    textAlign: "center",
  },
  chartSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primaryText,
    marginBottom: 16,
  },
  chartItem: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  chartLabel: { fontSize: 14, color: colors.primaryText, width: 80 },
  chartBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.navActive,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  chartFill: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  chartValue: {
    fontSize: 14,
    color: colors.primaryText,
    fontWeight: "600",
    width: 30,
    textAlign: "right",
  },
});
