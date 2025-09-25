import { useQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";

export const useUniversities = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["universities"],
    queryFn: () => api.get("/university"),
  });
  return { data, isLoading, isError, error };
};
