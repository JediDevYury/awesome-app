import { TransactionListItem } from './TransactionListItem';
import { Category, Transaction } from '@/types';
import { FlatList, TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';

type TransactionsListProps = {
  transactions: Transaction[];
  categories: Category[];
};

export function TransactionsList({ transactions, categories }: TransactionsListProps) {
  const { theme } = useStyles();
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        paddingHorizontal: theme.spacing.s,
        paddingVertical: theme.spacing.s,
      }}
      renderItem={({ item }) => {
        const category = categories.find((category) => category.id === item.categoryId);

        return (
          <TouchableOpacity key={item.id} activeOpacity={0.7}>
            <TransactionListItem transaction={item} category={category} />
          </TouchableOpacity>
        );
      }}
    />
  );
}
