import React from "react";
import { View, StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../constants/colors";
import LeadsMain from "../../screens/Leads/LeadsMain";
import LeadDetails from "../../screens/Leads/LeadDetails/LeadDetails";
import Filters from "../../screens/Leads/Filters";
import Analytics from "../../screens/Leads/Analytics";
import AddLead from "../../screens/Leads/AddLead";
import LeadsBottomNav from "../../components/Leads/LeadsBottomNav";

const Stack = createNativeStackNavigator();

// Leads Stack Navigator
export default function LeadsStack() {
  return (
    <View style={styles.container}>
      <View style={styles.stackContainer}>
        <Stack.Navigator
          screenOptions={{
            animation: "none",
            headerStyle: {
              backgroundColor: colors.headerBackground,
            },
            headerTintColor: colors.headerTint,
            headerTitleStyle: {
              fontWeight: "bold",
            },
            contentStyle: {
              backgroundColor: "#FFFFFF",
            },
          }}
        >
          <Stack.Screen
            name="LeadsList"
            component={LeadsMain}
            options={{
              title: "Leads",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LeadsFilters"
            component={Filters}
            options={{
              title: "Filters",
              headerShown: true,
              headerBackTitle: "Back",
              animation: "none",
            }}
          />
          <Stack.Screen
            name="LeadsAnalytics"
            component={Analytics}
            options={{
              title: "Analytics",
              headerShown: true,
              headerBackTitle: "Back",
              animation: "none",
            }}
          />
          <Stack.Screen
            name="AddLead"
            component={AddLead}
            options={{
              title: "Add Lead",
              headerShown: true,
              headerBackTitle: "Back",
              animation: "none",
            }}
          />
        </Stack.Navigator>
      </View>
      <LeadsBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  stackContainer: {
    flex: 1,
  },
});
