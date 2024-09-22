import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
// import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
// import { db } from '@/services';
// import { Transaction } from '@/types';

// export const fetchTransactions = async (
//   lastVisible: number | null,
// ): Promise<{ transactions: Transaction[]; lastDoc: any }> => {
//   const transactionsCollection = collection(db, 'transactions');
//
//   let transactionsQuery = query(transactionsCollection, orderBy('date', 'desc'), limit(10));
//
//   if (lastVisible) {
//     transactionsQuery = query(transactionsQuery, startAfter(lastVisible));
//   }
//
//   const transactionSnapshot = await getDocs(transactionsQuery);
//   const transactions = transactionSnapshot.docs.map((doc) => {
//     return {
//       id: doc.data().id,
//       ...doc.data(),
//     };
//   }) as Transaction[];
//
//   const lastDoc = transactionSnapshot.docs[transactionSnapshot.docs.length - 1] || null;
//
//   return { transactions, lastDoc };
// };

export const fetchTransactions = async (/*lastDoc: any*/) => {
  return {
    transactions: [],
    lastDoc: null,
  };
};

export const useTransactions = () => {
  const queryClient = useQueryClient();
  const queryKey = ['transactions'];

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...query } = useInfiniteQuery({
    queryKey,
    initialPageParam: null,
    staleTime: 0,
    queryFn: () => fetchTransactions(/*pageParam */),
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        return lastPage.lastDoc;
      }
      return null;
    },
    refetchOnWindowFocus: true,
  });

  const loadMoreTransactions = useCallback(async () => {
    if (hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage]);

  // Flatten the paginated data
  const transactions = data?.pages.flatMap((page) => page.transactions) || [];

  const invalidateTransactions = useCallback(async () => {
    queryClient.setQueryData(queryKey, (existingData: typeof data) => {
      if (!existingData) return { pageParams: [], pages: [] };

      const { pageParams, pages } = existingData;

      return {
        pageParams: pageParams ? [pageParams[0]] : [],
        pages: pages ? [pages[0]] : [],
      };
    });

    await queryClient.invalidateQueries({
      queryKey,
    });
  }, []);

  useEffect(() => {
    invalidateTransactions();
  }, [queryClient]);

  return {
    ...query,
    transactions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    loadMoreTransactions,
  };
};
