import { db } from '@/services/firebase.service';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';

export const fetchUser = async (userId: string) => {
  const userDoc = await getDoc(doc(db, 'users', userId));

  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    throw new Error('User not found');
  }
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
};
