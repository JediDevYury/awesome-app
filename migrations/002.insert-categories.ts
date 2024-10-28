import { DatabaseMigration } from '@/types';
import { SQLiteDatabase } from 'expo-sqlite';

export const insertCategoriesQuery = `INSERT INTO Categories (name, type) VALUES ('Utilities', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Electronics', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Dining Out', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Breakfast Supplies', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Household Items', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Christmas Gifts', 'Expense');
INSERT INTO Categories (name, type) VALUES ('New Year Party Supplies', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Thanksgiving Groceries', 'Expense');
INSERT INTO Categories (name, type) VALUES ('Bonus', 'Income');
INSERT INTO Categories (name, type) VALUES ('Consulting Work', 'Income');
INSERT INTO Categories (name, type) VALUES ('Part-time Job', 'Income');
INSERT INTO Categories (name, type) VALUES ('Online Sales', 'Income');
INSERT INTO Categories (name, type) VALUES ('Freelance Writing', 'Income');
INSERT INTO Categories (name, type) VALUES ('End of Year Bonus', 'Income');
INSERT INTO Categories (name, type) VALUES ('Thanksgiving Freelance', 'Income');
`;

export const insertCategories: DatabaseMigration = {
  name: 'insertCategories',
  async up(db: SQLiteDatabase): Promise<void> {
    try {
      const category = await db.getFirstAsync('SELECT * FROM Categories;');

      if (category) {
        return;
      }

      await db.execAsync(insertCategoriesQuery);
    } catch (error) {
      throw new Error('Could not insert category', { cause: error });
    }
  },
};
