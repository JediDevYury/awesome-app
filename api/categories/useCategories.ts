import { db } from '@/services';
import { Category } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';

export const fetchCategories = async () => {
  try {
    const categoriesCollection = collection(db, 'categories');
    const categorySnapshot = await getDocs(categoriesCollection);

    return categorySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as Category;
    });
  } catch (error) {
    console.error('Failed to fetch categories', error);
  }
};

export const useCategories = () => {
  const { data, ...query } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  return {
    ...query,
    categories: data,
  };
};
