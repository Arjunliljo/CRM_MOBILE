import React from "react";
import { TouchableOpacity } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../constants/colors";
import DashBoard from "../screens/DashBoard";
import ApplicationStack from "./stacks/ApplicationStack";
import CustomDrawerContent from "./components/CustomDrawer";
import LeadsStack from "./stacks/LeadStack";
import StudentStack from "./stacks/StudentStack";
import DocumentUploader from "../screens/Documents/DocumentUploader";
import { Ionicons } from "@expo/vector-icons";
import UniversityPage from "../screens/University/UniversityPage";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="DashBoard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.headerTint,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerStyle: {
          backgroundColor: colors.backgroundLight,
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="DashBoard"
        component={DashBoard}
        options={{
          title: "Dashboard",
          headerTitle: "Dashboard",
        }}
      />
      <Drawer.Screen
        name="Leads"
        component={LeadsStack}
        options={{
          title: "Leads",
          headerTitle: "Leads",
        }}
      />
      <Drawer.Screen
        name="Students"
        component={StudentStack}
        options={{
          title: "Students",
          headerTitle: "Students",
        }}
      />
      <Drawer.Screen
        name="Applications"
        component={ApplicationStack}
        options={{
          title: "Applications",
          headerTitle: "Applications",
        }}
      />
      <Drawer.Screen
        name="University"
        component={UniversityPage}
        options={({ navigation }) => ({
          title: "University",
          headerTitle: "University",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                const parent = navigation.getParent();
                if (parent) {
                  parent.goBack();
                } else {
                  navigation.goBack();
                }
              }}
              style={{ marginLeft: 12 }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={colors.headerTint}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Drawer.Screen
        name="Documents"
        component={DocumentUploader}
        options={({ navigation }) => ({
          title: "Documents",
          headerTitle: "Documents",
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                const parent = navigation.getParent();
                if (parent) {
                  parent.goBack();
                } else {
                  navigation.goBack();
                }
              }}
              style={{ marginLeft: 12 }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={colors.headerTint}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Drawer.Navigator>
  );
}
