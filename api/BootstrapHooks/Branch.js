import { useQuery } from "@tanstack/react-query";
import api from "../../conf/conf";

export const useGetBranches = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["branches"],
    queryFn: () => api.get("/branch"),
  });
  console.log(data?.data, "Data>>");
  return { data, isLoading, error };
};
