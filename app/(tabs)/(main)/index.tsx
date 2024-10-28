import { ErrorNotification } from '@/components/common';
import { TransactionSummary, TransactionsList } from '@/components/transactions';
import { useTransactions } from '@/sqlite/transaction';
import { useSQLiteContext } from 'expo-sqlite';
import { View } from 'react-native';
import { createStyleSheet, useStyles, UnistylesRuntime } from 'react-native-unistyles';

export default function Transactions() {
  const { styles } = useStyles(stylesheet);
  const db = useSQLiteContext();
  const {
    error,
    transactions,
    transactionsByMonth,
    isTransactionsByMonthLoading,
    isTransactionsLoading,
  } = useTransactions(db);

  return (
    <>
      <ErrorNotification errorMessage={error?.message} />
      <View style={styles.container}>
        <TransactionSummary
          transactionsByMonth={transactionsByMonth}
          isLoading={isTransactionsByMonthLoading}
        />
        <TransactionsList transactions={transactions} isLoading={isTransactionsLoading} />
      </View>
    </>
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
  FAB: {
    position: 'absolute',
    bottom: 0,
    width: 40,
    height: 40,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
}));
