import { DatabaseMigration } from '@/types';

const insertTransactionsQuery = `
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (1, 100.50, 1729767111, 'Weekly groceries', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (2, 75.25, 1729767111, 'More groceries', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (3, 1200, 1729767111, 'Monthly rent', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (4, 45.99, 1729767111, 'Snacks and drinks', 'Expense');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (8, 450, 1729767111, 'Consulting work', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (9, 2800, 1729767111, 'Part-time job', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (10, 600, 1729767111, 'Online sales', 'Income');
INSERT INTO Transactions (category_id, amount, date, description, type) VALUES (11, 1500, 1729767111, 'Freelance writing', 'Income');
`;

export const insertTransactions: DatabaseMigration = {
  name: 'insertTransactions',
  async up(db): Promise<void> {
    try {
      const transaction = await db.getFirstAsync('SELECT * FROM Transactions;');

      if (transaction) {
        return;
      }

      await db.execAsync(insertTransactionsQuery);
    } catch (error) {
      throw new Error('Could not insert transactions', { cause: error });
    }
  },
};
