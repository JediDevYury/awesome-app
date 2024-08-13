import { TransactionsList } from './components/TransactionsList';
import { useCategories } from '@/api/categories';
import { useTransactions } from '@/api/transactions/useTransactions';
import { Loader } from '@/components/common/Loader';
import { View, StyleSheet, Alert } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { Text } from 'react-native-ui-lib';

export default function Home() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: initialWindowMetrics?.insets.bottom,
    paddingLeft: initialWindowMetrics?.insets.left,
    paddingRight: initialWindowMetrics?.insets.right,
  },
});
