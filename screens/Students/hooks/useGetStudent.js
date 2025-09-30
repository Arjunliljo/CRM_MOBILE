import { useQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";

export const useGetStudent = (studentID) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["lead", studentID],
    queryFn: () => api.get(`/lead/${studentID}`),
  });

  return { data: data?.data?.data, isLoading, error, refetch };
};
