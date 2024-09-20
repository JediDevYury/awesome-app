import { addUserToFirestore } from '@/api/firestore';
import { RegisterUserProps } from '@/api/types';
import { auth as FIREBASE_AUTH, ResponseData } from '@/services';
import { handleError } from '@/shared';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';

export const registerUser = async ({
  email,
  password,
}: RegisterUserProps): Promise<ResponseData<User>> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

    await addUserToFirestore(userCredential.user);

    return {
      data: userCredential.user,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('An unknown error occurred');
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

export default {
  registerUser,
  signInUser,
};
