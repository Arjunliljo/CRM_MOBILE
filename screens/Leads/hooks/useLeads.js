import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";
import queryClient from "../../../conf/reactQuery";
import { useSelector } from "react-redux";

const LIMIT = 50;

export const useLeads = () => {
  // Select filters/state
  const {
    searchQuery = "",
    curBranch,
    curCountry,
    curStatus,
    curSubStatus,
    curForm,
    curRole,
    curUser,
    curSelectedCourse,
  } = useSelector((state) => state.lead) || {};

  // Base endpoint (without page)
  const baseEndpoint = `/lead/aggregate?sort=-assignedDate&isStudent=false&limit=${LIMIT}&page=`;

  // Helper to add a param only when valid
  const addParam = (params, key, value) => {
    if (value && value !== "All")
      params.push(`${key}=${encodeURIComponent(value)}`);
  };

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
    queryKey: [
      "leads",
      searchQuery,
      curBranch,
      curCountry,
      curStatus,
      curSubStatus,
      curForm,
      curRole,
      curUser,
      curSelectedCourse,
    ],
    queryFn: ({ pageParam = 1 }) => {
      const params = [];
      addParam(params, "search", searchQuery);
      addParam(params, "branch", curBranch);
      addParam(params, "country", curCountry);
      addParam(params, "status", curStatus);
      addParam(params, "subStatus", curSubStatus);
      addParam(params, "form", curForm);
      addParam(params, "role", curRole);
      addParam(params, "user", curUser);
      addParam(params, "selectedCourse", curSelectedCourse);

      const querySuffix = params.length ? `&${params.join("&")}` : "";
      const url = `${baseEndpoint}${pageParam}${querySuffix}`;
      return api.get(url);
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

export const refetchLeads = async () => {
  queryClient.invalidateQueries({
    queryKey: ["leads"],
    refetchType: "all",
    exact: false,
  });
};
