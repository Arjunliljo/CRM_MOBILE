import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./leadDetailsStyle";
import { useSelector } from "react-redux";
import Selector from "../../../components/Common/Selector";
import { leadStatuses, leadSubStatuses } from "../../../constants/dropdownData";
import { useNavigation } from "@react-navigation/native";
import SegmentTabs from "../../../components/Common/SegmentTabs";
import ActivityLog from "../../../components/Common/ActivityLog";

export default function LeadDetails({ route }) {
  const { curLead: lead } = useSelector((state) => state.lead);
  const navigation = useNavigation();

  const [editableLead, setEditableLead] = useState(lead);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingRemark, setIsEditingRemark] = useState(false);

  const [contactDraft, setContactDraft] = useState({
    phone: lead?.phone || "",
    email: lead?.email || "",
    district: lead?.district || "",
  });

  const [detailsDraft, setDetailsDraft] = useState({
    leadSource: lead?.leadSource || lead?.source || "",
    country: lead?.country || "",
    followupDate: lead?.followupDate || "",
  });

  const [remarkDraft, setRemarkDraft] = useState(
    lead?.remark || lead?.remarks || ""
  );
  const [isRemarkExpanded, setIsRemarkExpanded] = useState(false);

  const hasImage = Boolean(editableLead?.img);

  const handleCall = () => {
    if (editableLead?.phone) Linking.openURL(`tel:${editableLead.phone}`);
  };

  const handleSms = () => {
    if (editableLead?.phone) Linking.openURL(`sms:${editableLead.phone}`);
  };

  const handleEmail = () => {
    if (editableLead?.email) Linking.openURL(`mailto:${editableLead.email}`);
  };

  if (!editableLead) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No lead data available</Text>
      </View>
    );
  }

  const universityText = editableLead?.university || editableLead?.branch || "";
  const countryText = editableLead?.country || "";
  const courseText = editableLead?.course || editableLead?.courseName || "";
  const metaLine = [universityText, countryText, courseText]
    .filter(Boolean)
    .join(" • ");

  const getStatusDotColor = (status) => {
    if (!status) return colors.primary;
    const s = String(status).toLowerCase();
    if (s.includes("new") || s.includes("open")) return colors.info;
    if (s.includes("follow") || s.includes("pending")) return colors.warning;
    if (s.includes("rejected") || s.includes("lost")) return colors.error;
    if (s.includes("converted") || s.includes("won") || s.includes("success"))
      return colors.success;
    return colors.secondary;
  };
  const statusDotColor = getStatusDotColor(editableLead?.status);

  const saveContact = () => {
    setEditableLead((prev) => ({ ...prev, ...contactDraft }));
    setIsEditingContact(false);
  };

  const cancelContact = () => {
    setContactDraft({
      phone: editableLead?.phone || "",
      email: editableLead?.email || "",
      district: editableLead?.district || "",
    });
    setIsEditingContact(false);
  };

  const saveDetails = () => {
    setEditableLead((prev) => ({
      ...prev,
      leadSource: detailsDraft.leadSource,
      country: detailsDraft.country,
      followupDate: detailsDraft.followupDate,
    }));
    setIsEditingDetails(false);
  };

  const cancelDetails = () => {
    setDetailsDraft({
      leadSource: editableLead?.leadSource || editableLead?.source || "",
      country: editableLead?.country || "",
      followupDate: editableLead?.followupDate || "",
    });
    setIsEditingDetails(false);
  };

  const saveRemark = () => {
    setEditableLead((prev) => ({ ...prev, remark: remarkDraft }));
    setIsEditingRemark(false);
  };

  const cancelRemark = () => {
    setRemarkDraft(editableLead?.remark || editableLead?.remarks || "");
    setIsEditingRemark(false);
  };

  const toOptionValue = (options, valueOrLabel) => {
    if (!valueOrLabel) return null;
    const lower = String(valueOrLabel).toLowerCase();
    const byValue = options.find(
      (o) => String(o.value).toLowerCase() === lower
    );
    if (byValue) return byValue.value;
    const byLabel = options.find(
      (o) => String(o.label).toLowerCase() === lower
    );
    return byLabel ? byLabel.value : null;
  };

  const statusSelected = toOptionValue(leadStatuses, editableLead?.status);
  const subStatusSelected = toOptionValue(
    leadSubStatuses,
    editableLead?.substatus || editableLead?.subStatus
  );

  const handleStatusChange = (val) => {
    const opt = leadStatuses.find((o) => o.value === val);
    const label = opt?.label || val;
    setEditableLead((prev) => ({ ...prev, status: label }));
  };

  const handleSubStatusChange = (val) => {
    const opt = leadSubStatuses.find((o) => o.value === val);
    const label = opt?.label || val;
    setEditableLead((prev) => ({ ...prev, substatus: label }));
  };

  const [activeDocTab, setActiveDocTab] = useState("all");
  const docTabs = [
    { key: "all", label: "All" },
    { key: "academic", label: "Academic" },
    { key: "identity", label: "Identity" },
    { key: "financial", label: "Financial" },
  ];

  const remarkText = editableLead?.remark || editableLead?.remarks || "";
  const isLongRemark = (remarkText || "").length > 140;
  const displayRemark =
    !isRemarkExpanded && isLongRemark
      ? `${remarkText.slice(0, 140).trim()}…`
      : remarkText;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Hero Header */}
      <View style={styles.header}>
        <View style={styles.headerTop} />
        <View style={styles.headerContent}>
          {hasImage ? (
            <Image source={{ uri: editableLead.img }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>
                {(editableLead?.name || "?").trim().charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.headerInfo}>
            <View style={styles.topRow}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {editableLead.name}
              </Text>
              {Boolean(editableLead?.status) && (
                <View style={styles.statusChip}>
                  <Ionicons name="ellipse" size={10} color={statusDotColor} />
                  <Text style={styles.statusText}>{editableLead.status}</Text>
                </View>
              )}
            </View>
            <View style={styles.metaRow}>
              {Boolean(universityText) && (
                <View style={styles.metaChip}>
                  <Ionicons name="school" size={12} color={colors.primary} />
                  <Text style={styles.metaText}>{universityText}</Text>
                </View>
              )}
              {Boolean(countryText) && (
                <View style={styles.metaChip}>
                  <Ionicons name="flag" size={12} color={colors.primary} />
                  <Text style={styles.metaText}>{countryText}</Text>
                </View>
              )}
              {Boolean(courseText) && (
                <View style={styles.metaChip}>
                  <Ionicons name="book" size={12} color={colors.primary} />
                  <Text style={styles.metaText}>{courseText}</Text>
                </View>
              )}
              {!universityText && !countryText && !courseText && (
                <View style={styles.metaChip}>
                  <Ionicons
                    name="information-circle"
                    size={12}
                    color={colors.primary}
                  />
                  <Text style={styles.metaText}>Not provided</Text>
                </View>
              )}
            </View>
            <View style={styles.badgesRow}>
              {Boolean(editableLead?.followupDate) && (
                <View style={styles.badge}>
                  <Ionicons name="calendar" size={12} color={colors.primary} />
                  <Text style={styles.badgeText}>
                    {editableLead.followupDate}
                  </Text>
                </View>
              )}
              {Boolean(editableLead?.leadSource || editableLead?.source) && (
                <View style={styles.badge}>
                  <Ionicons
                    name="chatbox-ellipses"
                    size={12}
                    color={colors.primary}
                  />
                  <Text style={styles.badgeText}>
                    {editableLead.leadSource || editableLead.source}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Primary Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.actionPrimary]}
          onPress={handleCall}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={20} color={colors.whiteText} />
          <Text style={styles.actionLabelPrimary}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSms}
          activeOpacity={0.8}
        >
          <Ionicons name="chatbubble" size={20} color={colors.primary} />
          <Text style={styles.actionLabel}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleEmail}
          activeOpacity={0.8}
        >
          <Ionicons name="mail" size={20} color={colors.primary} />
          <Text style={styles.actionLabel}>Email</Text>
        </TouchableOpacity>
      </View>

      {/* Status Controls */}
      <View style={[styles.card, { zIndex: 9000 }]}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Status</Text>
        </View>
        <Selector
          label="Status"
          options={leadStatuses}
          selectedValue={statusSelected}
          onValueChange={handleStatusChange}
          placeholder="Select status"
          zIndex={10000}
          zIndexInverse={1000}
        />
        <Selector
          label="Substatus"
          options={leadSubStatuses}
          selectedValue={subStatusSelected}
          onValueChange={handleSubStatusChange}
          placeholder="Select substatus"
          zIndex={9000}
          zIndexInverse={1000}
        />
      </View>

      {/* Contact Information */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          {!isEditingContact ? (
            <TouchableOpacity
              style={styles.editChip}
              onPress={() => setIsEditingContact(true)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="create-outline"
                size={14}
                color={colors.primary}
              />
              <Text style={styles.editChipText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActionsRow}>
              <TouchableOpacity
                style={[styles.editChip, styles.editChipPrimary]}
                onPress={saveContact}
                activeOpacity={0.7}
              >
                <Ionicons name="checkmark" size={14} color={colors.whiteText} />
                <Text style={styles.editChipTextPrimary}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editChip}
                onPress={cancelContact}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={14} color={colors.primary} />
                <Text style={styles.editChipText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!isEditingContact ? (
          <>
            <View style={styles.itemRow}>
              <View
                style={[styles.iconBadge, { backgroundColor: colors.success }]}
              >
                <Ionicons name="call" size={18} color={colors.whiteText} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>Phone</Text>
                <Text style={styles.itemValue}>
                  {editableLead.phone || "Not provided"}
                </Text>
              </View>
            </View>

            <View style={styles.itemRow}>
              <View
                style={[styles.iconBadge, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="mail" size={18} color={colors.whiteText} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>Email</Text>
                <Text style={styles.itemValue}>
                  {editableLead.email || "Not provided"}
                </Text>
              </View>
            </View>

            <View style={styles.itemRow}>
              <View
                style={[styles.iconBadge, { backgroundColor: colors.warning }]}
              >
                <Ionicons name="location" size={18} color={colors.whiteText} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>District</Text>
                <Text style={styles.itemValue}>
                  {editableLead.district || "Not provided"}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Phone</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={contactDraft.phone}
                onChangeText={(t) =>
                  setContactDraft((p) => ({ ...p, phone: t }))
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                value={contactDraft.email}
                onChangeText={(t) =>
                  setContactDraft((p) => ({ ...p, email: t }))
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>District</Text>
              <TextInput
                style={styles.input}
                value={contactDraft.district}
                onChangeText={(t) =>
                  setContactDraft((p) => ({ ...p, district: t }))
                }
              />
            </View>
          </View>
        )}
      </View>

      {/* Lead Details */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Lead Details</Text>
          {!isEditingDetails ? (
            <TouchableOpacity
              style={styles.editChip}
              onPress={() => setIsEditingDetails(true)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="create-outline"
                size={14}
                color={colors.primary}
              />
              <Text style={styles.editChipText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActionsRow}>
              <TouchableOpacity
                style={[styles.editChip, styles.editChipPrimary]}
                onPress={saveDetails}
                activeOpacity={0.7}
              >
                <Ionicons name="checkmark" size={14} color={colors.whiteText} />
                <Text style={styles.editChipTextPrimary}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editChip}
                onPress={cancelDetails}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={14} color={colors.primary} />
                <Text style={styles.editChipText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!isEditingDetails ? (
          <>
            <View style={styles.itemRow}>
              <View
                style={[styles.iconBadge, { backgroundColor: colors.info }]}
              >
                <Ionicons
                  name="chatbox-ellipses"
                  size={18}
                  color={colors.whiteText}
                />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>Source</Text>
                <Text style={styles.itemValue}>
                  {editableLead.leadSource || "Not provided"}
                </Text>
              </View>
            </View>

            <View style={styles.itemRow}>
              <View
                style={[
                  styles.iconBadge,
                  { backgroundColor: colors.secondary },
                ]}
              >
                <Ionicons name="flag" size={18} color={colors.whiteText} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>Country</Text>
                <Text style={styles.itemValue}>
                  {editableLead.country || "Not provided"}
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
                  {editableLead.followupDate || "Not set"}
                </Text>
              </View>
            </View>

            <View style={styles.itemRow}>
              <View
                style={[
                  styles.iconBadge,
                  { backgroundColor: colors.lightText },
                ]}
              >
                <Ionicons name="time" size={18} color={colors.whiteText} />
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemLabel}>Created</Text>
                <Text style={styles.itemValue}>
                  {editableLead.createdAt || "-"}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Source</Text>
              <TextInput
                style={styles.input}
                value={detailsDraft.leadSource}
                onChangeText={(t) =>
                  setDetailsDraft((p) => ({ ...p, leadSource: t }))
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Country</Text>
              <TextInput
                style={styles.input}
                value={detailsDraft.country}
                onChangeText={(t) =>
                  setDetailsDraft((p) => ({ ...p, country: t }))
                }
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Follow-up</Text>
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={detailsDraft.followupDate}
                onChangeText={(t) =>
                  setDetailsDraft((p) => ({ ...p, followupDate: t }))
                }
              />
            </View>
          </View>
        )}
      </View>

      {/* Remark */}
      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Remark</Text>
          {!isEditingRemark ? (
            <TouchableOpacity
              style={styles.editChip}
              onPress={() => setIsEditingRemark(true)}
              activeOpacity={0.7}
            >
              <Ionicons
                name="create-outline"
                size={14}
                color={colors.primary}
              />
              <Text style={styles.editChipText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActionsRow}>
              <TouchableOpacity
                style={[styles.editChip, styles.editChipPrimary]}
                onPress={saveRemark}
                activeOpacity={0.7}
              >
                <Ionicons name="checkmark" size={14} color={colors.whiteText} />
                <Text style={styles.editChipTextPrimary}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editChip}
                onPress={cancelRemark}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={14} color={colors.primary} />
                <Text style={styles.editChipText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {!isEditingRemark ? (
          <View>
            <View style={styles.remarkBox}>
              {remarkText ? (
                <Text style={styles.remarkText}>{displayRemark}</Text>
              ) : (
                <Text style={styles.remarkPlaceholder}>No remarks yet</Text>
              )}
            </View>
            {remarkText && isLongRemark && (
              <TouchableOpacity
                onPress={() => setIsRemarkExpanded((p) => !p)}
                style={styles.remarkToggle}
                activeOpacity={0.7}
              >
                <Text style={styles.remarkToggleText}>
                  {isRemarkExpanded ? "Show less" : "Show more"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View>
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Remark</Text>
              <TextInput
                style={styles.textArea}
                multiline
                value={remarkDraft}
                onChangeText={(t) => setRemarkDraft(t)}
              />
            </View>
          </View>
        )}
      </View>

      {/* Add Document CTA (under Lead Details card) */}
      <View>
        <TouchableOpacity
          style={styles.ctaCard}
          onPress={() => navigation.navigate("Main", { screen: "Documents" })}
          activeOpacity={0.85}
        >
          <View style={styles.ctaIconWrap}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={colors.primary}
            />
          </View>
          <View style={styles.ctaTextWrap}>
            <Text style={styles.ctaTitle}>Add Documents</Text>
            <Text style={styles.ctaSubtitle}>
              Upload certificates and other files
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
        <SegmentTabs
          tabs={docTabs}
          activeKey={activeDocTab}
          onChange={setActiveDocTab}
        />
        <TouchableOpacity
          style={[styles.ctaCard, { marginTop: 8 }]}
          onPress={() => navigation.navigate("Main", { screen: "University" })}
          activeOpacity={0.85}
        >
          <View style={styles.ctaIconWrap}>
            <Ionicons name="school-outline" size={20} color={colors.primary} />
          </View>
          <View style={styles.ctaTextWrap}>
            <Text style={styles.ctaTitle}>University & Courses</Text>
            <Text style={styles.ctaSubtitle}>Open university selection</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
        <ActivityLog title="Activity Log" activities={[]} />
      </View>
    </ScrollView>
  );
}
