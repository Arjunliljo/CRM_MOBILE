import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";
import { formatDate } from "../../../helpers/dateFormater";
import Selector from "../../Common/Selector";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function LeadDetailsCard({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [values, setValues] = useState({
    source: data.source,
    country: data.countryId,
    followupDate: data.followupDate,
  });

  const parseToDate = (dateLike) => {
    if (!dateLike) return new Date();
    const d = new Date(dateLike);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const formatYMD = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = `${dateObj.getMonth() + 1}`.padStart(2, "0");
    const d = `${dateObj.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Lead Details</Text>
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editChip}
            onPress={() => setIsEditing(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="create-outline" size={14} color={colors.primary} />
            <Text style={styles.editChipText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.editActionsRow}>
            <TouchableOpacity
              style={[styles.editChip, styles.editChipPrimary]}
              onPress={() => onSave(values)}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark" size={14} color={colors.whiteText} />
              <Text style={styles.editChipTextPrimary}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editChip}
              onPress={() => setIsEditing(false)}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={14} color={colors.primary} />
              <Text style={styles.editChipText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!isEditing ? (
        <>
          <View style={styles.itemRow}>
            <View style={[styles.iconBadge, { backgroundColor: colors.info }]}>
              <Ionicons
                name="chatbox-ellipses"
                size={18}
                color={colors.whiteText}
              />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Source</Text>
              <Text style={styles.itemValue}>
                {data.source || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View
              style={[styles.iconBadge, { backgroundColor: colors.secondary }]}
            >
              <Ionicons name="flag" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Country</Text>
              <Text style={styles.itemValue}>
                {data.countryName || "Not provided"}
              </Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View
              style={[styles.iconBadge, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="calendar" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Follow-up</Text>
              <Text style={styles.itemValue}>
                {data.followupDate || "Not set"}
              </Text>
            </View>
          </View>

          <View style={styles.itemRow}>
            <View
              style={[styles.iconBadge, { backgroundColor: colors.lightText }]}
            >
              <Ionicons name="time" size={18} color={colors.whiteText} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemLabel}>Created</Text>
              <Text style={styles.itemValue}>{data.createdAt || "-"}</Text>
            </View>
          </View>
        </>
      ) : (
        <View>
          <View
            style={[
              styles.formGroup,
              {
                position: "relative",
                zIndex: isCountryOpen ? 8000 : 1,
                marginBottom: isCountryOpen ? 260 : 12,
              },
            ]}
          >
            <Text style={styles.formLabel}>Country</Text>
            <Selector
              options={data?.countries?.map((country) => ({
                label: country.name,
                value: country._id,
              }))}
              selectedValue={values.country}
              zIndex={7000}
              zIndexInverse={7000}
              open={isCountryOpen}
              onOpen={setIsCountryOpen}
              onValueChange={(t) => setValues((p) => ({ ...p, country: t }))}
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.formLabel}>Follow-up</Text>
            <TouchableOpacity
              style={styles.input}
              activeOpacity={0.7}
              onPress={() => setIsDatePickerOpen(true)}
            >
              <Text style={{ color: colors.primaryText }}>
                {values.followupDate || "YYYY-MM-DD"}
              </Text>
            </TouchableOpacity>

            {isDatePickerOpen && (
              <DateTimePicker
                value={parseToDate(values.followupDate)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  if (Platform.OS !== "ios") {
                    setIsDatePickerOpen(false);
                  }
                  if (event.type === "dismissed") return;
                  const next = selectedDate || parseToDate(values.followupDate);
                  const formatted = formatYMD(next);
                  setValues((p) => ({ ...p, followupDate: formatted }));
                }}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
}
