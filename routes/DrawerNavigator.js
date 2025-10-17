import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../constants/colors";
import DashBoard from "../screens/DashBoard";
import ApplicationStack from "./stacks/ApplicationStack";
import CustomDrawerContent from "./components/CustomDrawer";
import LeadsStack from "./stacks/LeadStack";
import StudentStack from "./stacks/StudentStack";
import TaskStack from "./stacks/TaskStack";
import DocumentUploader from "../screens/Documents/DocumentUploader";
import { Ionicons } from "@expo/vector-icons";
import UniversityList from "../screens/University/UniversityList";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="DashBoard"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#FDFEFF",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTintColor: "#07141D",
        headerTitleStyle: {
          fontWeight: "500",
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: {
          paddingTop: 8,
          paddingBottom: 8,
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
        name="Tasks"
        component={TaskStack}
        options={{
          title: "Tasks",
          headerTitle: "Tasks",
        }}
      />
      <Drawer.Screen
        name="Leads"
        component={LeadsStack}
        options={{
          title: "Leads",
          headerTitle: "Leads",
          headerTitleAlign: "center",
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
        component={UniversityList}
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
