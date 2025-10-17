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
    padding: 16,
    paddingTop: 40,
  },
  drawerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  drawerSubtitle: {
    color: colors.lightText,
    fontSize: 12,
    marginTop: 4,
  },
  menuContainer: {
    flex: 1,
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 22,
  },
  menuText: {
    fontSize: 14,
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
    padding: 16,
  },
  logoutButton: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  logoutText: {
    color: colors.whiteText,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CustomDrawerContent;
