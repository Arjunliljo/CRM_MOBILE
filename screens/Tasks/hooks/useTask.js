import { useQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";
import { useSelector } from "react-redux";

export const useTask = () => {
  const {
    completedFollowups,
    searchQuery,
    branch,
    status,
    subStatus,
    role,
    selectedUser,
  } = useSelector((state) => state.task);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "task",
      completedFollowups,
      searchQuery,
      branch,
      status,
      subStatus,
      role,
      selectedUser,
    ],
    queryFn: () => {
      const params = new URLSearchParams({
        key: searchQuery || "",
        completedFollowups: completedFollowups,
        branch: branch !== "All" ? branch : "",
        status: status !== "All" ? status : "",
        subStatus: subStatus !== "All" ? subStatus : "",
        role: role !== "All" ? role : "",
        user: selectedUser !== "All" ? selectedUser : "",
      });

      return api.get(`dashboard/fetch-leads?${params.toString()}`);
    },
  });

  return { data, isLoading, error, refetch };
};
