import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { useSelector } from "react-redux";

// SVG Icons from Figma (same as used in LeadsMain)
const homeIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21 11.2493V20.2493C21 20.4482 20.921 20.639 20.7803 20.7796C20.6397 20.9203 20.4489 20.9993 20.25 20.9993H15C14.8011 20.9993 14.6103 20.9203 14.4697 20.7796C14.329 20.639 14.25 20.4482 14.25 20.2493V15.3743C14.25 15.2748 14.2105 15.1795 14.1402 15.1091C14.0698 15.0388 13.9745 14.9993 13.875 14.9993H10.125C10.0255 14.9993 9.93016 15.0388 9.85983 15.1091C9.78951 15.1795 9.75 15.2748 9.75 15.3743V20.2493C9.75 20.4482 9.67098 20.639 9.53033 20.7796C9.38968 20.9203 9.19891 20.9993 9 20.9993H3.75C3.55109 20.9993 3.36032 20.9203 3.21967 20.7796C3.07902 20.639 3 20.4482 3 20.2493V11.2493C3.00018 10.8516 3.15834 10.4702 3.43969 10.189L10.9397 2.68899C11.221 2.4079 11.6023 2.25 12 2.25C12.3977 2.25 12.779 2.4079 13.0603 2.68899L20.5603 10.189C20.8417 10.4702 20.9998 10.8516 21 11.2493Z" fill="#FILL_COLOR#"/>
</svg>`;

const filterIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.3572 6.25875L21.3497 6.26719L15 13.0472V18.2494C15.0003 18.4968 14.9395 18.7405 14.8229 18.9587C14.7062 19.1769 14.5375 19.3628 14.3315 19.5L11.3315 21.5006C11.1055 21.6512 10.8427 21.7376 10.5714 21.7505C10.3001 21.7635 10.0303 21.7025 9.79095 21.5741C9.55157 21.4457 9.35155 21.2547 9.21225 21.0215C9.07294 20.7883 8.99957 20.5216 8.99997 20.25V13.0472L2.65029 6.26719L2.64279 6.25875C2.44755 6.04389 2.31886 5.77699 2.27232 5.49043C2.22579 5.20387 2.26341 4.90996 2.38063 4.64436C2.49785 4.37876 2.68962 4.15288 2.93269 3.99413C3.17575 3.83538 3.45966 3.75057 3.74997 3.75H20.25C20.5405 3.75003 20.8248 3.83444 21.0683 3.99298C21.3118 4.15152 21.504 4.37737 21.6216 4.64308C21.7391 4.90878 21.777 5.20292 21.7305 5.48973C21.6841 5.77655 21.5554 6.04371 21.36 6.25875H21.3572Z" fill="#FILL_COLOR#"/>
</svg>`;

const chartIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.75 19.5C21.75 19.6989 21.671 19.8897 21.5303 20.0303C21.3897 20.171 21.1989 20.25 21 20.25H3C2.80109 20.25 2.61032 20.171 2.46967 20.0303C2.32902 19.8897 2.25 19.6989 2.25 19.5C2.25 19.3011 2.32902 19.1103 2.46967 18.9697C2.61032 18.829 2.80109 18.75 3 18.75H3.75V12.75C3.75 12.5511 3.82902 12.3603 3.96967 12.2197C4.11032 12.079 4.30109 12 4.5 12H6.75C6.94891 12 7.13968 12.079 7.28033 12.2197C7.42098 12.3603 7.5 12.5511 7.5 12.75V18.75H9V8.25C9 8.05109 9.07902 7.86032 9.21967 7.71967C9.36032 7.57902 9.55109 7.5 9.75 7.5H12.75C12.9489 7.5 13.1397 7.57902 13.2803 7.71967C13.421 7.86032 13.5 8.05109 13.5 8.25V18.75H15V3.75C15 3.55109 15.079 3.36032 15.2197 3.21967C15.3603 3.07902 15.5511 3 15.75 3H19.5C19.6989 3 19.8897 3.07902 20.0303 3.21967C20.171 3.36032 20.25 3.55109 20.25 3.75V18.75H21C21.1989 18.75 21.3897 18.829 21.5303 18.9697C21.671 19.1103 21.75 19.3011 21.75 19.5Z" fill="#FILL_COLOR#"/>
</svg>`;

const plusIcon = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2.25C10.0716 2.25 8.18657 2.82183 6.58319 3.89317C4.97982 4.96452 3.73013 6.48726 2.99218 8.26884C2.25422 10.0504 2.06114 12.0108 2.43735 13.9021C2.81355 15.7934 3.74215 17.5307 5.10571 18.8943C6.46928 20.2579 8.20656 21.1865 10.0979 21.5627C11.9892 21.9389 13.9496 21.7458 15.7312 21.0078C17.5127 20.2699 19.0355 19.0202 20.1068 17.4168C21.1782 15.8134 21.75 13.9284 21.75 12C21.7468 9.41513 20.7185 6.93705 18.8907 5.10927C17.063 3.28149 14.5849 2.25323 12 2.25ZM15.75 12.75H12.75V15.75C12.75 15.9489 12.671 16.1397 12.5303 16.2803C12.3897 16.421 12.1989 16.5 12 16.5C11.8011 16.5 11.6103 16.421 11.4697 16.2803C11.329 16.1397 11.25 15.9489 11.25 15.75V12.75H8.25C8.05109 12.75 7.86033 12.671 7.71967 12.5303C7.57902 12.3897 7.5 12.1989 7.5 12C7.5 11.8011 7.57902 11.6103 7.71967 11.4697C7.86033 11.329 8.05109 11.25 8.25 11.25H11.25V8.25C11.25 8.05109 11.329 7.86032 11.4697 7.71967C11.6103 7.57902 11.8011 7.5 12 7.5C12.1989 7.5 12.3897 7.57902 12.5303 7.71967C12.671 7.86032 12.75 8.05109 12.75 8.25V11.25H15.75C15.9489 11.25 16.1397 11.329 16.2803 11.4697C16.421 11.6103 16.5 11.8011 16.5 12C16.5 12.1989 16.421 12.3897 16.2803 12.5303C16.1397 12.671 15.9489 12.75 15.75 12.75Z" fill="#FILL_COLOR#"/>
</svg>`;

