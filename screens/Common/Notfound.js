import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function UnderDevelopmentScreen() {
  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        {[...Array(8)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.patternCircle,
              { left: Math.random() * width, top: Math.random() * height },
            ]}
          />
        ))}
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="construct-outline" size={80} color="#1976D2" />
          </View>
        </View>

        {/* Status Badge */}
        <View style={styles.statusBadge}>
          <Ionicons name="time-outline" size={16} color="#fff" />
          <Text style={styles.statusText}>COMING SOON</Text>
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.mainTitle}>Under Development</Text>
        <Text style={styles.subtitle}>We're Working Hard</Text>

        {/* Description */}
        <Text style={styles.description}>
          This feature is currently under development. Our team is working hard
          to bring you something amazing. Please check back soon!
        </Text>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressLabel}>Development Progress</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>75% Complete</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backgroundPattern: { ...StyleSheet.absoluteFillObject, zIndex: -1 },
  patternCircle: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1976D2",
    opacity: 0.08,
  },
  content: { alignItems: "center", maxWidth: 400, width: "100%" },
  iconContainer: { marginBottom: 20 },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#1976D2",
    marginBottom: 20,
    gap: 6,
  },
  statusText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
    color: "#666",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 20,
    color: "rgba(0,0,0,0.6)",
  },
  progressContainer: { width: "100%", alignItems: "center", marginBottom: 40 },
  progressLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "rgba(0,0,0,0.5)",
  },
  progressBar: {
    width: "80%",
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    width: "75%",
    backgroundColor: "#1976D2",
    borderRadius: 4,
  },
  progressText: { fontSize: 12, fontWeight: "500", color: "rgba(0,0,0,0.5)" },
});
