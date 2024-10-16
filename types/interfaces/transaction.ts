import { Category } from '@/types';

export interface Transaction {
  id: number;
  amount: number;
  date: number;
  description: string;
  category_id: number;
  type: 'Income' | 'Expense';
}

export interface TransactionWithCategory extends Transaction {
  category: Category | undefined;
}

export interface TransactionsByMonth {
  totalIncome: number;
  totalExpenses: number;
}
