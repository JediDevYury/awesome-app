import { TransactionsList } from '@/components/home/TransactionsList';
import categories from '@/mocks/categories.json';
import { expenses } from '@/mocks/expenses.json';
import { income } from '@/mocks/income.json';
import { Category, Transaction } from '@/types';
import { View, StyleSheet } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const transactions = [...income, ...expenses]
  .map(({ category_id, ...transaction }) => {
    return {
      ...transaction,
      categoryId: category_id,
    };
  })
  .sort((a, b) => b.date - a.date) as unknown as Transaction[];

export default function Home() {
  return (
    <View style={styles.container}>
      <TransactionsList
        transactions={transactions}
        categories={categories as unknown as Category[]}
      />
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
