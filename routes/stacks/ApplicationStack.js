import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../constants/colors";
import ApplicationsMain from "../../screens/Applications/ApplicationsMain";

const Stack = createNativeStackNavigator();

export default function ApplicationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTintColor: colors.headerTint,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="ApplicationsList"
        component={ApplicationsMain}
        options={{
          title: "Applications",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
