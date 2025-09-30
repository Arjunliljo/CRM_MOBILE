import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./studentDetailsStyle";

import ActivityLog from "../../../components/Common/ActivityLog";
import { useSelector } from "react-redux";
import {
  getBranchName,
  getStatusName,
  getCountryName,
  getSubStatusName,
} from "../../../helpers/bootstrapHelpers";

import RemarkCard from "./components/RemarkCard";

import LeadHeader from "../../../components/Leads/LeadDetails/LeadHeader";
import PrimaryActions from "../../../components/Leads/LeadDetails/PrimaryActions";
import StatusControls from "../../../components/Leads/LeadDetails/StatusControls";
import ContactInfoCard from "../../../components/Leads/LeadDetails/ContactInfoCard";
import LeadDetailsCard from "../../../components/Leads/LeadDetails/LeadDetailsCard";
import { useGetStudent } from "../hooks/useGetStudent";
import { formatDate } from "../../../helpers/dateFormater";
import CTACards from "../../../components/Leads/LeadDetails/CTACards";
import SelectedCourseSection from "../../../components/Leads/LeadDetails/SelectedCourseSection";

// Use same status/substatus model as Leads

export default function StudentDetails({ route }) {
  const { curStudent } = useSelector((state) => state.student);
  const { branches, statuses, substatuses, countries } = useSelector(
    (state) => state.bootstrap
  );
  const {
    data: studentData,
    isLoading,
    error,
    refetch,
  } = useGetStudent(curStudent?._id);

  const navigation = useNavigation();

  // Remark handled inside RemarkCard

  const handleStatusChange = async (status, subStatus) => {
    try {
      // status and sub status api call
    } catch (error) {}
  };

  const handleContactChange = async (data) => {
    try {
      // api call
      const response = await updateLeadDetails(studentData?._id, data);
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
  const saveRemark = async (data) => {
    try {
      // api call
      const response = await updateLead(studentData?._id, data);
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
  let hasSelectedCourse = false;
  if (
    Array.isArray(studentData?.university) &&
    Array.isArray(studentData?.course) &&
    studentData?.university?.length &&
    studentData?.course?.length
  ) {
    hasSelectedCourse = true;
  }

  if (!studentData) return null;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <LeadHeader
        data={{
          branch: getBranchName(studentData.branch, branches),
          name: studentData.name,
          country: getCountryName(studentData?.countries?.[0], countries),
          followupDate: studentData.followupDate,
          source: studentData.leadSource,
        }}
      />

      <PrimaryActions
        data={{ phone: studentData?.phone, email: studentData?.email }}
      />

      <StatusControls
        onHandleChange={handleStatusChange}
        curStatus={studentData.status}
        curSubStatus={studentData.subStatus}
      />

      <ContactInfoCard
        data={{
          phone: studentData?.phone,
          email: studentData?.email,
          district: studentData?.district,
          leadId: studentData?._id,
        }}
        onHandleChange={handleContactChange}
      />

      <LeadDetailsCard
        data={{
          source: studentData?.leadSource,
          countryId: studentData?.countries?.[0],
          countryName: getCountryName(studentData?.countries?.[0], countries),
          followupDate: studentData?.followupDate,
          leadId: studentData?._id,
          createdAt: formatDate(studentData?.createdAt),
          countries: countries,
        }}
        refetch={refetch}
        title="Student Details"
      />

      <RemarkCard remarkText={studentData?.remark} onSave={saveRemark} />

      {hasSelectedCourse && (
        <SelectedCourseSection
          universityId={studentData?.university?.[0]}
          courseId={studentData?.course?.[0]}
          intakeMonth={studentData?.intakeMonth}
          intakeYear={studentData?.intakeYear}
          countries={countries}
        />
      )}

      <CTACards
        navigation={navigation}
        lead={studentData}
        hasSelectedCourse={hasSelectedCourse}
      />

      <ActivityLog title="Activity Log" activities={[]} />
    </ScrollView>
  );
}
