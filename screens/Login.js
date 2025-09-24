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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../constants/colors";
import api, { setAuthToken } from "../conf/conf";

export default function Login() {
  const navigation = useNavigation();
  const [viewPassword, setViewPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        {/* Header */}
        <View style={styles.header}></View>

        {/* Logo and Welcome */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="business" size={60} color={colors.primaryText} />
          </View>
          <Text style={[styles.welcomeText, { color: colors.primaryText }]}>
            Welcome Back
          </Text>
          <Text style={[styles.subtitleText, { color: colors.secondaryText }]}>
            Sign in to your CRM account
          </Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          <Text style={[styles.formTitle, { color: colors.primaryText }]}>
            Login
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={colors.secondaryText}
              />
              <TextInput
                style={[styles.textInput, { color: colors.primaryText }]}
                placeholder="Email address"
                placeholderTextColor={colors.placeholderText}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={colors.secondaryText}
              />
              <TextInput
                style={[styles.textInput, { color: colors.primaryText }]}
                placeholder="Password"
                placeholderTextColor={colors.placeholderText}
                secureTextEntry={!viewPassword}
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={handleViewPassword}
              >
                <Ionicons
                  name={viewPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.secondaryText}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error */}
          {!!error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={colors.whiteText} />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "center",
    minHeight: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.inputBackground,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  welcomeText: {
    color: colors.whiteText,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitleText: {
    color: colors.lightText,
    fontSize: 16,
  },
  formContainer: {
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.cardBackground,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 4,
  },
  formTitle: {
    color: colors.primaryText,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  textInput: {
    flex: 1,
    color: colors.primaryText,
    fontSize: 16,
    marginLeft: 12,
  },
  eyeButton: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  errorContainer: {
    marginBottom: 12,
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 14,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
  },
  loginButtonText: {
    color: colors.whiteText,
    fontSize: 16,
    fontWeight: "bold",
  },
});
