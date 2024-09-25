import { Category } from '@/types';

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  category_id: string;
}

export interface TransactionWithCategory extends Transaction {
  category: Category | undefined;
}
