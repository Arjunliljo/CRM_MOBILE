import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";

const { width } = Dimensions.get("window");

const Toast = ({
  visible,
  message,
  type = "error", // 'success', 'error', 'info', 'warning'
  duration = 3000,
  onHide,
}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after duration
      const timer = setTimeout(() => {
        hideToast();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide && onHide();
    });
  };

  const getToastStyle = () => {
    switch (type) {
      case "success":
        return styles.successToast;
      case "warning":
        return styles.warningToast;
      case "info":
        return styles.infoToast;
      default:
        return styles.errorToast;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "warning":
        return "warning";
      case "info":
        return "information-circle";
      default:
        return "alert-circle";
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        getToastStyle(),
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <View style={styles.content}>
        <Ionicons
          name={getIcon()}
          size={20}
          color={type === "error" ? "#fff" : "#fff"}
        />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
          <Ionicons name="close" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 9999,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  message: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 12,
  },
  closeButton: {
    padding: 4,
  },
  successToast: {
    backgroundColor: "#4CAF50",
  },
  errorToast: {
    backgroundColor: "#F44336",
  },
  warningToast: {
    backgroundColor: "#FF9800",
  },
  infoToast: {
    backgroundColor: "#2196F3",
  },
});

export default Toast;
  