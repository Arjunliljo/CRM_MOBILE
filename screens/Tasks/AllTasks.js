import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

// Local imports
import { colors } from "../../constants/colors";
import TaskCard from "../../components/Tasks/TaskCard";
import TaskCardSkeleton from "../../components/Tasks/TaskCardSkeleton";
import StatsSkeleton from "../../components/Tasks/StatsSkeleton";
import { useTask } from "./hooks/useTask";
import { setCompletedFollowups } from "../../global/taskSlice";

// Constants
const TAB_TYPES = {
  PENDING: "pending",
  CLOSED: "closed",
};

const ANIMATION_CONFIG = {
  DURATION: 1000,
  OPACITY_RANGE: [0.1, 0.3],
};

const SKELETON_COUNT = 5;

export default function AllTasks() {
  // Redux state and hooks
  const dispatch = useDispatch();
  const { data: tasks, isLoading, error, refetch } = useTask();
  const {
    completedFollowups,
    branch,
    selectedUser,
    startDate,
    endDate,
    status,
    subStatus,
  } = useSelector((state) => state.task);

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState(TAB_TYPES.PENDING);
  const [refreshing, setRefreshing] = useState(false);

  // Animation refs
  const buttonShimmerAnimation = useRef(new Animated.Value(0)).current;

  // Computed values
  const leads = tasks?.data?.leads || [];
  const statistics = {
    completed: tasks?.data?.totalCompletedFollowups || 0,
    pending: tasks?.data?.totalPendingFollowups || 0,
    upcoming: tasks?.data?.totalUpcomingFollowups || 0,
  };

  // Effects
  useEffect(() => {
    const newTab = completedFollowups ? TAB_TYPES.CLOSED : TAB_TYPES.PENDING;
    setActiveTab(newTab);
  }, [completedFollowups]);

  // Call API when screen is focused (when task route is clicked)
  useFocusEffect(
    useCallback(() => {
      // Refetch data when the screen comes into focus
      if (refetch) {
        refetch();
      }
    }, [refetch])
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      if (refetch) {
        await refetch();
      }
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (!isLoading) return;

    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonShimmerAnimation, {
          toValue: 1,
          duration: ANIMATION_CONFIG.DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(buttonShimmerAnimation, {
          toValue: 0,
          duration: ANIMATION_CONFIG.DURATION,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();
    return () => shimmerAnimation.stop();
  }, [isLoading, buttonShimmerAnimation]);

  // Event handlers
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
      dispatch(setCompletedFollowups(tab === TAB_TYPES.CLOSED));
    },
    [dispatch]
  );

  // Memoized functions for performance
  const renderItem = useCallback(
    ({ item }) => (
      <TaskCard task={item} activeTab={activeTab} onRefresh={refetch} />
    ),
    [activeTab]
  );

  const keyExtractor = useCallback((item) => item._id, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: 120,
      offset: 120 * index,
      index,
    }),
    []
  );

  // Memoized data
  const filteredLeads = useMemo(() => {
    if (leads.length === 0) return [];
    return leads;
  }, [leads]);

  const shimmerStyle = useMemo(
    () => ({
      opacity: buttonShimmerAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ANIMATION_CONFIG.OPACITY_RANGE,
      }),
    }),
    [buttonShimmerAnimation]
  );

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
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Queued:</Text>
            <Text style={styles.statValue}>{statistics.pending}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Upcoming:</Text>
            <Text style={[styles.statValue, styles.upcomingValue]}>
              {statistics.upcoming}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Closed:</Text>
            <Text style={[styles.statValue, styles.closedValue]}>
              {statistics.completed}
            </Text>
          </View>
        </View>
      )}

      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === TAB_TYPES.PENDING && styles.activeTabButton,
            isLoading && styles.dimmedButton,
          ]}
          onPress={() => !isLoading && handleTabChange(TAB_TYPES.PENDING)}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === TAB_TYPES.PENDING && styles.activeTabButtonText,
              isLoading && styles.dimmedButtonText,
            ]}
          >
            Pendings
          </Text>
          {isLoading && (
            <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === TAB_TYPES.CLOSED && styles.activeTabButton,
            isLoading && styles.dimmedButton,
          ]}
          onPress={() => !isLoading && handleTabChange(TAB_TYPES.CLOSED)}
          disabled={isLoading}
        >
          <Text
            style={[
              styles.tabButtonText,
              activeTab === TAB_TYPES.CLOSED && styles.activeTabButtonText,
              isLoading && styles.dimmedButtonText,
            ]}
          >
            Closed
          </Text>
          {isLoading && (
            <Animated.View style={[styles.shimmerOverlay, shimmerStyle]} />
          )}
        </TouchableOpacity>
      </View>

      {/* Task List */}
      {isLoading ? (
        <View style={styles.listContainer}>
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <TaskCardSkeleton key={`skeleton-${index}`} />
          ))}
        </View>
      ) : (
        <FlatList
          data={filteredLeads}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={50}
          initialNumToRender={10}
          windowSize={10}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
              tintColor={colors.primary}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  // Search bar styles
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

  // Statistics styles
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

  // Tab button styles
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
    position: "relative",
  },
  activeTabButton: {
    backgroundColor: colors.primary,
  },
  dimmedButton: {
    opacity: 0.6,
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.secondaryText,
  },
  activeTabButtonText: {
    color: colors.whiteText,
  },
  dimmedButtonText: {
    opacity: 0.7,
  },
  shimmerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.primary,
    borderRadius: 6,
  },
});
