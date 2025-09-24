import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";
import queryClient from "../../../conf/reactQuery";

const LIMIT = 50;

export const useStudents = () => {
  // Build the base endpoint without page parameter

  let endpoint = `/lead/aggregate?sort=-assignedDate&isStudent=true&limit=${LIMIT}&page=`;

  // Use React Query's useInfiniteQuery for pagination
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["students"],
    queryFn: ({ pageParam = 1 }) => {
      const point = endpoint + pageParam;
      return api.get(point);
    },
    getNextPageParam: (lastPage, allPages) => {
      // Check if the last page has data and if it's less than the limit, it's the last page
      const hasData = lastPage?.data?.data?.length > 0;
      const isLastPage = lastPage?.data?.data?.length < LIMIT; // Assuming 50 is the limit
      return hasData && !isLastPage ? allPages?.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    // refetchInterval: 1000,
  });

  // Flatten all pages of data into a single array
  const students = data?.pages?.flatMap((page) => page?.data?.data || []) || [];

  return {
    students,
    isLoading,
    totalStudents: data?.pages[0]?.data?.totalLeads,
    isLoadingMore: isFetchingNextPage,
    error,
    refetch,
    fetchNextPage,
    hasMore: hasNextPage,
  };
};

export const refetchStudents = async () => {
  queryClient.invalidateQueries({
    queryKey: ["students"],
    refetchType: "all",
    exact: false,
  });
};
