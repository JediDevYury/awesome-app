import { addUserToFirestore } from '@/api/firestore';
import { RegisterUserProps } from '@/api/types';
import { auth as FIREBASE_AUTH } from '@/services';
import { handleError } from '@/shared';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';

export const registerUser = async ({ email, password }: RegisterUserProps) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

    await addUserToFirestore(userCredential.user);

    return {
      data: userCredential.user,
    };
  } catch (error) {
    handleError(error);
  }
};

export const signInUser = async ({ email, password }: RegisterUserProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);

    return {
      data: userCredential.user,
    };
  } catch (err) {
    handleError(err);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(FIREBASE_AUTH);
  } catch (err) {
    handleError(err);
  }
};

export const verify2fa = async (email: string, token: string) => {
  return Promise.resolve({ data: { email, token } });
};

export const reset2fa = async (email: string) => {
  return Promise.resolve({ data: { email } });
};

export default {
  registerUser,
  signInUser,
  signOut,
  verify2fa,
  reset2fa,
};
