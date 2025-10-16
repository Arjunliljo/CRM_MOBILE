import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import api, { setAuthToken } from "../conf/conf";
import { LinearGradient } from "expo-linear-gradient";
import { Asset } from "expo-asset";
import { SvgUri } from "react-native-svg";

// We will load local SVGs via require() to get a URI, then render with SvgUri
const Vector1 = require("../assets/c4c2b5f5bf242a9d1381cfbf475a231e81c29173.svg");
const GroupBg = require("../assets/4d29e5998c01801cc124c243a3d36ffe04baf94f.svg");
const Group1 = require("../assets/36cde60aa9ec349a8bdd4845f3e6d1379f2dc9b5.svg");
const Group2 = require("../assets/1916e9deaa763fc308513e71647573634bae2925.svg");
const Group3 = require("../assets/6a03039be0c69634d00a451059bea5e49bcd315d.svg");
const Group4 = require("../assets/148780a42d4864f64b9009ae7374c6f40a6a4fe2.svg");
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

  const compact = {
    paddingTop: isSmallScreen ? 24 : 60,
    paddingBottom: isSmallScreen ? 16 : 40,
    sectionGap: isSmallScreen ? 16 : 40,
    logoSize: isSmallScreen ? 72 : 100,
    logoGap: isSmallScreen ? 12 : 20,
    formPadding: isSmallScreen ? 16 : 24,
    inputPaddingV: isSmallScreen ? 10 : 12,
    buttonMarginBottom: isSmallScreen ? 16 : 24,
  };

  const { width: screenWidth } = useWindowDimensions();

  // Cross-platform SVG renderer using uri from expo-asset
  const renderSvg = (requiredAsset, width, height) => {
    const uri = Asset.fromModule(requiredAsset).uri;
    return <SvgUri uri={uri} width={width} height={height} />;
  };

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

      if (res?.status === 200 || res?.status === 201) {
        const token = res?.data?.token || res?.data?.accessToken;
        if (token) {
          setAuthToken(token);
        }
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
        {/* Decorative background artwork */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: pctH(52),
            overflow: "hidden",
          }}
        >
          <View
            style={{ position: "absolute", top: pctH(18.4), left: pctW(0.5) }}
          >
            {renderSvg(Vector1, pctW(58), pctH(19))}
          </View>
          <View
            style={{ position: "absolute", top: pctH(29.3), left: -pctW(33) }}
          >
            {renderSvg(GroupBg, pctW(63), pctH(12))}
          </View>
          <View
            style={{ position: "absolute", top: pctH(21.6), right: -pctW(57) }}
          >
            {renderSvg(Group2, pctW(110), pctH(24))}
          </View>
          <View
            style={{ position: "absolute", top: pctH(37.7), left: pctW(17.7) }}
          >
            {renderSvg(Group1, pctW(36), pctH(8))}
          </View>
          <View
            style={{ position: "absolute", top: pctH(30.3), left: pctW(22.1) }}
          >
            {renderSvg(Group3, pctW(48), pctH(11))}
          </View>
          <View
            style={{ position: "absolute", top: pctH(20.6), left: pctW(63.3) }}
          >
            {renderSvg(Group4, pctW(14), pctH(6))}
          </View>
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
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{
              paddingTop: sheetTop,
              minHeight: screenHeight - sheetTop,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
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
                      />
                    </View>
                  </View>

                  <View style={{ gap: 7 }}>
                    <Text style={styles.fieldLabel}>Password</Text>
                    <View style={styles.figmaInput}>
                      <TextInput
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
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingTop: 24,
    paddingBottom: 70,
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
