import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../constants/colors";
import StudentsMain from "../../screens/Students/StudentsMain";

const Stack = createNativeStackNavigator();

export default function StudentStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTintColor: colors.headerTint,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="StudentsList"
        component={StudentsMain}
        options={{ title: "Students", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
