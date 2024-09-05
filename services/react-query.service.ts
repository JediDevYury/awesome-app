import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';

// Create a React Query Client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: true,
    },
  },
});

export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
});
