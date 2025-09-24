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
import {
  getBranchName,
  getCountryName,
} from "../../../helpers/bootstrapHelpers";

export default function LeadDetails({ route }) {
  const { curLead: lead } = useSelector((state) => state.lead);

  const statuses = useSelector((state) => state.bootstrap.statuses);
  const branches = useSelector((state) => state.bootstrap.branches);
  const countries = useSelector((state) => state.bootstrap.countries);
  const substatuses = useSelector((state) => state.bootstrap.substatuses);

  if (!lead) return null;

  const handleStatusChange = async (status, subStatus) => {
    try {
      // status and sub status api call
    } catch (error) {}
  };

  const handleContactChange = async (data) => {
    try {
      // api call
      console.log(data, "in response data>>>>>");
    } catch (error) {}
  };

  //name, status, branch, followup, source, country
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <LeadHeader
        data={{
          branch: getBranchName(lead.branch, branches),
          name: lead.name,
          country: getCountryName(lead?.countries?.[0], countries),
          followupDate: lead.followupDate,
          source: lead.leadSource,
        }}
      />

      <PrimaryActions data={{ phone: lead?.phone, email: lead?.email }} />
      {/* 
      <StatusControls
        onHandleChange={handleStatusChange}
        curStatus={lead.status}
        curSubStatus={lead.subStatus}
      /> */}

      <ContactInfoCard
        // isEditing={isEditingContact}
        // setIsEditing={setIsEditingContact}
        // editableLead={editableLead}
        // contactDraft={contactDraft}
        // setContactDraft={setContactDraft}
        // onSave={saveContact}
        // onCancel={cancelContact}
        data={{
          phone: lead?.phone,
          email: lead?.email,
          district: lead?.district,
        }}
        onHandleChange={handleContactChange}
      />

      {/* <LeadDetailsCard
        isEditing={isEditingDetails}
        setIsEditing={setIsEditingDetails}
        editableLead={editableLead}
        detailsDraft={detailsDraft}
        setDetailsDraft={setDetailsDraft}
        onSave={saveDetails}
        onCancel={cancelDetails}
      /> */}

      {/* <RemarkCard
        isEditing={isEditingRemark}
        setIsEditing={setIsEditingRemark}
        remarkText={remarkText}
        remarkDraft={remarkDraft}
        setRemarkDraft={setRemarkDraft}
        isRemarkExpanded={isRemarkExpanded}
        setIsRemarkExpanded={setIsRemarkExpanded}
        onSave={saveRemark}
        onCancel={cancelRemark}
      /> */}

      {/* <CTACards navigation={navigation} editableLead={editableLead} />
      <ActivityLog title="Activity Log" activities={[]} /> */}
    </ScrollView>
  );
}
