import React, { useEffect, useState, useRef } from "react";
import { View } from "react-native";
import Selector from "../../Common/Selector";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";
import { useSelector } from "react-redux";
import { updateLead } from "../../../api/Leads/leadBackEndHandler";
import { useToast } from "../../../contexts/ToastContext";

export default function StatusControls({
  curStatus,
  curSubStatus,
  leadId,
  isStudent = false,
  refetch,
}) {
  const { showSuccess, showError } = useToast();
  const { statuses } = useSelector((state) => state.bootstrap);

  const [status, setStatus] = useState(curStatus);
  const [subStatus, setSubStatus] = useState(curSubStatus);
  const [subStatuses, setSubStatuses] = useState(
    statuses?.find((val) => val._id === curStatus)?.subStatuses
  );

  const isUpdatingRef = useRef(false);

  // Update substatuses when status changes
  useEffect(() => {
    if (statuses && curStatus) {
      const newSubStatuses = statuses?.find(
        (val) => val._id === curStatus
      )?.subStatuses;
      setSubStatuses(newSubStatuses);
    }
  }, [statuses, curStatus]);

  // Sync local state with props (but not during API updates)
  useEffect(() => {
    if (!isUpdatingRef.current) {
      setStatus(curStatus);
      setSubStatus(curSubStatus);
    }
  }, [curStatus, curSubStatus]);

  const updateStatus = async (newStatus, newSubStatus) => {
    const response = await updateLead(leadId, {
      status: newStatus,
      subStatus: newSubStatus,
    });
    showSuccess("Lead status updated successfully!");
    refetch?.();
  };

  const handleError = (error, fallbackMessage) => {
    const errorMessage =
      error.response?.data?.message || error.message || fallbackMessage;
    showError(errorMessage);
  };

  const handleStatusChange = async (value) => {
    if (isUpdatingRef.current || value === status) return;

    const statusObj = statuses?.find((val) => val._id === value);
    if (!statusObj || statusObj._id === status) return;

    const newSubStatus = statusObj.subStatuses?.[0]?._id;
    isUpdatingRef.current = true;

    // Store original values for rollback
    const originalValues = { status, subStatus, subStatuses };

    // Optimistic update
    setStatus(statusObj._id);
    setSubStatuses(statusObj.subStatuses);
    setSubStatus(newSubStatus);

    try {
      await updateStatus(statusObj._id, newSubStatus);
    } catch (error) {
      // Rollback on failure
      setStatus(originalValues.status);
      setSubStatus(originalValues.subStatus);
      setSubStatuses(originalValues.subStatuses);
      handleError(error, "Failed to update lead status");
    } finally {
      isUpdatingRef.current = false;
    }
  };

  const handleSubStatusChange = async (value) => {
    if (isUpdatingRef.current || value === subStatus) return;

    isUpdatingRef.current = true;
    const originalSubStatus = subStatus;

    // Optimistic update
    setSubStatus(value);

    try {
      await updateStatus(status, value);
    } catch (error) {
      // Rollback on failure
      setSubStatus(originalSubStatus);
      handleError(error, "Failed to update lead substatus");
    } finally {
      isUpdatingRef.current = false;
    }
  };

  const statusOptions =
    statuses
      ?.filter((val) => val?.isApplication === isStudent)
      ?.map((val) => ({
        value: val._id,
        label: val.status || val.name,
      })) || [];

  const subStatusOptions =
    subStatuses?.map((val) => ({
      value: val._id,
      label: val.subStatus || val.name,
    })) || [];

  return (
    <View style={[styles.card, { zIndex: 9000 }]}>
      <Selector
        label="Status"
        options={statusOptions}
        selectedValue={status || null}
        onValueChange={handleStatusChange}
        placeholder="Select status"
        zIndex={10000}
        zIndexInverse={1000}
      />
      <Selector
        label="Substatus"
        options={subStatusOptions}
        selectedValue={subStatus}
        onValueChange={handleSubStatusChange}
        placeholder="Select substatus"
        zIndex={9000}
        zIndexInverse={1000}
      />
    </View>
  );
}
