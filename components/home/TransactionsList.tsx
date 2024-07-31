import { TransactionListItem } from './TransactionListItem';
import { Category, Transaction } from '@/types';
import { ScrollView, TouchableOpacity } from 'react-native';

type TransactionsListProps = {
  transactions: Transaction[];
  categories: Category[];
};

export function TransactionsList({ transactions, categories }: TransactionsListProps) {
  return (
    <ScrollView>
      {transactions.map((transaction) => {
        return (
          <TouchableOpacity key={transaction.id} activeOpacity={0.7}>
            <TransactionListItem
              transaction={transaction}
              category={categories.find((category) => category.id === transaction.categoryId)!}
            />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
