import { emailValidation, passwordValidation } from './utils';
import z from 'zod';

export const signInFormSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
