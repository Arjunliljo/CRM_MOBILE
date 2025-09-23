import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

// Custom Drawer Content Component
function CustomDrawerContent({ navigation, state }) {
  const menuItems = [
    {
      name: "Dashboard",
      route: "DashBoard",
      icon: <Ionicons name="home" size={24} color={colors.iconSecondary} />,
    },
    {
      name: "Tasks",
      route: "Tasks",
      icon: (
        <Ionicons
          name="checkmark-done"
          size={24}
          color={colors.iconSecondary}
        />
      ),
    },
    {
      name: "Leads",
      route: "Leads",
      icon: <Ionicons name="people" size={24} color={colors.iconSecondary} />,
    },
    {
      name: "Students",
      route: "Students",
      icon: <Ionicons name="school" size={24} color={colors.iconSecondary} />,
    },
    {
      name: "Application",
      route: "Applications",
      icon: <Ionicons name="document" size={24} color={colors.iconSecondary} />,
    },
  ];

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>SkyMark</Text>
        {/* <Text style={styles.drawerSubtitle}>Welcome back!</Text> */}
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => {
          const isActive = state.routeNames[state.index] === item.route;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, isActive && styles.activeMenuItem]}
              onPress={() => navigation.navigate(item.route)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text
                style={[styles.menuText, isActive && styles.activeMenuText]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.drawerFooter}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="log-out" size={20} color={colors.whiteText} />
          <Text style={styles.logoutText}> Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  drawerHeader: {
    backgroundColor: colors.backgroundLight,
    padding: 20,
    paddingTop: 50,
  },
  drawerTitle: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerSubtitle: {
    color: colors.lightText,
    fontSize: 14,
    marginTop: 5,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
  },
  menuText: {
    fontSize: 16,
    color: colors.primaryText,
    fontWeight: "500",
  },
  activeMenuItem: {
    backgroundColor: colors.navActive,
  },
  activeMenuText: {
    color: colors.primaryText,
    fontWeight: "600",
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 20,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: colors.whiteText,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
