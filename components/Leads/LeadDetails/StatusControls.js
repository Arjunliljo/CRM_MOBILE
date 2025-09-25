import React, { useEffect, useState, useRef } from "react";
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
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    setSubStatuses(statuses?.find((val) => val._id === curStatus)?.subStatuses);
  }, [statuses, curStatus]);

  useEffect(() => {
    if (curStatus !== status || curSubStatus !== subStatus) {
      setStatus(curStatus);
      setSubStatus(curSubStatus);
      setSubStatuses(
        statuses?.find((val) => val._id === curStatus)?.subStatuses
      );
    }
  }, [curStatus, curSubStatus, status, subStatus]);

  const handleStatusChange = async (value) => {
    if (isUpdatingRef.current || value === status) return;

    const statusObj = statuses?.find((val) => val._id === value);
    const newSubStatus = statusObj?.subStatuses?.[0]?._id;

    // Don't proceed if the status is the same as current
    if (statusObj?._id === status) return;

    isUpdatingRef.current = true;

    setStatus(statusObj?._id);
    setSubStatuses(statusObj?.subStatuses);
    setSubStatus(newSubStatus);

    try {
      //api call with the new substatus
      await onHandleChange(statusObj?._id, newSubStatus);
    } finally {
      isUpdatingRef.current = false;
    }
  };

  const handleSubStatusChange = async (value) => {
    if (isUpdatingRef.current) return;

    // Don't proceed if the substatus is the same as current
    if (value === subStatus) return;

    isUpdatingRef.current = true;
    setSubStatus(value);

    try {
      //api call
      await onHandleChange(status, value);
    } finally {
      isUpdatingRef.current = false;
    }
  };

  return (
    <View style={[styles.card, { zIndex: 9000 }]}>
      <Selector
        label="Status"
        options={statuses
          ?.filter((val) => val?.isApplication === isStudent)
          ?.map((val) => ({
            value: val._id,
            label: val.status || val.name,
          }))}
        selectedValue={status || null}
        onValueChange={handleStatusChange}
        placeholder="Select status"
        zIndex={10000}
        zIndexInverse={1000}
      />
      <Selector
        label="Substatus"
        options={subStatuses?.map((val) => ({
          value: val._id,
          label: val.subStatus || val.name,
        }))}
        selectedValue={subStatus}
        onValueChange={handleSubStatusChange}
        placeholder="Select substatus"
        zIndex={9000}
        zIndexInverse={1000}
      />
    </View>
  );
}
