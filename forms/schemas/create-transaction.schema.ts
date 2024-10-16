import { CategoryType } from '@/types';
import z from 'zod';

export const createTransactionSchema = z.object({
  type: z.enum([CategoryType.Income, CategoryType.Expense]),
  amount: z.string({
    required_error: 'Amount is required',
  }),
  date: z.date().max(new Date(), 'Date cannot be in the future'),
  time: z.date(),
  description: z.string({
    required_error: 'Description is required',
  }),
  categoryId: z.number().positive('Category is required'),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
