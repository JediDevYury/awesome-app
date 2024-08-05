import { Amount } from './Amount';
import { Card, CategoryColors, CategoryEmojies } from '@/shared';
import { Category, CategoryType, Transaction } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import { Colors, Text, Typography, View } from 'react-native-ui-lib';

type TransactionListItemProps = {
  transaction: Transaction;
  category: Category;
};

export const TransactionListItem = ({ transaction, category }: TransactionListItemProps) => {
  const iconName = category.type === CategoryType.Income ? 'add-circle' : 'remove-circle';
  const color = category.type === CategoryType.Income ? 'green' : 'red';
  const categoryColor = CategoryColors[category.name ?? 'Default'];
  const emoji = CategoryEmojies[category?.name ?? 'Default'];

  return (
    <Card marginT-10>
      <View flex row centerH gap-6>
        <View style={styles.amountContainer}>
          <Amount color={color} amount={transaction.amount}>
            <Ionicons
              color={color}
              name={iconName}
              size={18}
              style={styles.icon}
              allowFontScaling
            />
          </Amount>
          <View
            paddingH-12
            paddingV-6
            style={[styles.categoryContainer, { backgroundColor: categoryColor + 60 }]}
          >
            <Text style={Typography.small}>
              {emoji} {category.name}
            </Text>
          </View>
        </View>
        <View style={styles.transactionContainer}>
          <Text style={Typography.bold}>{transaction.description}</Text>
          <Text style={Typography.regular}>Transaction number {transaction.id}</Text>
          <Text style={styles.transactionDate}>{new Date(transaction.date).toDateString()}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  amountContainer: {
    width: '40%',
    gap: 6,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  transactionContainer: {
    flexGrow: 1,
    flexShrink: 1,
    gap: 6,
  },
  transactionDate: {
    ...Typography.small,
    color: Colors.neutral,
  },
  icon: {
    paddingRight: 4,
    marginTop: Platform.select({ ios: 0, android: 4 }),
  },
});
