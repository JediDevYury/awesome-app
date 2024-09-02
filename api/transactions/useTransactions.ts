import { db } from '@/services';
import { Transaction } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const fetchTransactions = async () => {
  try {
    const transactionsCollection = collection(db, 'transactions');
    const transactionSnapshot = await getDocs(transactionsCollection);

    return transactionSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Transaction;
    });
  } catch (error) {
    console.error('Failed to fetch transactions', error);
  }
};

export const useTransactions = () => {
  const { data, ...query } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });

  return {
    ...query,
    transactions: data,
  };
};
