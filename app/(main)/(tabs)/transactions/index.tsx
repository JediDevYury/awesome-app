import { TransactionSummary } from './components/TransactionSummary';
import { TransactionsList } from './components/TransactionsList';
import { ErrorNotification } from '@/components/common';
import { sqliteDB } from '@/services';
import { Category, Transaction, TransactionsByMonth } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles, UnistylesRuntime } from 'react-native-unistyles';

export default function Transactions() {
  const { styles } = useStyles(stylesheet);
  const db = useSQLiteContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [transactionsByMonth, setTransactionsByMonth] = useState<TransactionsByMonth>({
    totalIncome: 0,
    totalExpenses: 0,
  });

  const getTransaction = async () => {
    setIsTransactionsLoading(true);

    try {
      const [categories, transactions] = await Promise.all([
        sqliteDB.getCategories(),
        sqliteDB.getTransactions({ limit: 10, order: 'ASC' }),
      ]);

      setCategories(categories);
      setTransactions(transactions);

      const transactionsByMonth = await sqliteDB.getTransactionsByMonth();

      setTransactionsByMonth(transactionsByMonth);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message || 'An error occurred');
      } else {
        throw error;
      }
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const transactionsWithCategories = useMemo(() => {
    return transactions.map((transaction) => {
      const category = categories.find((category) => {
        return category.id === transaction.category_id;
      });
      return { ...transaction, category };
    });
  }, [transactions, categories]);

  useEffect(() => {
    db.withTransactionAsync(async () => {
      await getTransaction();
    });
  }, [db]);

  return (
    <>
      <ErrorNotification errorMessage={errorMessage} />
      <View style={styles.container}>
        <TransactionSummary
          transactionsByMonth={transactionsByMonth}
          isLoading={isTransactionsLoading}
        />
        <TransactionsList
          transactions={transactionsWithCategories}
          isLoading={isTransactionsLoading}
        />
        <TouchableOpacity style={styles.FAB} activeOpacity={0.7}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
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
