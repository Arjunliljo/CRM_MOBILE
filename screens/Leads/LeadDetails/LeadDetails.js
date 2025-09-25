import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./leadDetailsStyle";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ActivityLog from "../../../components/Common/ActivityLog";
import LeadHeader from "../../../components/Leads/LeadDetails/LeadHeader";
import PrimaryActions from "../../../components/Leads/LeadDetails/PrimaryActions";
import StatusControls from "../../../components/Leads/LeadDetails/StatusControls";
import ContactInfoCard from "../../../components/Leads/LeadDetails/ContactInfoCard";
import LeadDetailsCard from "../../../components/Leads/LeadDetails/LeadDetailsCard";
import RemarkCard from "../../../components/Leads/LeadDetails/RemarkCard";
import CTACards from "../../../components/Leads/LeadDetails/CTACards";
import SelectedCourseSection from "../../../components/Leads/LeadDetails/SelectedCourseSection";
import {
  getBranchName,
  getCountryName,
} from "../../../helpers/bootstrapHelpers";
import {
  updateLead,
  updateLeadDetails,
} from "../../../api/Leads/leadBackEndHandler";
import { useToast } from "../../../contexts/ToastContext";
import { setCurSelectedCourse } from "../../../global/leadSlice";
import { useGetLead } from "../hooks/useGetLead";
import LoadingScreen from "../../../components/LoadingScreen";
import { formatDate } from "../../../helpers/dateFormater";

export default function LeadDetails({ route }) {
  // const { curLead: lead } = useSelector((state) => state.lead);
  const { selectedCourse } = useSelector((state) => state.lead);
  const branches = useSelector((state) => state.bootstrap.branches);
  const countries = useSelector((state) => state.bootstrap.countries);

  const leadId = route?.params?.leadId;
  const { data: leadData, isLoading, error, refetch } = useGetLead(leadId);

  const { showError, showSuccess } = useToast();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const lead = leadData?.data.data;
  let hasSelectedCourse = false;

  if (
    Array.isArray(lead?.university) &&
    Array.isArray(lead?.course) &&
    lead?.university?.length &&
    lead?.course?.length
  ) {
    hasSelectedCourse = true;
  }

  // NOTE: Do not return early before hooks; guards are moved below hooks

  const handleStatusChange = async (status, subStatus) => {
    try {
      // status and sub status api call
      const response = await updateLead(lead._id, { status, subStatus });
      showSuccess("Lead status updated successfully!");
      // refetch();
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

  const saveDetails = async (data) => {};
  const saveRemark = async (data) => {
    try {
      // api call
      const response = await updateLead(lead._id, data);
      showSuccess("Lead remark updated successfully!");
      refetch();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update lead remark";
      showError(errorMessage);
    }
  };

  useEffect(() => {
    handleCourseSelection(selectedCourse);
  }, [selectedCourse]);

  const handleCourseSelection = async (data) => {
    try {
      if (!data || !data.course || !data.university || !data.country) return;

      await updateLead(lead._id, data);
      showSuccess("Course selection saved to lead!");
      dispatch(setCurSelectedCourse(null));
      refetch();
      navigation.navigate("LeadDetails", { leadId: lead._id });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to save course selection";
      showError(errorMessage);
    }
  };

  if (isLoading) return <LoadingScreen />;

  if (!leadId || error) return null;

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

      <LeadDetailsCard
        data={{
          source: lead?.leadSource,
          country: getCountryName(lead?.countries?.[0], countries),
          followupDate: formatDate(lead?.followupDate),
          leadId: lead?._id,
          createdAt: formatDate(lead?.createdAt),
        }}
        onSave={saveDetails}
      />

      {hasSelectedCourse && (
        <SelectedCourseSection
          universityId={lead?.university?.[0]}
          courseId={lead?.course?.[0]}
          intakeMonth={lead?.intakeMonth}
          intakeYear={lead?.intakeYear}
          countries={countries}
        />
      )}

      <RemarkCard remarkText={lead?.remark} onSave={saveRemark} />

      <CTACards
        navigation={navigation}
        lead={lead}
        hasSelectedCourse={hasSelectedCourse}
      />
      {/* <ActivityLog title="Activity Log" activities={[]} /> */}
    </ScrollView>
  );
}
