import { handleError } from '@/shared';
import { useTransactionStore } from '@/store/transactionStore';
import { SQLiteDatabase } from 'expo-sqlite';
import { useState } from 'react';

export const useDeleteTransaction = (db: SQLiteDatabase) => {
  const [error, setError] = useState<Error>();
  const { setTransactionsUpdated } = useTransactionStore();

  const deleteTransaction = async (id: number) => {
    await db.withTransactionAsync(async () => {
      try {
        await db.runAsync(
          `
        DELETE FROM Transactions WHERE id = ?;
      `,
          [id],
        );
      } catch (error) {
        handleError(error, setError, 'delete transaction');
      }
    });

    setTransactionsUpdated();
  };

  return {
    deleteTransaction,
    error,
  };
};
