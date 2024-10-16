import { Card } from '@/components/common';
import { TransactionsByMonth } from '@/types';
import { Skeleton } from 'moti/skeleton';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type TransactionSummaryProps = {
  transactionsByMonth: TransactionsByMonth;
  isLoading: boolean;
};

const formatMoney = (value: number) => {
  const absValue = Math.abs(value).toFixed(2);
  return `${value < 0 ? '-' : ''}$${absValue}`;
};

const isPositive = (value: number) => {
  return value > 0;
};

export function TransactionSummary({ transactionsByMonth, isLoading }: TransactionSummaryProps) {
  const { t } = useTranslation();
  const { styles, theme } = useStyles(stylesheet);
  const { totalIncome, totalExpenses } = transactionsByMonth;
  const savings = totalIncome - totalExpenses;

  const readablePeriod = new Date().toLocaleDateString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card style={styles.container}>
      <Skeleton.Group show={isLoading}>
        <Skeleton width={'100%'} {...theme.defaultStyles.skeleton}>
          <Text style={styles.periodTitle}>
            {t('transactions.month-summary.title')} {readablePeriod}
          </Text>
        </Skeleton>
        <Skeleton width={'80%'} {...theme.defaultStyles.skeleton}>
          <Text style={styles.summary}>
            {t('transactions.month-summary.income')}:{'  '}
            <Text style={styles.text(true)}>{formatMoney(totalIncome)}</Text>
          </Text>
        </Skeleton>
        <Skeleton width={'80%'} {...theme.defaultStyles.skeleton}>
          <Text style={styles.summary}>
            {t('transactions.month-summary.expenses')}:{'  '}
            <Text style={styles.text(false)}>{formatMoney(totalExpenses)}</Text>
          </Text>
        </Skeleton>
        <Skeleton width={'80%'} {...theme.defaultStyles.skeleton}>
          <Text style={styles.summary}>
            {t('transactions.month-summary.savings')}:{'  '}
            <Text style={styles.text(isPositive(savings))}>{formatMoney(savings)}</Text>
          </Text>
        </Skeleton>
      </Skeleton.Group>
    </Card>
  );
}

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginVertical: theme.spacing.s,
    marginHorizontal: theme.spacing.s,
    gap: theme.spacing.s,
  },
  periodTitle: {
    fontSize: theme.typography.size.l,
    fontFamily: theme.typography.variant.semiBold,
  },
  summary: {
    fontSize: theme.typography.size.m,
    fontFamily: theme.typography.variant.semiBold,
  },
  text: (isPositive: boolean) => {
    return {
      color: isPositive ? theme.colors.green : theme.colors.accent,
      fontSize: theme.typography.size.l,
    };
  },
}));
