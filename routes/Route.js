import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import DrawerNavigator from "./DrawerNavigator";
import LeadDetails from "../screens/Leads/LeadDetails/LeadDetails";
import ApplicationDetails from "../screens/Applications/ApplicationDetails/ApplicationDetails";
import StudentDetails from "../screens/Students/StudentDetails/StudentDetails";
import CourseListing from "../screens/University/CourseListing";
import LeadChat from "../screens/Leads/LeadDetails/LeadChat";
import AddLead from "../screens/Leads/AddLead";

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
          options={{
            title: "Lead Details",
            headerShown: true,
            headerBackTitle: "Back",
          }}
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
          name="CourseListing"
          component={CourseListing}
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            title: "Course Listing",
          }}
        />
        <Stack.Screen
          name="AddLead"
          component={AddLead}
          options={{
            headerShown: true,
            headerBackTitle: "Back",
            title: "Add Lead",
            animation: "none",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
