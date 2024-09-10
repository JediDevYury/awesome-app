import { db } from '@/services/firebase.service';
import { User } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';

export const addUserToFirestore = async (user: User) => {
  const docUserRef = doc(db, 'users', user.uid);
  try {
    const userRef = await getDoc(docUserRef);

    if (userRef.exists()) {
      return;
    }

    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      id: user.uid,
      createdAt: new Date(),
    });
  } catch (error) {
    throw new Error('Failed to add user to firestore');
  }
};

export const saveUserToDatabase = async (users: User | null) => {
  try {
    if (!users) {
      return;
    }

    const userRef = collection(db, 'users');

    await addDoc(userRef, {
      email: users.email,
      id: users.uid,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Failed to save users to database', error);
  }
};

export const seedDatabase = async (key: string, data: any[]) => {
  // using batch

  const batch = writeBatch(db);

  const collectionRef = collection(db, key);

  try {
    await Promise.all(
      data.map(async (item) => {
        const docRef = doc(collectionRef, item.id);
        batch.set(docRef, item);
      }),
    );

    await batch.commit();
  } catch (error) {
    console.error('Failed to seed database', error);
  }
};
