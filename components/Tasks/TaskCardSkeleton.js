import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { colors } from "../../constants/colors";

const TaskCardSkeleton = () => {
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
    <View style={styles.cardContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Animated.View style={[styles.avatar, shimmerStyle]} />
        <View style={styles.info}>
          <Animated.View style={[styles.name, shimmerStyle]} />
          <Animated.View style={[styles.company, shimmerStyle]} />
        </View>
      </View>

      {/* Actions Row */}
      <View style={styles.actionsRow}>
        <Animated.View style={[styles.actionButton, shimmerStyle]} />
        <Animated.View style={[styles.actionButton, shimmerStyle]} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Animated.View style={[styles.footerText, shimmerStyle]} />
        <Animated.View style={[styles.chevron, shimmerStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: colors.cardBackground,
    shadowColor: colors.shadow,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.border,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    width: "70%",
    height: 16,
    backgroundColor: colors.border,
    borderRadius: 8,
    marginBottom: 6,
  },
  company: {
    width: "50%",
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    height: 32,
    backgroundColor: colors.border,
    marginHorizontal: 4,
    borderRadius: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  footerText: {
    width: "60%",
    height: 12,
    backgroundColor: colors.border,
    borderRadius: 6,
  },
  chevron: {
    width: 16,
    height: 16,
    backgroundColor: colors.border,
    borderRadius: 8,
  },
});

export default TaskCardSkeleton;
