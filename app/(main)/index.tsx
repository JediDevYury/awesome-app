import { useCategories } from '@/api/categories';
import { useTransactions } from '@/api/transactions';
import { TransactionsList } from '@/app/(main)/components/TransactionsList';
import { Loader } from '@/components/common/Loader';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles, UnistylesRuntime } from 'react-native-unistyles';

export default function Home() {
  const { styles } = useStyles(stylesheet);

  const {
    categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
    isError: isCategoriesError,
  } = useCategories();

  const {
    transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError,
    isError: isTransactionsError,
  } = useTransactions();

  const isLoading = isCategoriesLoading || isTransactionsLoading;
  const isError = isCategoriesError || isTransactionsError;

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  if (isError) {
    Alert.alert('Error', categoriesError?.message || transactionsError?.message);
  }

  if (!categories || !transactions) {
    return (
      <View style={styles.container}>
        <Text>There are no transactions to display.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TransactionsList transactions={transactions} categories={categories} />
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.7}
        onPress={() => {
          Alert.alert('FAB button pressed');
        }}
      >
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
  fab: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    bottom: 20,
    elevation: 8,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
}));
