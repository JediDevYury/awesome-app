import { FIELD_REQUIRED } from '@/forms/schemas/constants';
import z from 'zod';

export const passwordValidation = z
  .string({
    invalid_type_error: 'validation.password.string',
    required_error: FIELD_REQUIRED,
  })
  .min(8, 'validation.password.min')
  .max(32, 'validation.password.max')
  .regex(/[a-z]/, 'validation.password.regex.lowercase')
  .regex(/[A-Z]/, 'validation.password.regex.uppercase')
  .regex(/\d/, 'validation.password.regex.number')
  .regex(/[@$!%*?&]/, 'validation.password.regex.special');

export const emailValidation = z
  .string({
    invalid_type_error: 'validation.email.string',
    required_error: FIELD_REQUIRED,
  })
  .email('validation.email.invalid');
