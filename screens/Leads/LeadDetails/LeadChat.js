import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./leadDetailsStyle";
import { useHeaderHeight } from "@react-navigation/elements";

export default function LeadChat({ route }) {
  const { leadId, leadName } = route.params || {};
  const headerHeight = useHeaderHeight();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const text = chatInput.trim();
    if (!text) return;
    const msg = {
      id: Date.now().toString(),
      author: "You",
      text,
      side: "right",
    };
    setMessages((p) => [...p, msg]);
    setChatInput("");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={headerHeight}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        inverted
        style={{ flex: 1, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingVertical: 16 }}
        keyboardShouldPersistTaps="handled"
        maintainVisibleContentPosition={{ minIndexForVisible: 1 }}
        ListEmptyComponent={
          <Text style={styles.chatEmptyText}>No messages yet</Text>
        }
        renderItem={({ item: m }) => (
          <View
            style={[
              styles.chatBubble,
              m.side === "right"
                ? styles.chatBubbleRight
                : styles.chatBubbleLeft,
            ]}
          >
            <Text style={styles.chatAuthor}>{m.author}</Text>
            <Text
              style={[
                styles.chatText,
                m.side === "right" && { color: colors.whiteText },
              ]}
            >
              {m.text}
            </Text>
          </View>
        )}
      />

      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: colors.divider,
          backgroundColor: colors.background,
        }}
      >
        <View style={styles.chatInputRow}>
          <TextInput
            style={styles.chatInput}
            placeholder={`Message ${leadName || "lead"}`}
            value={chatInput}
            onChangeText={setChatInput}
            multiline
            blurOnSubmit={false}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={styles.chatSendButton}
            onPress={send}
            activeOpacity={0.8}
          >
            <Ionicons name="send" size={18} color={colors.whiteText} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
