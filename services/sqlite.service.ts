import { Category, Transaction, TransactionsByMonth } from '@/types';
import type { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';

interface IOptions {
  limit: number;
  order: 'DESC' | 'ASC';
}

class SQLiteService {
  db: SQLiteDatabase;
  error: Error | null | unknown = null;

  constructor(public databaseName: string) {
    if (!databaseName) {
      throw new Error('Database name is required');
    }
    this.db = SQLite.openDatabaseSync(databaseName);
  }

  setError(error: Error | null | unknown): void {
    this.error = error;
  }

  async getCategories(): Promise<Category[] | []> {
    try {
      return await this.db.getAllAsync<Category>(`SELECT * FROM Categories;`);
    } catch (catchError) {
      this.setError(catchError);
      return [];
    }
  }

  async getTransactionsByMonth(): Promise<TransactionsByMonth> {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      endOfMonth.setMilliseconds(endOfMonth.getMilliseconds() - 1);

      const startOfMonthTimestamp = Math.floor(startOfMonth.getTime() / 1000);
      const endOfMonthTimestamp = Math.floor(endOfMonth.getTime() / 1000);

      const [transactionsByMonth] = await this.db.getAllAsync<TransactionsByMonth>(
        `
      SELECT
        COALESCE(SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END), 0) AS totalExpenses,
        COALESCE(SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END), 0) AS totalIncome
      FROM Transactions
      WHERE date >= ? AND date <= ?;
    `,
        [startOfMonthTimestamp, endOfMonthTimestamp],
      );

      return transactionsByMonth;
    } catch (catchError) {
      this.setError(catchError);
      return {
        totalIncome: 0,
        totalExpenses: 0,
      };
    }
  }

  async getTransactions(
    options: IOptions = {
      limit: 25,
      order: 'DESC',
    },
  ): Promise<Transaction[] | []> {
    const { limit, order } = options;
    const query = `SELECT * FROM Transactions ORDER BY date ${order} LIMIT ?;`;

    try {
      return await this.db.getAllAsync<Transaction>(query, [limit]);
    } catch (catchError) {
      this.setError(catchError);
      return [];
    }
  }

  async updateTransactionCategoryByCategoryId(transactionId: number, categoryId: number) {
    await this.db.runAsync('UPDATE Transactions SET category_id = ? WHERE id = ?', [
      categoryId,
      transactionId,
    ]);
  }

  async deleteTransaction(id: number, options: IOptions): Promise<void> {
    try {
      await this.db.withTransactionAsync(async () => {
        await this.db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [id]);
        await this.getTransactions(options);
      });
    } catch (catchError) {
      this.setError(catchError);
    }
  }
}

export const db = Object.freeze(new SQLiteService(process.env.EXPO_DATABASE_NAME ?? 'mySQLiteDB'));
