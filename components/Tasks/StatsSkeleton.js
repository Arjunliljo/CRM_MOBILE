import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "../../constants/colors";

const StatsSkeleton = () => {
  const shimmerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shimmer = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    shimmer.start();

    return () => shimmer.stop();
  }, [shimmerAnimation]);

  const shimmerStyle = {
    opacity: shimmerAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    }),
  };

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Animated.View style={[styles.skeletonLabel, shimmerStyle]} />
        <Animated.View style={[styles.skeletonValue, shimmerStyle]} />
      </View>
      <View style={styles.statItem}>
        <Animated.View style={[styles.skeletonLabel, shimmerStyle]} />
        <Animated.View style={[styles.skeletonValue, shimmerStyle]} />
      </View>
      <View style={styles.statItem}>
        <Animated.View style={[styles.skeletonLabel, shimmerStyle]} />
        <Animated.View style={[styles.skeletonValue, shimmerStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.cardBackground,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  skeletonLabel: {
    width: 60,
    height: 14,
    backgroundColor: colors.border,
    borderRadius: 7,
    marginBottom: 8,
  },
  skeletonValue: {
    width: 40,
    height: 20,
    backgroundColor: colors.border,
    borderRadius: 10,
  },
});

export default StatsSkeleton;
