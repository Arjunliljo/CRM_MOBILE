import React from "react";
import { View, Text } from "react-native";
import Selector from "../../Common/Selector";
import { styles } from "../../../screens/Leads/LeadDetails/leadDetailsStyle";

export default function StatusControls({
  statusItems,
  substatusItems,
  editableLead,
  onStatusChange,
  onSubStatusChange,
}) {
  return (
    <View style={[styles.card, { zIndex: 9000 }]}>
      <View style={styles.cardHeaderRow}>
        <Text style={styles.cardTitle}>Status</Text>
      </View>
      <Selector
        label="Status"
        options={statusItems}
        selectedValue={editableLead?.status || null}
        onValueChange={onStatusChange}
        placeholder="Select status"
        zIndex={10000}
        zIndexInverse={1000}
      />
      <Selector
        label="Substatus"
        options={substatusItems}
        selectedValue={
          editableLead?.substatus || editableLead?.subStatus || null
        }
        onValueChange={onSubStatusChange}
        placeholder="Select substatus"
        zIndex={9000}
        zIndexInverse={1000}
      />
    </View>
  );
}
