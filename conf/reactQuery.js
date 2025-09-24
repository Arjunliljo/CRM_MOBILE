import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true, // Optional: Prevents refetching when the window gains focus

      staleTime: 0, // Optional: Data considered fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Optional: Cached data lives for 10 minutes
      retry: 3,
      // refetchInterval: 60000,
    },
  },
});

export default queryClient;
