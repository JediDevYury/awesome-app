import { handleError } from '@/shared/helpers';
import { Category } from '@/types';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

export const useCategories = () => {
  const db = useSQLiteContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error>();

  const getCategories = async (): Promise<Category[] | void> => {
    try {
      const categories = await db.getAllAsync<Category>(`SELECT * FROM Categories;`);

      setCategories(categories);

      return categories;
    } catch (catchError) {
      handleError(catchError, setError);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return { categories, error };
};
