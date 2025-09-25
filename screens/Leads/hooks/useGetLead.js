import { useQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";

export const useGetLead = (leadId) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["lead", leadId],
    queryFn: () => api.get(`/lead/${leadId}`),
  });

  return { data, isLoading, error, refetch };
};
