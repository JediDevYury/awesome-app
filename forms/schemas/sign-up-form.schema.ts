import { FIELD_REQUIRED } from './constants';
import { emailValidation, passwordValidation } from './utils';
import z from 'zod';

export const signUpFormSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: z.string({
      invalid_type_error: 'validation.password.string',
      required_error: FIELD_REQUIRED,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'validation.password.confirm',
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
