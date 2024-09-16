import { FIELD_REQUIRED } from './constants';
import { emailValidation, passwordValidation } from './utils';
import z from 'zod';

export const signUpFormSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string({
      invalid_type_error: 'Password confirmation must be a string',
      required_error: FIELD_REQUIRED,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
