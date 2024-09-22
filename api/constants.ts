import firebaseAuth from '@/api/auth.firebase';
import restAuth from '@/api/auth.rest';

export const authProvider =
  process.env.EXPO_PUBLIC_AUTH_PROVIDER === 'rest' ? restAuth : firebaseAuth;
