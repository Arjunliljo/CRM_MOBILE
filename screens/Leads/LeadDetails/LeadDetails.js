import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./leadDetailsStyle";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ActivityLog from "../../../components/Common/ActivityLog";
import LeadHeader from "../../../components/Leads/LeadDetails/LeadHeader";
import PrimaryActions from "../../../components/Leads/LeadDetails/PrimaryActions";
import StatusControls from "../../../components/Leads/LeadDetails/StatusControls";
import ContactInfoCard from "../../../components/Leads/LeadDetails/ContactInfoCard";
import LeadDetailsCard from "../../../components/Leads/LeadDetails/LeadDetailsCard";
import RemarkCard from "../../../components/Leads/LeadDetails/RemarkCard";
import CTACards from "../../../components/Leads/LeadDetails/CTACards";

export default function LeadDetails({ route }) {
  const { curLead: lead } = useSelector((state) => state.lead);

  const statuses = useSelector((state) => state.bootstrap.statuses);
  const branches = useSelector((state) => state.bootstrap.branches);
  const countries = useSelector((state) => state.bootstrap.countries);
  const substatuses = useSelector((state) => state.bootstrap.substatuses);
  const navigation = useNavigation();

  const [editableLead, setEditableLead] = useState(lead);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingRemark, setIsEditingRemark] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [substatusList, setSubstatusList] = useState([]);

  useEffect(() => {
    setStatusList(
      statuses
        .map((s) => (!s.isApplication ? { label: s.name, value: s._id } : null))
        .filter(Boolean)
    );
  }, [statuses]);

  useEffect(() => {
    setSubstatusList(
      substatuses
        .map((s) =>
          s.status === editableLead.status
            ? { label: s.subStatus, value: s._id }
            : null
        )
        .filter(Boolean)
    );
  }, [editableLead.status]);

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

  // actions are handled inside PrimaryActions component

  if (!editableLead) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No lead data available</Text>
      </View>
    );
  }

  useEffect(() => {
    console.log(statusList, "statusList>>>>>");
  }, [statusList]);

  // header visuals are handled inside LeadHeader component

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

  // No inline chat here; chat is a separate screen now

  const handleStatusChange = (val) => {
    console.log(val, "Status Changed>>>>>");
    setEditableLead((prev) => ({ ...prev, status: val }));
  };

  const handleSubStatusChange = (val) => {
    //  setEditableLead((prev) => ({ ...prev, substatus: val }));
  };

  const remarkText = editableLead?.remark || editableLead?.remarks || "";

  useEffect(() => {
    setEditableLead(lead);
  }, [lead]);

  useEffect(() => {
    setContactDraft({
      phone: editableLead?.phone || "",
      email: editableLead?.email || "",
      district: editableLead?.district || "",
    });
  }, [editableLead]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <LeadHeader
        editableLead={editableLead}
        statuses={statuses}
        branches={branches}
        countries={countries}
      />

      <PrimaryActions editableLead={editableLead} />

      <StatusControls
        statusItems={statusList}
        substatusItems={substatusList}
        editableLead={editableLead}
        onStatusChange={handleStatusChange}
        onSubStatusChange={handleSubStatusChange}
      />

      <ContactInfoCard
        isEditing={isEditingContact}
        setIsEditing={setIsEditingContact}
        editableLead={editableLead}
        contactDraft={contactDraft}
        setContactDraft={setContactDraft}
        onSave={saveContact}
        onCancel={cancelContact}
      />

      <LeadDetailsCard
        isEditing={isEditingDetails}
        setIsEditing={setIsEditingDetails}
        editableLead={editableLead}
        detailsDraft={detailsDraft}
        setDetailsDraft={setDetailsDraft}
        onSave={saveDetails}
        onCancel={cancelDetails}
      />

      <RemarkCard
        isEditing={isEditingRemark}
        setIsEditing={setIsEditingRemark}
        remarkText={remarkText}
        remarkDraft={remarkDraft}
        setRemarkDraft={setRemarkDraft}
        isRemarkExpanded={isRemarkExpanded}
        setIsRemarkExpanded={setIsRemarkExpanded}
        onSave={saveRemark}
        onCancel={cancelRemark}
      />

      <CTACards navigation={navigation} editableLead={editableLead} />
      <ActivityLog title="Activity Log" activities={[]} />
    </ScrollView>
  );
}
