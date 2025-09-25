import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { styles as leadDetailsStyles } from "../../screens/Leads/LeadDetails/leadDetailsStyle";

export default function CTAItem({
  iconName,
  title,
  subtitle,
  onPress,
  containerStyle = {},
  activeOpacity = 0.85,
}) {
  return (
    <TouchableOpacity
      style={[leadDetailsStyles.ctaCard, containerStyle]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <View style={leadDetailsStyles.ctaIconWrap}>
        <Ionicons name={iconName} size={20} color={colors.primary} />
      </View>
      <View style={leadDetailsStyles.ctaTextWrap}>
        <Text style={leadDetailsStyles.ctaTitle}>{title}</Text>
        <Text style={leadDetailsStyles.ctaSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.primary} />
    </TouchableOpacity>
  );
}
