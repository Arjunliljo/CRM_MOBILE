import { View, ActivityIndicator, StyleSheet } from "react-native-web";
import { colors } from "../constants/colors";

export default function LoadingScreen(size = "small", color = colors.primary) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
