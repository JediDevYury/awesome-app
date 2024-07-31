import { Amount } from './Amount';
import { Card, CategoryColors, CategoryEmojies } from '@/shared';
import { Category, CategoryType, Transaction } from '@/types';
import React from 'react';
import { Text, View } from 'react-native';

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
    <Card className="m-4">
      <View className="flex flex-row items-center gap-1.5">
        <View className="w-[40%] gap-1">
          <Amount iconName={iconName} color={color} amount={transaction.amount} />
          <View
            className="self-start rounded-[10px] py-1.5 px-2.5"
            style={{ backgroundColor: categoryColor + 60 }}
          >
            <Text className="font-firaReg text-xs">
              {emoji} {category.name}
            </Text>
          </View>
        </View>
        <View className="flex grow-1 shrink-1 gap-1.5">
          <Text className="font-firaBold text-base">{transaction.description}</Text>
          <Text className="font-firaReg">Transaction number {transaction.id}</Text>
          <Text className="font-firaReg text-xs text-gray-600">
            {new Date(transaction.date).toDateString()}
          </Text>
        </View>
      </View>
    </Card>
  );
};
