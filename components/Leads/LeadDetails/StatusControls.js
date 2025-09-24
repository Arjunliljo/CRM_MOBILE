import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Selector from "../../Common/Selector";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";
import { useSelector } from "react-redux";

export default function StatusControls({
  curStatus,
  curSubStatus,
  onHandleChange,
  isStudent = false,
}) {
  const { statuses } = useSelector((state) => state.bootstrap);
  const [subStatuses, setSubStatuses] = useState(
    statuses?.find((val) => val._id === curStatus)?.subStatuses
  );

  const [status, setStatus] = useState(curStatus);
  const [subStatus, setSubStatus] = useState(curSubStatus);

  useEffect(() => {
    setSubStatuses(statuses?.find((val) => val._id === curStatus)?.subStatuses);
  }, [statuses]);

  useEffect(() => {
    setStatus(curStatus);
    setSubStatus(curSubStatus);
  }, [curStatus, curSubStatus]);

  const handleStatusChange = async (value) => {
    const status = statuses?.find((val) => val._id === value);
    setStatus(status?._id);
    setSubStatuses(status?.subStatuses);
    setSubStatus(status?.subStatuses?.[0]?._id);

    //api call
    await onHandleChange(status, subStatus);
  };
  const handleSubStatusChange = () => {
    //api call
  };

  return (
    <View style={[styles.card, { zIndex: 9000 }]}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Status</Text>
      </View>
      <Selector
        label="Status"
        options={statuses?.filter((val) => val?.isApplication === isStudent)}
        selectedValue={status || null}
        onValueChange={handleStatusChange}
        placeholder="Select status"
        zIndex={10000}
        zIndexInverse={1000}
      />
      <Selector
        label="Substatus"
        options={subStatuses}
        selectedValue={subStatus}
        onValueChange={handleStatusChange}
        placeholder="Select substatus"
        zIndex={9000}
        zIndexInverse={1000}
      />
    </View>
  );
}
