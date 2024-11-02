// react-query-client.ts
import { QueryClient } from '@tanstack/react-query';

let queryClient: QueryClient;

const getQueryClient = (): QueryClient => {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutes
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return queryClient;
};

export default getQueryClient;
