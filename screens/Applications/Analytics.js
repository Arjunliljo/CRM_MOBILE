import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { colors } from "../../constants/colors";

const dummyApplications = [
  { _id: "app-001", source: "Portal", status: "Submitted", country: "India" },
  { _id: "app-002", source: "Agent", status: "In Review", country: "India" },
  { _id: "app-003", source: "Portal", status: "Accepted", country: "UAE" },
];

export default function Analytics() {
  const getTotal = () => dummyApplications.length;
  const getSubmitted = () =>
    dummyApplications.filter((a) => a.status === "Submitted").length;
  const getAccepted = () =>
    dummyApplications.filter((a) => a.status === "Accepted").length;

  const getBySource = () => {
    const sources = ["Portal", "Agent", "Website", "Referral"];
    return sources.map((source) => {
      const count = dummyApplications.filter((a) => a.source === source).length;
      const percentage = ((count / dummyApplications.length) * 100).toFixed(1);
      return { source, count, percentage };
    });
  };

  const getByCountry = () => {
    const countries = ["India", "UAE", "Canada", "Australia"];
    return countries.map((country) => {
      const count = dummyApplications.filter(
        (a) => a.country === country
      ).length;
      const percentage = ((count / dummyApplications.length) * 100).toFixed(1);
      return { country, count, percentage };
    });
  };

  const getAcceptanceRate = () => {
    const accepted = getAccepted();
    const total = getTotal();
    return total > 0 ? ((accepted / total) * 100).toFixed(1) : "0.0";
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Application Analytics</Text>

      <View style={styles.summaryCards}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getTotal()}</Text>
          <Text style={styles.summaryLabel}>Total Applications</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getSubmitted()}</Text>
          <Text style={styles.summaryLabel}>Submitted</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryNumber}>{getAccepted()}</Text>
          <Text style={styles.summaryLabel}>Accepted</Text>
        </View>
      </View>

      <View style={styles.conversionCard}>
        <Text style={styles.conversionRate}>{getAcceptanceRate()}%</Text>
        <Text style={styles.conversionLabel}>Acceptance Rate</Text>
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

      <View style={styles.metricsSection}>
        <Text style={styles.chartTitle}>Performance Metrics</Text>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Average Review Time</Text>
          <Text style={styles.metricValue}>3.0 days</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Completion Rate</Text>
          <Text style={styles.metricValue}>72%</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
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
  conversionCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  conversionRate: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.success,
    marginBottom: 4,
  },
  conversionLabel: {
    fontSize: 16,
    color: colors.secondaryText,
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
  chartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  chartLabel: {
    fontSize: 14,
    color: colors.primaryText,
    width: 80,
  },
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
  metricsSection: {
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 40,
  },
  metricItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  metricLabel: {
    fontSize: 16,
    color: colors.primaryText,
  },
  metricValue: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
});
