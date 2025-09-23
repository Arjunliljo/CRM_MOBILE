import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../../constants/colors";
import TasksMain from "../../screens/Tasks/TasksMain";

const Stack = createNativeStackNavigator();

export default function TaskStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.headerBackground },
        headerTintColor: colors.headerTint,
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="TasksList"
        component={TasksMain}
        options={{ title: "Tasks", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
