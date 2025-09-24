import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";

export default function CTACards({ navigation, editableLead }) {
  return (
    <View>
      <TouchableOpacity
        style={styles.ctaCard}
        onPress={() =>
          navigation.navigate("LeadChat", {
            leadId: editableLead?.id || editableLead?._id,
            leadName: editableLead?.name,
          })
        }
        activeOpacity={0.85}
      >
        <View style={styles.ctaIconWrap}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={20}
            color={colors.primary}
          />
        </View>
        <View style={styles.ctaTextWrap}>
          <Text style={styles.ctaTitle}>Chat</Text>
          <Text style={styles.ctaSubtitle}>Open lead conversation</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.ctaCard}
        onPress={() => navigation.navigate("Main", { screen: "Documents" })}
        activeOpacity={0.85}
      >
        <View style={styles.ctaIconWrap}>
          <Ionicons
            name="document-text-outline"
            size={20}
            color={colors.primary}
          />
        </View>
        <View style={styles.ctaTextWrap}>
          <Text style={styles.ctaTitle}>Add Documents</Text>
          <Text style={styles.ctaSubtitle}>
            Upload certificates and other files
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.ctaCard, { marginTop: 8 }]}
        onPress={() => navigation.navigate("Main", { screen: "University" })}
        activeOpacity={0.85}
      >
        <View style={styles.ctaIconWrap}>
          <Ionicons name="school-outline" size={20} color={colors.primary} />
        </View>
        <View style={styles.ctaTextWrap}>
          <Text style={styles.ctaTitle}>University & Courses</Text>
          <Text style={styles.ctaSubtitle}>Open university selection</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
