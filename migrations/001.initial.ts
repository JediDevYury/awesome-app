import { DatabaseMigration } from '@/types';
import { SQLiteDatabase } from 'expo-sqlite';

const createCategoriesTableQuery = `CREATE TABLE IF NOT EXISTS Categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Expense', 'Income'))
);`;

const createTransactionsTableQuery = `CREATE TABLE IF NOT EXISTS Transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER,
  amount REAL NOT NULL,
  date INTEGER NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('Expense', 'Income')),
  FOREIGN KEY (category_id) REFERENCES Categories (id)
 );
`;

export const createInitialTables: DatabaseMigration = {
  name: 'create initial tables',
  async up(db: SQLiteDatabase): Promise<void> {
    try {
      await db.execAsync(createCategoriesTableQuery);
      await db.execAsync(createTransactionsTableQuery);
    } catch (error) {
      throw new Error('Could not create initial tables', { cause: error });
    }
  },
};
