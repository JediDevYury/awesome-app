import { handleError } from '@/shared/helpers';
import { Category } from '@/types';
import { SQLiteDatabase } from 'expo-sqlite';
import { useState } from 'react';

export const useCategories = (db: SQLiteDatabase) => {
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

  const getCategoriesByType = async (type: string): Promise<Category[] | void> => {
    try {
      const categories = await db.getAllAsync<Category>(
        `SELECT * FROM Categories WHERE type = ?;`,
        [type],
      );

      setCategories(categories);
    } catch (catchError) {
      handleError(catchError, setError);
    }
  };

  return { categories, error, getCategories, getCategoriesByType };
};
