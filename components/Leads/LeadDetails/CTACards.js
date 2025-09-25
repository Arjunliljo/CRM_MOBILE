import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CTAItem from "../../Common/CTAItem";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";

export default function CTACards({ navigation, lead }) {
  return (
    <View>
      <CTAItem
        iconName="chatbubble-ellipses-outline"
        title="Chat"
        subtitle="Open lead conversation"
        onPress={() =>
          navigation.navigate("LeadChat", {
            leadId: lead?.id || lead?._id,
            leadName: lead?.name,
          })
        }
      />

      <CTAItem
        iconName="document-text-outline"
        title="Add Documents"
        subtitle="Upload certificates and other files"
        onPress={() => navigation.navigate("Main", { screen: "Documents" })}
        containerStyle={{ marginTop: 8 }}
      />

      <CTAItem
        iconName="school-outline"
        title="University & Courses"
        subtitle="Open university selection"
        onPress={() =>
          navigation.navigate("Main", {
            screen: "University",
            params: { university: lead?.university?.[0] || lead?.university },
          })
        }
        containerStyle={{ marginTop: 8 }}
      />
    </View>
  );
}
