import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import DrawerNavigator from "./DrawerNavigator";
import LeadDetails from "../screens/Leads/LeadDetails/LeadDetails";
import ApplicationDetails from "../screens/Applications/ApplicationDetails/ApplicationDetails";
import StudentDetails from "../screens/Students/StudentDetails/StudentDetails";
import TaskDetails from "../screens/Tasks/TaskDetails/TaskDetails";
import CourseListing from "../screens/University/CourseListing";
import LeadChat from "../screens/Leads/LeadDetails/LeadChat";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LeadDetails"
          component={LeadDetails}
          options={({ navigation }) => ({
            title: "Lead Details",
            headerShown: true,
            headerBackTitle: "Back",
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Main", { screen: "Leads" })}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="LeadChat"
          component={LeadChat}
          options={{
            title: "Chat",
            headerShown: true,
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="StudentDetails"
          component={StudentDetails}
          options={{
            title: "Student Details",
            headerShown: true,
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="ApplicationDetails"
          component={ApplicationDetails}
          options={{
            title: "Application Details",
            headerShown: true,
            headerBackTitle: "Back",
          }}
        />
        <Stack.Screen
          name="TaskDetails"
          component={TaskDetails}
          options={{
            title: "Task Details",
            headerShown: true,
            headerBackTitle: "Back",
          }}
        />

        <Stack.Screen
          name="CourseListing"
          component={CourseListing}
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            title: "Course Listing",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
