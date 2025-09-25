import { useQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";

export const useSelectedUniversity = (universityId) => {
  return useQuery({
    queryKey: ["university", universityId],
    queryFn: () => api.get(`/university/${universityId}`),
    enabled: Boolean(universityId),
    staleTime: 1000 * 60 * 5,
  });
};
