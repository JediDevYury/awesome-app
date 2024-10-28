import { handleError } from '@/shared';
import { useTransactionStore } from '@/store/transactionStore';
import { Transaction } from '@/types';
import { SQLiteDatabase } from 'expo-sqlite';
import { useState } from 'react';

export const useCreateTransaction = (db: SQLiteDatabase) => {
  const [error, setError] = useState<Error>();
  const { setTransactionsUpdated } = useTransactionStore();

  async function createTransaction(transaction: Omit<Transaction, 'id'>) {
    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(
          `
        INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (?, ?, ?, ?, ?);
      `,
          [
            transaction.category_id,
            transaction.amount,
            transaction.date,
            transaction.description,
            transaction.type,
          ],
        );
      });

      setTransactionsUpdated();
    } catch (error) {
      handleError(error, setError, 'create transaction');
    }
  }

  return { createTransaction, error };
};
