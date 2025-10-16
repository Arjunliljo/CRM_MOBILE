import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");
const VERTICAL_OFFSET = Math.round(height * 0.15); // push content a bit lower responsively

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: VERTICAL_OFFSET,
  },
  logoSection: {
    alignItems: "center",
  },
  infoCard: {
    width: "86%",
    marginTop: 28,
    backgroundColor: "#f0f0f0",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    // subtle elevated feel similar to the mock
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
  },
  infoTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2D7CF6",
    marginBottom: 12,
  },
  infoDescription: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },
  ctaButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#2D7CF6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#E6F0FF",
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(255,255,255,0.8)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: 14,
  },
});
