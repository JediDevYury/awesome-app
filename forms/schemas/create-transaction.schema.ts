import { CategoryType } from '@/types';
import z from 'zod';

export const createTransactionSchema = z.object({
  type: z.enum([CategoryType.Income, CategoryType.Expense]),
  amount: z.string().min(1, {
    message: 'Amount is required',
  }),
  date: z.date(),
  time: z.date(),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  categoryId: z.number().positive('Category is required'),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
