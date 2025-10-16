import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SvgUri } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./SplashscreenStyle";

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={["#f0f0f0", "#f0f0f0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.logoSection}>
        <SvgUri
          uri="https://skybook.co.in/assets/mlq-01pro-D4uE4mES.svg"
          width={180}
          height={180}
        />
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Skymark CRM</Text>
        <Text style={styles.infoDescription}>
          Stay ahead of the weather in your city and plan your day with
          confidence.
        </Text>
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
          <Ionicons name="arrow-forward" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
