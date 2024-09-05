import { db } from '@/services';
import { Transaction } from '@/types';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore';
import { useCallback, useEffect } from 'react';

export const fetchTransactions = async (
  lastVisible: number | null,
): Promise<{ transactions: Transaction[]; lastDoc: any }> => {
  const transactionsCollection = collection(db, 'transactions');

  let transactionsQuery = query(transactionsCollection, orderBy('date', 'desc'), limit(10));

  if (lastVisible) {
    transactionsQuery = query(transactionsQuery, startAfter(lastVisible));
  }

  const transactionSnapshot = await getDocs(transactionsQuery);
  const transactions = transactionSnapshot.docs.map((doc) => {
    return {
      id: doc.data().id,
      ...doc.data(),
    };
  }) as Transaction[];

  const lastDoc = transactionSnapshot.docs[transactionSnapshot.docs.length - 1] || null;

  return { transactions, lastDoc };
};

export const useTransactions = () => {
  const queryClient = useQueryClient();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, ...query } = useInfiniteQuery({
    queryKey: ['transactions'],
    initialPageParam: null,
    staleTime: 0,
    queryFn: ({ pageParam }) => fetchTransactions(pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage) {
        return lastPage.lastDoc;
      }
      return null;
    },
    refetchOnWindowFocus: true,
  });

  const loadMoreTransactions = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, hasNextPage]);

  // Flatten the paginated data
  const transactions = data?.pages.flatMap((page) => page.transactions) || [];

  useEffect(() => {
    queryClient.setQueryData(['transactions'], (existingData: typeof data) => {
      if (!existingData) return { pageParams: [], pages: [] };

      const { pageParams, pages } = existingData;

      return {
        pageParams: pageParams ? [pageParams[0]] : [],
        pages: pages ? [pages[0]] : [],
      };
    });
    queryClient.invalidateQueries({
      queryKey: ['transactions'],
    });
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
