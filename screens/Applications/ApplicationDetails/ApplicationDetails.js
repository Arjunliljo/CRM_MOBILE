import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants/colors";
import { styles } from "./applicationDetailsStyle";
import Selector from "../../../components/Common/Selector";
import SegmentTabs from "../../../components/Common/SegmentTabs";
import ActivityLog from "../../../components/Common/ActivityLog";

const applicationStatuses = [
  { label: "Submitted", value: "submitted" },
  { label: "In Review", value: "in_review" },
  { label: "Accepted", value: "accepted" },
  { label: "Rejected", value: "rejected" },
];

const applicationSubStatuses = [
  { label: "Docs Pending", value: "docs_pending" },
  { label: "Docs Verified", value: "docs_verified" },
  { label: "Interview Scheduled", value: "interview_scheduled" },
];

export default function ApplicationDetails({ route }) {
  const initial = route?.params?.application || null;
  const [editable, setEditable] = useState(initial);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingRemark, setIsEditingRemark] = useState(false);
  const [remarkDraft, setRemarkDraft] = useState(
    initial?.remark || initial?.remarks || ""
  );
  const [isRemarkExpanded, setIsRemarkExpanded] = useState(false);

  if (!editable) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No application data available</Text>
      </View>
    );
  }

  const contactDraftInit = {
    phone: editable?.phone || "",
    email: editable?.email || "",
    district: editable?.district || "",
  };
  const [contactDraft, setContactDraft] = useState(contactDraftInit);

  const detailsDraftInit = {
    source: editable?.source || "",
    country: editable?.country || "",
    followupDate: editable?.followupDate || "",
  };
  const [detailsDraft, setDetailsDraft] = useState(detailsDraftInit);

  const hasImage = Boolean(editable?.img);

  const handleCall = () => {
    if (editable?.phone) Linking.openURL(`tel:${editable.phone}`);
  };
  const handleSms = () => {
    if (editable?.phone) Linking.openURL(`sms:${editable.phone}`);
  };
  const handleEmail = () => {
    if (editable?.email) Linking.openURL(`mailto:${editable.email}`);
  };

  const statusDotColor = (() => {
    const s = String(editable?.status || "").toLowerCase();
    if (s.includes("submitted")) return colors.info;
    if (s.includes("review")) return colors.warning;
    if (s.includes("accepted")) return colors.success;
    if (s.includes("reject")) return colors.error;
    return colors.secondary;
  })();

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

  const statusSelected = toOptionValue(applicationStatuses, editable?.status);
  const subStatusSelected = toOptionValue(
    applicationSubStatuses,
    editable?.substatus || editable?.subStatus
  );

  const handleStatusChange = (val) => {
    const opt = applicationStatuses.find((o) => o.value === val);
    const label = opt?.label || val;
    setEditable((prev) => ({ ...prev, status: label }));
  };
  const handleSubStatusChange = (val) => {
    const opt = applicationSubStatuses.find((o) => o.value === val);
    const label = opt?.label || val;
    setEditable((prev) => ({ ...prev, substatus: label }));
  };

  const [activeDocTab, setActiveDocTab] = useState("all");
  const docTabs = [
    { key: "all", label: "All" },
    { key: "academic", label: "Academic" },
    { key: "identity", label: "Identity" },
    { key: "financial", label: "Financial" },
  ];

  const saveRemark = () => {
    setEditable((prev) => ({ ...prev, remark: remarkDraft }));
    setIsEditingRemark(false);
  };
  const cancelRemark = () => {
    setRemarkDraft(editable?.remark || editable?.remarks || "");
    setIsEditingRemark(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <View style={styles.headerTop} />
        <View style={styles.headerContent}>
          {hasImage ? (
            <Image source={{ uri: editable.img }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarInitials}>
                {(editable?.name || "?").trim().charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.headerInfo}>
            <View style={styles.topRow}>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                {editable.name}
              </Text>
              {Boolean(editable?.status) && (
                <View style={styles.statusChip}>
                  <Ionicons name="ellipse" size={10} color={statusDotColor} />
                  <Text style={styles.statusText}>{editable.status}</Text>
                </View>
              )}
            </View>
            <View style={styles.metaRow}>
              {Boolean(editable?.branch) && (
                <View style={styles.metaChip}>
                  <Ionicons name="school" size={12} color={colors.primary} />
                  <Text style={styles.metaText}>{editable.branch}</Text>
                </View>
              )}
              {Boolean(editable?.country) && (
                <View style={styles.metaChip}>
                  <Ionicons name="flag" size={12} color={colors.primary} />
                  <Text style={styles.metaText}>{editable.country}</Text>
                </View>
              )}
            </View>
            <View style={styles.badgesRow}>
              {Boolean(editable?.followupDate) && (
                <View style={styles.badge}>
                  <Ionicons name="calendar" size={12} color={colors.primary} />
                  <Text style={styles.badgeText}>{editable.followupDate}</Text>
                </View>
              )}
              {Boolean(editable?.source) && (
                <View style={styles.badge}>
                  <Ionicons
                    name="chatbox-ellipses"
                    size={12}
                    color={colors.primary}
                  />
                  <Text style={styles.badgeText}>{editable.source}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

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

      <View style={[styles.card, { zIndex: 9000 }]}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Status</Text>
        </View>
        <Selector
          label="Status"
          options={applicationStatuses}
          selectedValue={statusSelected}
          onValueChange={handleStatusChange}
          placeholder="Select status"
          zIndex={10000}
          zIndexInverse={1000}
        />
        <Selector
          label="Substatus"
          options={applicationSubStatuses}
          selectedValue={subStatusSelected}
          onValueChange={handleSubStatusChange}
          placeholder="Select substatus"
          zIndex={9000}
          zIndexInverse={1000}
        />
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Applicant Contact</Text>
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
                onPress={() => {
                  setEditable((p) => ({ ...p, ...contactDraft }));
                  setIsEditingContact(false);
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="checkmark" size={14} color={colors.whiteText} />
                <Text style={styles.editChipTextPrimary}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editChip}
                onPress={() => {
                  setContactDraft(contactDraftInit);
                  setIsEditingContact(false);
                }}
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
                  {editable.phone || "Not provided"}
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
                  {editable.email || "Not provided"}
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
                  {editable.district || "Not provided"}
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

      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>Application Details</Text>
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
                onPress={() => {
                  setEditable((prev) => ({
                    ...prev,
                    source: detailsDraft.source,
                    country: detailsDraft.country,
                    followupDate: detailsDraft.followupDate,
                  }));
                  setIsEditingDetails(false);
                }}
                activeOpacity={0.7}
              >
                <Ionicons name="checkmark" size={14} color={colors.whiteText} />
                <Text style={styles.editChipTextPrimary}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.editChip}
                onPress={() => {
                  setDetailsDraft(detailsDraftInit);
                  setIsEditingDetails(false);
                }}
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
                  {editable.source || "Not provided"}
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
                  {editable.country || "Not provided"}
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
                  {editable.followupDate || "Not set"}
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
                value={detailsDraft.source}
                onChangeText={(t) =>
                  setDetailsDraft((p) => ({ ...p, source: t }))
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
              {editable?.remark || editable?.remarks ? (
                <Text style={styles.remarkText}>
                  {(() => {
                    const text = editable.remark || editable.remarks || "";
                    const isLong = text.length > 140;
                    if (!isRemarkExpanded && isLong)
                      return `${text.slice(0, 140).trim()}…`;
                    return text;
                  })()}
                </Text>
              ) : (
                <Text style={styles.remarkPlaceholder}>No remarks yet</Text>
              )}
            </View>
            {Boolean(editable?.remark || editable?.remarks) &&
              (editable?.remark || editable?.remarks || "").length > 140 && (
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

      <View>
        {/* Chat CTA */}
        <TouchableOpacity
          style={styles.ctaCard}
          onPress={() =>
            navigation.navigate("LeadChat", {
              leadId: editable?.id || editable?._id,
              leadName: editable?.name,
            })
          }
          activeOpacity={0.85}
        >
          <View style={styles.ctaIconWrap}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={20}
              color={colors.primary}
            />
          </View>
          <View style={styles.ctaTextWrap}>
            <Text style={styles.ctaTitle}>Chat</Text>
            <Text style={styles.ctaSubtitle}>
              Open application conversation
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>

        <SegmentTabs
          tabs={docTabs}
          activeKey={activeDocTab}
          onChange={setActiveDocTab}
        />
        <ActivityLog title="Activity Log" activities={[]} />
      </View>
    </ScrollView>
  );
}
