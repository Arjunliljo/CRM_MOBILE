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
import {
  updateLead,
  updateLeadDetails,
} from "../../../api/Leads/leadBackEndHandler";
import { useToast } from "../../../contexts/ToastContext";
import { useGetLead } from "../hooks/useGetLead";
import LoadingScreen from "../../../components/LoadingScreen";

export default function LeadDetails({ route }) {
  // const { curLead: lead } = useSelector((state) => state.lead);
  const leadId = route?.params?.leadId;
  const { data: leadData, isLoading, error, refetch } = useGetLead(leadId);
  const { showError, showSuccess } = useToast();

  const lead = leadData?.data.data;

  // console.log(lead?.data.data, "in lead data>>>>>");

  const statuses = useSelector((state) => state.bootstrap.statuses);
  const branches = useSelector((state) => state.bootstrap.branches);
  const countries = useSelector((state) => state.bootstrap.countries);
  const substatuses = useSelector((state) => state.bootstrap.substatuses);

  if (isLoading) return <LoadingScreen />;

  if (!leadId || error) return null;

  const handleStatusChange = async (status, subStatus) => {
    try {
      // status and sub status api call
      const response = await updateLead(lead._id, { status, subStatus });
      // console.log(response, "in response data>>>>>");
      showSuccess("Lead status updated successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update lead status";
      showError(errorMessage);
    }
  };

  const handleContactChange = async (data) => {
    try {
      // api call
      const response = await updateLeadDetails(lead._id, data);
      showSuccess("Lead contact updated successfully!");
      refetch();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update lead contact";
      showError(errorMessage);
    }
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

      <StatusControls
        onHandleChange={handleStatusChange}
        curStatus={lead.status}
        curSubStatus={lead.subStatus}
      />

      <ContactInfoCard
        data={{
          phone: lead?.phone,
          email: lead?.email,
          district: lead?.district,
          leadId: lead?._id,
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
