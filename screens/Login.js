import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  useWindowDimensions,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import api, { setAuthToken } from "../conf/conf";
import { LinearGradient } from "expo-linear-gradient";
import { SvgUri } from "react-native-svg";
import { Keyboard } from "react-native";

// Single PNG background replacement for the decorative SVGs
const LoginBg = require("../assets/Login_bg.png");
const LOGO_URI =
  "https://res.cloudinary.com/ds07e7rod/image/upload/v1738836367/skymarkLogo_drgzcw.svg";

export default function Login() {
  const navigation = useNavigation();
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { height: screenHeight } = useWindowDimensions();
  const isSmallScreen = screenHeight < 700; // roughly iPhone SE and similar

  const { width: screenWidth } = useWindowDimensions();

  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const translateY = useRef(new Animated.Value(0)).current;

  // Remote logo still uses SvgUri; background uses a static PNG

  useEffect(() => {
    const keyboardWillShow =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardWillHide =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(keyboardWillShow, (e) => {
      Animated.timing(translateY, {
        toValue: -e.endCoordinates.height / 2,
        duration: Platform.OS === "ios" ? e.duration : 250,
        useNativeDriver: true,
      }).start();
    });

    const hideSubscription = Keyboard.addListener(keyboardWillHide, (e) => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: Platform.OS === "ios" ? e.duration : 250,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [translateY]);

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/user/login", {
        email: email.trim(),
        password: password,
      });

      console.log(res.data.accessToken, "token");

      if (res?.status === 200 || res?.status === 201) {
        navigation.reset({ index: 0, routes: [{ name: "Main" }] });
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (e) {
      const message =
        e?.response?.data?.message || e?.message || "Unable to login.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // helpers for positioning decorative vectors approximately like in Figma
  const pctW = (v) => (screenWidth * v) / 100;
  const pctH = (v) => (screenHeight * v) / 100;
  const sheetTop = pctH(40.73); // Figma: ~40.73% from top

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#f5f5f5", colors.background]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={styles.container}
      >
        {/* Background artwork replaced by a single PNG */}
        <Image
          source={LoginBg}
          style={{
            position: "absolute",
            top: 100,
            left: 0,
            right: 0,
            height: pctH(40),
            width: "100%",
            resizeMode: "contain",
          }}
        />
        {/* Top centered logo */}
        <View
          style={{
            position: "absolute",
            top: pctH(6),
            left: 0,
            right: 0,
            alignItems: "center",
          }}
        >
          <SvgUri uri={LOGO_URI} width={pctW(60)} height={pctH(7)} />
        </View>

        <Animated.View
          style={{
            flex: 1,
            transform: [{ translateY }],
          }}
        >
          <View style={[styles.scroll, { paddingTop: sheetTop }]}>
            {/* Bottom sheet card */}
            <View
              style={[styles.sheet, { minHeight: screenHeight - sheetTop }]}
            >
              <View
                style={[
                  styles.sheetInner,
                  isSmallScreen && styles.sheetInnerCompact,
                ]}
              >
                <View style={{ gap: 6, marginBottom: isSmallScreen ? 24 : 40 }}>
                  <Text style={styles.heroTitle}>Welcome Back!</Text>
                  <Text style={styles.heroSubtitle}>
                    Log in to manage students, applications, and reports.
                  </Text>
                </View>

                <View style={{ gap: isSmallScreen ? 12 : 16 }}>
                  <View style={{ gap: 7 }}>
                    <Text style={styles.fieldLabel}>Email address</Text>
                    <View style={styles.figmaInput}>
                      <TextInput
                        ref={emailInputRef}
                        style={styles.figmaTextInput}
                        placeholder="Enter your email address"
                        placeholderTextColor={colors.placeholderText}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={email}
                        onChangeText={setEmail}
                        returnKeyType="next"
                        underlineColorAndroid="transparent"
                        onSubmitEditing={() =>
                          passwordInputRef.current?.focus()
                        }
                      />
                    </View>
                  </View>

                  <View style={{ gap: 7 }}>
                    <Text style={styles.fieldLabel}>Password</Text>
                    <View style={styles.figmaInput}>
                      <TextInput
                        ref={passwordInputRef}
                        style={styles.figmaTextInput}
                        placeholder="Enter your password"
                        placeholderTextColor={colors.placeholderText}
                        secureTextEntry={!viewPassword}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                        returnKeyType="done"
                        onSubmitEditing={handleLogin}
                        underlineColorAndroid="transparent"
                      />
                      <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={handleViewPassword}
                      >
                        <Ionicons
                          name={
                            viewPassword ? "eye-off-outline" : "eye-outline"
                          }
                          size={20}
                          color={colors.secondaryText}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {!!error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                )}

                <View
                  style={{
                    gap: 8,
                    alignItems: "center",
                    marginTop: isSmallScreen ? 16 : 24,
                  }}
                >
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color={colors.whiteText} />
                    ) : (
                      <Text style={styles.loginButtonText}>Login</Text>
                    )}
                    <View
                      style={styles.buttonInsetShadow}
                      pointerEvents="none"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  // Figma bottom sheet styles
  sheet: {
    backgroundColor: "#fbfbfb",
    borderWidth: 1,
    borderColor: "rgba(36,78,162,0.08)",
    borderRadius: 16,
    marginHorizontal: 8,
    marginBottom: 0,
  },
  sheetInner: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sheetInnerCompact: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "600",
    color: "#072769",
    letterSpacing: -1.08 / 16,
  },
  heroSubtitle: {
    fontSize: 14,
    color: "rgba(7,39,105,0.7)",
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primaryText,
  },
  figmaInput: {
    height: 48,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  figmaTextInput: {
    flex: 1,
    color: colors.primaryText,
    fontSize: 14,
  },
  eyeButton: {
    padding: 6,
  },
  errorContainer: {
    marginBottom: 12,
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
  },
  forgotPasswordLink: {
    fontSize: 12,
    color: colors.primaryText,
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loginButtonText: {
    color: colors.whiteText,
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonInsetShadow: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 10,
    shadowColor: "rgba(66,108,192,0.95)",
    shadowOffset: { width: 0, height: -9 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
});
