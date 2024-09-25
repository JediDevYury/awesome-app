import { TransactionsList } from './components/TransactionsList';
import { Category, Transaction } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles, UnistylesRuntime } from 'react-native-unistyles';

export default function Transactions() {
  const db = useSQLiteContext();
  const { styles } = useStyles(stylesheet);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);

  const getTransaction = async () => {
    setIsTransactionsLoading(true);

    try {
      const result = await db.getAllAsync<Transaction>(
        `SELECT * FROM Transactions 
       ORDER BY date DESC
       LIMIT 25;`,
      );

      setTransactions(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const getCategories = async () => {
    const result = await db.getAllAsync<Category>(`SELECT * FROM Categories;`);
    setCategories(result);
  };

  // const updateTransactionCategoryId = async (transactionId: number, categoryId: number) => {
  //   await db.runAsync('UPDATE Transactions SET category_id = ? WHERE id = ?', [
  //     categoryId,
  //     transactionId,
  //   ]);
  // };

  const transactionsWithCategories = useMemo(() => {
    return transactions.map((transaction) => {
      const category = categories.find((category) => {
        return category.id === transaction.category_id;
      });
      return { ...transaction, category };
    });
  }, [transactions, categories]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length) return;
    getTransaction();
  }, [categories]);

  return (
    <View style={styles.container}>
      <TransactionsList
        transactions={transactionsWithCategories}
        isLoading={isTransactionsLoading}
      />
      <TouchableOpacity style={styles.FAB} activeOpacity={0.7}>
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    paddingLeft: UnistylesRuntime.insets.left,
    paddingRight: UnistylesRuntime.insets.right,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.typography,
  },
  FAB: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 40,
    height: 40,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
}));
