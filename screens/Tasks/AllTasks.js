import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import TaskCard from "../../components/Tasks/TaskCard";
import { useTask } from "./hooks/useTask";
import LoadingScreen from "../../components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { setCompletedFollowups } from "../../global/taskSlice";

export default function AllTasks() {
  const { data: tasks, isLoading, error, refetch } = useTask();
  const dispatch = useDispatch();
  const {
    completedFollowups,
    branch,
    selectedUser,
    startDate,
    endDate,
    status,
    subStatus,
  } = useSelector((state) => state.task);

  const leads = tasks?.data?.leads;
  const completedFollowupsCount = tasks?.data?.totalCompletedFollowups || 0;
  const totalPendingFollowups = tasks?.data?.totalPendingFollowups || 0;
  const totalUpcomingFollowups = tasks?.data?.totalUpcomingFollowups || 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("pending");

  useEffect(() => {
    if (completedFollowups) {
      setActiveTab("closed");
    } else {
      setActiveTab("pending");
    }
  }, [completedFollowups]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    dispatch(setCompletedFollowups(tab === "closed"));
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.iconLight} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={colors.placeholderText}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Statistics Row */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Queued:</Text>
          <Text style={styles.statValue}>{totalPendingFollowups}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Upcoming:</Text>
          <Text style={[styles.statValue, styles.upcomingValue]}>
            {totalUpcomingFollowups}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Closed:</Text>
          <Text style={[styles.statValue, styles.closedValue]}>
            {completedFollowupsCount}
          </Text>
        </View>
      </View>

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "pending" && styles.activeTabButton,
          ]}
          onPress={() => handleTabChange("pending")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "pending" && styles.activeTabButtonText,
            ]}
          >
            Pendings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "closed" && styles.activeTabButton,
          ]}
          onPress={() => handleTabChange("closed")}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === "closed" && styles.activeTabButtonText,
            ]}
          >
            Closed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <TaskCard task={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    margin: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.primaryText,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondaryText,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  upcomingValue: {
    color: colors.success,
  },
  closedValue: {
    color: colors.error,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondaryText,
  },
  activeTabButtonText: {
    color: colors.whiteText,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
