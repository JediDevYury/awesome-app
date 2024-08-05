import { addUserToFirestore } from '@/api/firestone';
import { RegisterUserProps } from '@/api/types';
import { auth } from '@/services/firebase.service';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const registerUser = async ({ email, password }: RegisterUserProps) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    await addUserToFirestore(userCredential.user);

    return userCredential.user;
  } catch (error) {
    console.error('Failed to register user', error);
  }
};
