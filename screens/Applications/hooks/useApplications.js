import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";
import queryClient from "../../../conf/reactQuery";

const LIMIT = 50;

export const useApplication = () => {
  // Build the base endpoint without page parameter

  let endpoint = `/application/aggregate?sort=-assignedDate&isStudent=false&limit=${LIMIT}&page=`;

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
    queryKey: ["application"],
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
  const leads = data?.pages?.flatMap((page) => page?.data?.data || []) || [];

  return {
    leads,
    isLoading,
    totalLeads: data?.pages[0]?.data?.totalLeads,
    isLoadingMore: isFetchingNextPage,
    error,
    refetch,
    fetchNextPage,
    hasMore: hasNextPage,
  };
};

export const refetchApplications = async () => {
  queryClient.invalidateQueries({
    queryKey: ["application"],
    refetchType: "all",
    exact: false,
  });
};