export default function LeadsBottomNav() {
  const navigation = useNavigation();

  // Determine current tab from nested stack state under the Leads drawer route
  const currentChildRouteName = useNavigationState((state) => {
    const leadsRoute = state?.routes?.[state?.index || 0];
    let nestedState = leadsRoute?.state;
    while (nestedState && nestedState.routes && nestedState.index != null) {
      const nextRoute = nestedState.routes[nestedState.index];
      if (nextRoute?.state) {
        nestedState = nextRoute.state;
      } else {
        return nextRoute?.name;
      }
    }
    return "LeadsList";
  });

  const activeTab =
    currentChildRouteName === "LeadsFilters"
      ? "filters"
      : currentChildRouteName === "LeadsAnalytics"
      ? "analytics"
      : currentChildRouteName === "AddLead"
      ? "add"
      : "all";

  // Animations per tab (0 -> inactive, 1 -> active)
  const tabAnims = React.useRef({
    all: new Animated.Value(activeTab === "all" ? 1 : 0),
    filters: new Animated.Value(activeTab === "filters" ? 1 : 0),
    analytics: new Animated.Value(activeTab === "analytics" ? 1 : 0),
    add: new Animated.Value(activeTab === "add" ? 1 : 0),
  }).current;

  React.useEffect(() => {
    ["all", "filters", "analytics", "add"].forEach((key) => {
      Animated.timing(tabAnims[key], {
        toValue: activeTab === key ? 1 : 0,
        duration: 200,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true, // driving opacity/transform
      }).start();
    });
  }, [activeTab]);

  // Filter badge based on global lead filters
  const {
    searchQuery = "",
    curBranch,
    curCountry,
    curStatus,
    curSubStatus,
    curForm,
    curRole,
    curUser,
    curSource,
  } = useSelector((state) => state.lead) || {};
  const hasActiveFilters =
    [
      curBranch,
      curCountry,
      curStatus,
      curSubStatus,
      curForm,
      curRole,
      curUser,
      curSource,
    ].some((v) => v && v !== "All") || (searchQuery || "").trim() !== "";

  const goAll = () => {
    navigation.navigate("Leads", { screen: "LeadsList" });
  };

  const goFilters = () => {
    navigation.navigate("Leads", { screen: "LeadsFilters" });
  };

  const goAnalytics = () => {
    navigation.navigate("Leads", { screen: "LeadsAnalytics" });
  };

  const goAdd = () => {
    navigation.navigate("Leads", { screen: "AddLead" });
  };

  return (
    <View style={styles.bottomTabsContainer}>
      <View style={styles.bottomTabs}>
        <TouchableOpacity style={[styles.tabButton]} onPress={goAll}>
          <Animated.View
            pointerEvents="none"
            style={[styles.activeBgOverlay, { opacity: tabAnims.all }]}
          />
          <View style={styles.tabContent}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: tabAnims.all.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              }}
            >
              <SvgXml
                xml={homeIcon.replace("#FILL_COLOR#", "#07141D")}
                width={24}
                height={24}
              />
            </Animated.View>
            {activeTab === "all" && (
              <Animated.Text
                style={[
                  styles.activeTabLabel,
                  {
                    opacity: tabAnims.all,
                    transform: [
                      {
                        translateX: tabAnims.all.interpolate({
                          inputRange: [0, 1],
                          outputRange: [6, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                All leads
              </Animated.Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabButton]} onPress={goFilters}>
          <Animated.View
            pointerEvents="none"
            style={[styles.activeBgOverlay, { opacity: tabAnims.filters }]}
          />
          <View style={styles.tabContent}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: tabAnims.filters.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              }}
            >
              <SvgXml
                xml={filterIcon.replace("#FILL_COLOR#", "#07141D")}
                width={24}
                height={24}
              />
            </Animated.View>
            {activeTab === "filters" && (
              <Animated.Text
                style={[
                  styles.activeTabLabel,
                  {
                    opacity: tabAnims.filters,
                    transform: [
                      {
                        translateX: tabAnims.filters.interpolate({
                          inputRange: [0, 1],
                          outputRange: [6, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                Filters
              </Animated.Text>
            )}
          </View>
          {hasActiveFilters && <View style={styles.filterBadgeDot} />}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabButton]} onPress={goAnalytics}>
          <Animated.View
            pointerEvents="none"
            style={[styles.activeBgOverlay, { opacity: tabAnims.analytics }]}
          />
          <View style={styles.tabContent}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: tabAnims.analytics.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              }}
            >
              <SvgXml
                xml={chartIcon.replace("#FILL_COLOR#", "#07141D")}
                width={24}
                height={24}
              />
            </Animated.View>
            {activeTab === "analytics" && (
              <Animated.Text
                style={[
                  styles.activeTabLabel,
                  {
                    opacity: tabAnims.analytics,
                    transform: [
                      {
                        translateX: tabAnims.analytics.interpolate({
                          inputRange: [0, 1],
                          outputRange: [6, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                Analytics
              </Animated.Text>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabButton]} onPress={goAdd}>
          <Animated.View
            pointerEvents="none"
            style={[styles.activeBgOverlay, { opacity: tabAnims.add }]}
          />
          <View style={styles.tabContent}>
            <Animated.View
              style={{
                transform: [
                  {
                    scale: tabAnims.add.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              }}
            >
              <SvgXml
                xml={plusIcon.replace("#FILL_COLOR#", "#07141D")}
                width={24}
                height={24}
              />
            </Animated.View>
            {activeTab === "add" && (
              <Animated.Text
                style={[
                  styles.activeTabLabel,
                  {
                    opacity: tabAnims.add,
                    transform: [
                      {
                        translateX: tabAnims.add.interpolate({
                          inputRange: [0, 1],
                          outputRange: [6, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                Add
              </Animated.Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomTabsContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 5,
  },
  bottomTabs: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    borderRadius: 60,
    padding: 3,
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 40,
    backgroundColor: "#FDFEFF",
    position: "relative",
    overflow: "hidden",
  },
  activeTabButton: {
    backgroundColor: "#CFF3A6",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  activeTabLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "#000000",
    fontFamily: "Inter",
  },
  filterBadgeDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
  },
  activeBgOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#CFF3A6",
    borderRadius: 40,
  },
});
