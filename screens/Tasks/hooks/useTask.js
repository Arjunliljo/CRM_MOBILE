import { useQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";
import { useSelector } from "react-redux";

export const useTask = () => {
  const { completedFollowups, searchQuery } = useSelector(
    (state) => state.task
  );
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["task", completedFollowups, searchQuery],
    queryFn: () =>
      api.get(
        `dashboard/fetch-leads?key=${searchQuery}&completedFollowups=${completedFollowups}`
      ),
  });

  return { data, isLoading, error, refetch };
};
