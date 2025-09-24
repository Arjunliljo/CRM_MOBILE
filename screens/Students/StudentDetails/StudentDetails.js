import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./studentDetailsStyle";
import SegmentTabs from "../../../components/Common/SegmentTabs";
import ActivityLog from "../../../components/Common/ActivityLog";
import { useSelector } from "react-redux";
import {
  getBranchName,
  getStatusName,
  getCountryName,
  getSubStatusName,
} from "../../../helpers/bootstrapHelpers";
import HeaderSection from "./components/HeaderSection";
import ActionButtonsRow from "./components/ActionButtonsRow";
import StatusCard from "./components/StatusCard";
import ContactCard from "./components/ContactCard";
import DetailsCard from "./components/DetailsCard";
import RemarkCard from "./components/RemarkCard";
import ChatCTA from "./components/ChatCTA";
import DocumentsCTA from "./components/DocumentsCTA";
import UniversityCTA from "./components/UniversityCTA";

// Use same status/substatus model as Leads

export default function StudentDetails({ route }) {
  const { curStudent } = useSelector((state) => state.student);
  const { branches, statuses, substatuses, countries } = useSelector(
    (state) => state.bootstrap
  );

  const [editable, setEditable] = useState(curStudent);
  const navigation = useNavigation();

  useEffect(() => {
    setEditable(curStudent);
  }, [curStudent]);

  if (!editable) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No student data available</Text>
      </View>
    );
  }

  // Derived display helpers
  const handleCall = () => {
    if (editable?.phone) Linking.openURL(`tel:${editable.phone}`);
  };
  const handleSms = () => {
    if (editable?.phone) Linking.openURL(`sms:${editable.phone}`);
  };
  const handleEmail = () => {
    if (editable?.email) Linking.openURL(`mailto:${editable.email}`);
  };

  const statusName = getStatusName(editable?.status, statuses);
  const subStatusName = getSubStatusName(
    editable?.subStatus || editable?.substatus,
    substatuses
  );
  const branchName = getBranchName(editable?.branch, branches);
  const primaryCountryName = Array.isArray(editable?.countries)
    ? editable.countries[0]
      ? getCountryName(editable.countries[0], countries)
      : null
    : editable?.country
    ? getCountryName(editable.country, countries)
    : null;

  const countryNames =
    Array.isArray(editable?.countries) && editable.countries.length
      ? editable.countries
          .map((cid) => getCountryName(cid, countries))
          .filter(Boolean)
          .join(", ")
      : editable?.country
      ? getCountryName(editable.country, countries)
      : "Not provided";

  // Remark handled inside RemarkCard

  const handleStatusChange = async (status, subStatus) => {
    try {
      // status and sub status api call
    } catch (error) {}
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <HeaderSection
        data={{
          branch: getBranchName(curStudent.branch, branches),
          name: curStudent.name,
          country: getCountryName(curStudent?.countries?.[0], countries),
          followupDate: curStudent.followupDate,
          source: curStudent.leadSource,
        }}
      />

      <ActionButtonsRow
        onCall={handleCall}
        onSms={handleSms}
        onEmail={handleEmail}
      />

      <StatusControls
        onHandleChange={handleStatusChange}
        curStatus={curStudent.status}
        curSubStatus={curStudent.subStatus}
      />

      <ContactCard
        initial={{
          phone: editable?.phone,
          email: editable?.email,
          district: editable?.district,
        }}
        onSave={(draft) => setEditable((p) => ({ ...p, ...draft }))}
      />

      <DetailsCard
        displayCountries={countryNames}
        initialFollowup={editable?.followupDate}
        onSave={(draft) =>
          setEditable((prev) => ({
            ...prev,
            country: draft.country,
            followupDate: draft.followupDate,
          }))
        }
      />

      <RemarkCard
        initialRemark={editable?.remark || editable?.remarks}
        onSave={(text) => setEditable((prev) => ({ ...prev, remark: text }))}
      />

      <View>
        <ChatCTA
          navigation={navigation}
          leadId={editable?.id || editable?._id}
          leadName={editable?.name}
        />

        <DocumentsCTA navigation={navigation} />
        <SegmentTabs
          tabs={[{ key: "all", label: "All" }]}
          activeKey={"all"}
          onChange={() => {}}
        />
        <UniversityCTA navigation={navigation} />
        <ActivityLog title="Activity Log" activities={[]} />
      </View>
    </ScrollView>
  );
}
