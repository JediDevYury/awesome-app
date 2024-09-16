import z from 'zod';

export const createTransactionSchema = z.object({
  amount: z.string(),
  date: z.string(),
  description: z.string(),
});

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;
