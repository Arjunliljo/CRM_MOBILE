import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../../conf/conf";

const DEFAULT_PAGE_SIZE = 20;

export const useUniversities = ({
  searchQuery = "",
  country = "all",
  pageSize = DEFAULT_PAGE_SIZE,
} = {}) => {
  const fetchPage = async ({ pageParam = 1 }) => {
    const params = new URLSearchParams();
    params.append("page", pageParam);
    params.append("limit", pageSize);

    if (searchQuery && searchQuery.trim().length > 0) {
      params.append("search", searchQuery.trim());
    }
    if (country && country !== "all") {
      params.append("country", country);
    }

    const response = await api.get(`/university?${params.toString()}`);
    // Expecting shape: { status: 'success', data: University[] }
    return {
      items: response?.data?.data ?? [],
      page: pageParam,
      received: (response?.data?.data ?? []).length,
    };
  };

  const query = useInfiniteQuery({
    queryKey: [
      "universities",
      { search: searchQuery || "", country: country || "all", pageSize },
    ],
    queryFn: fetchPage,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      // If received less than pageSize, we're at the end
      return lastPage.received < pageSize ? undefined : lastPage.page + 1;
    },
    initialPageParam: 1,
  });

  return query;
};
