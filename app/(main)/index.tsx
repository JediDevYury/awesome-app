import { TransactionsList } from '@/components/home/TransactionsList';
import categories from '@/mocks/categories.json';
import { expenses } from '@/mocks/expenses.json';
import { income } from '@/mocks/income.json';
import { Category, Transaction } from '@/types';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const transactions = [...income, ...expenses]
  .map(({ category_id, ...transaction }) => {
    return {
      ...transaction,
      categoryId: category_id,
    };
  })
  .sort((a, b) => b.date - a.date) as unknown as Transaction[];

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1"
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <TransactionsList
        transactions={transactions}
        categories={categories as unknown as Category[]}
      />
    </View>
  );
}
