import { useQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";
import { useSelector } from "react-redux";

export const useTask = () => {
  const { completedFollowups } = useSelector((state) => state.task);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["task", completedFollowups],
    queryFn: () =>
      api.get(
        `dashboard/fetch-leads?key=&completedFollowups=${completedFollowups}`
      ),
  });

  return { data, isLoading, error, refetch };
};
