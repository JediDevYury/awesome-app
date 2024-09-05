import { FIELD_REQUIRED } from '@/forms/schemas/constants';
import z from 'zod';

export const passwordValidation = z
  .string({
    invalid_type_error: 'Password must be a string',
    required_error: FIELD_REQUIRED,
  })
  .min(8, 'Password must be at least 8 characters long')
  .max(32, 'Password must not exceed 32 characters')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/\d/, 'Password must contain at least one number')
  .regex(/[@$!%*?&]/, 'Password must contain at least one special character');

export const emailValidation = z
  .string({
    invalid_type_error: 'Email must be a string',
    required_error: FIELD_REQUIRED,
  })
  .email('Email is invalid');
