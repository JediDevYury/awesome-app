import { Amount } from './Amount';
import { Card, Chip } from '@/components/common';
import { CategoryColors, CategoryEmojies } from '@/shared';
import { Category, CategoryType, Transaction } from '@/types';
import { GetKeys } from '@/types/generics';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Platform, View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type TransactionListItemProps = {
  transaction: Transaction;
  category?: Category;
};

export const TransactionListItem = ({ transaction, category }: TransactionListItemProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheets);

  if (!category) {
    return (
      <Card style={styles.card}>
        <Text style={styles.text('semiBold', 'l')}>
          {t('transactions.transaction.no-category')}
        </Text>
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.categoryColumn}>
          <Amount
            color={category.type === CategoryType.Income ? 'green' : 'red'}
            amount={transaction.amount}
          >
            <Ionicons
              color={category.type === CategoryType.Income ? 'green' : 'red'}
              name={category.type === CategoryType.Income ? 'add-circle' : 'remove-circle'}
              size={24}
              style={styles.icon}
              allowFontScaling
            />
          </Amount>
          <Chip
            style={styles.chip}
            label={category.name}
            color={CategoryColors[category.name ?? 'Default']}
            emoji={CategoryEmojies[category.name ?? 'Default']}
          />
        </View>
        <View style={styles.transactionColumn}>
          <Text style={styles.text('semiBold', 'l')}>{transaction.description}</Text>
          <Text style={styles.text('regular', 'm', 'gray')}>
            {`${t('transactions.transaction.number')}:`} {transaction.id}
          </Text>
          <Text style={styles.text('semiBold', 'm', 'accent')}>
            {new Date(Number(transaction.date) * 1000).toDateString()}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const stylesheets = createStyleSheet((theme) => ({
  card: {
    marginTop: theme.spacing.s,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.s,
    padding: theme.spacing.s,
  },
  categoryColumn: {
    width: '40%',
    gap: theme.spacing.s,
  },
  category: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    alignSelf: 'flex-start',
    borderRadius: theme.radius.m,
  },
  transactionColumn: {
    flexGrow: 1,
    flexShrink: 1,
    gap: theme.spacing.s,
  },
  icon: {
    paddingRight: 4,
    marginTop: Platform.select({ ios: 0, android: 4 }),
  },
  transactionNumber: {
    color: theme.colors['gray'],
  },
  chip: {
    maxWidth: 140,
  },
  text: (
    font: GetKeys<typeof theme.typography.variant>,
    size: GetKeys<typeof theme.typography.size>,
    color?: GetKeys<typeof theme.colors>,
  ) => ({
    fontFamily: theme.typography.variant[font],
    fontSize: theme.typography.size[size],
    color: theme.colors[color || 'typography'],
  }),
}));
