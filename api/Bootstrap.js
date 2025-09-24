import React from "react";
import { useGetBranches } from "./BootstrapHooks/Branch";

export default function Bootstrap() {
  useGetBranches();

  return null;
}
