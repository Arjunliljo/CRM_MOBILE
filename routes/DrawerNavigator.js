import { createDrawerNavigator } from "@react-navigation/drawer";
import { colors } from "../constants/colors";
import DashBoard from "../screens/DashBoard";
import Application from "../screens/Applications/Application";
import CustomDrawerContent from "./components/CustomDrawer";
import LeadsStack from "./stacks/LeadStack";

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
        name="LeadsList"
        component={LeadsStack}
        options={{
          title: "Leads",
          headerTitle: "Leads",
        }}
      />
      <Drawer.Screen
        name="Application"
        component={Application}
        options={{
          title: "Applications",
          headerTitle: "Applications",
        }}
      />
    </Drawer.Navigator>
  );
}
