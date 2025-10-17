import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { colors } from "../../constants/colors";

// Import dummy data (you might want to move this to a separate data file)
const dummyLeads = [
  {
    _id: "68cd1beb2777fbc3ccc4f608",
    leadSource: "WhatsApp",
    status: "University Student",
    country: "India",
  },
  {
    _id: "68cd1bdb2777fbc3ccc39a75",
    leadSource: "Meta",
    status: "University Student",
    country: "India",
  },
  {
    _id: "68cd1bd62777fbc3ccc341f5",
    leadSource: "Meta",
    status: "University Student",
    country: "India",
  },
  // Add more dummy data as needed
];

export default function Analytics() {
  const getTotalLeads = () => dummyLeads.length;

  const getNewLeads = () =>
    dummyLeads.filter((lead) => lead.status === "New Lead").length;

  const getConvertedLeads = () =>
    dummyLeads.filter((lead) => lead.status === "Converted").length;

  const getLeadsBySource = () => {
    const sources = ["WhatsApp", "Meta", "Website", "Referral"];
    return sources.map((source) => ({
      source,
      count: dummyLeads.filter((lead) => lead.leadSource === source).length,
      percentage: (
        (dummyLeads.filter((lead) => lead.leadSource === source).length /
          dummyLeads.length) *
        100
      ).toFixed(1),
    }));
  };

  const getLeadsByCountry = () => {
    const countries = ["India", "UAE", "Canada", "Australia"];
    return countries.map((country) => ({
      country,
      count: dummyLeads.filter((lead) => lead.country === country).length,
      percentage: (
        (dummyLeads.filter((lead) => lead.country === country).length /
          dummyLeads.length) *
        100
      ).toFixed(1),
    }));
  };

  const getConversionRate = () => {
    const converted = getConvertedLeads();
    const total = getTotalLeads();
    return total > 0 ? ((converted / total) * 100).toFixed(1) : "0.0";
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Lead Analytics</Text>

        {/* Summary Cards */}
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{getTotalLeads()}</Text>
            <Text style={styles.summaryLabel}>Total Leads</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{getNewLeads()}</Text>
            <Text style={styles.summaryLabel}>New Leads</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>{getConvertedLeads()}</Text>
            <Text style={styles.summaryLabel}>Converted</Text>
          </View>
        </View>

        {/* Conversion Rate Card */}
        <View style={styles.conversionCard}>
          <Text style={styles.conversionRate}>{getConversionRate()}%</Text>
          <Text style={styles.conversionLabel}>Conversion Rate</Text>
        </View>

        {/* Lead Sources Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Lead Sources</Text>
          {getLeadsBySource().map(({ source, count, percentage }) => (
            <View key={source} style={styles.chartItem}>
              <Text style={styles.chartLabel}>{source}</Text>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { width: `${percentage}%` }]} />
              </View>
              <Text style={styles.chartValue}>{count}</Text>
            </View>
          ))}
        </View>

        {/* Lead Countries Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Leads by Country</Text>
          {getLeadsByCountry().map(({ country, count, percentage }) => (
            <View key={country} style={styles.chartItem}>
              <Text style={styles.chartLabel}>{country}</Text>
              <View style={styles.chartBar}>
                <View style={[styles.chartFill, { width: `${percentage}%` }]} />
              </View>
              <Text style={styles.chartValue}>{count}</Text>
            </View>
          ))}
        </View>

        {/* Performance Metrics */}
        <View style={styles.metricsSection}>
          <Text style={styles.chartTitle}>Performance Metrics</Text>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Average Response Time</Text>
            <Text style={styles.metricValue}>2.5 hours</Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Follow-up Rate</Text>
            <Text style={styles.metricValue}>85%</Text>
          </View>

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Quality Score</Text>
            <Text style={styles.metricValue}>4.2/5.0</Text>
          </View>
        </View>
      </ScrollView>
    </View>
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
