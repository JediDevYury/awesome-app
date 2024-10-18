import { handleError } from '@/shared/helpers';
import { Category, Transaction, TransactionsByMonth } from '@/types';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useMemo, useState } from 'react';

interface IOptions {
  limit: number;
  order: 'DESC' | 'ASC';
}

export const useTransactions = () => {
  const db = useSQLiteContext();
  useDrizzleStudio(db);
  const [error, setError] = useState<Error>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [isTransactionsByMonthLoading, setIsTransactionsByMonthLoading] = useState(true);
  const [transactionsByMonth, setTransactionsByMonth] = useState<TransactionsByMonth>({
    totalIncome: 0,
    totalExpenses: 0,
  });

  const getCategories = async (): Promise<Category[] | void> => {
    try {
      const categories = await db.getAllAsync<Category>(`SELECT * FROM Categories;`);

      setCategories(categories);

      return categories;
    } catch (catchError) {
      handleError(catchError, setError, 'categories');
    }
  };

  const getTransactionsByMonth = async (): Promise<void> => {
    try {
      setIsTransactionsByMonthLoading(true);

      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

      const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000);
      const endOfMonthTimestamp = Math.floor(endOfMonth.getTime() / 1000);

      const [transactionsByMonth] = await db.getAllAsync<TransactionsByMonth>(
        `
      SELECT
        COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS totalExpenses,
        COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS totalIncome
      FROM Transactions
      WHERE date >= ? AND date <= ?;
    `,
        [startOfMonthTimestamp, endOfMonthTimestamp],
      );
      setTransactionsByMonth(transactionsByMonth);
    } catch (catchError) {
      handleError(catchError, setError, 'transactions by month');
    } finally {
      setIsTransactionsByMonthLoading(false);
    }
  };

  const getTransactions = async (
    options: IOptions = {
      limit: 25,
      order: 'DESC',
    },
  ): Promise<void> => {
    setIsTransactionsLoading(true);

    const { limit, order } = options;
    const query = `SELECT * FROM Transactions ORDER BY date ${order} LIMIT ?;`;

    try {
      const transactions = await db.getAllAsync<Transaction>(query, [limit]);

      setTransactions(transactions);
    } catch (catchError) {
      handleError(catchError, setError, 'transactions');
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const transactionsWithCategories = useMemo(() => {
    return transactions.map((transaction) => {
      const category = categories.find((category) => {
        return category.id === transaction.category_id;
      });
      return { ...transaction, category };
    });
  }, [transactions, categories, transactionsByMonth]);

  useEffect(() => {
    db.withExclusiveTransactionAsync(async () => {
      const categories = await getCategories();

      if (!categories) return;

      await Promise.all([getTransactionsByMonth(), getTransactions()]);
    });
  }, []);

  return {
    db,
    error,
    getTransactionsByMonth,
    getTransactions,
    transactions: transactionsWithCategories,
    isTransactionsLoading,
    transactionsByMonth: transactionsByMonth,
    isTransactionsByMonthLoading,
  };
};
