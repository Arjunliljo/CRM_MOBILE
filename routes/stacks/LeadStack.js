import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../constants/colors";
import LeadsMain from "../../screens/Leads/LeadsMain";
import LeadDetails from "../../screens/Leads/LeadDetails/LeadDetails";

const Stack = createNativeStackNavigator();

// Leads Stack Navigator
export default function LeadsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerBackground,
        },
        headerTintColor: colors.headerTint,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="LeadsList"
        component={LeadsMain}
        options={{
          title: "Leads",
          headerShown: false, // Hide stack header - drawer will show "Leads"
        }}
      />
    </Stack.Navigator>
  );
}
