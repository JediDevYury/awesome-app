import { TransactionSummary } from './components/TransactionSummary';
import { TransactionsList } from './components/TransactionsList';
import { ErrorNotification } from '@/components/common';
import { useTransactions } from '@/hooks/useTransactions';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles, UnistylesRuntime } from 'react-native-unistyles';

export default function Transactions() {
  const { styles } = useStyles(stylesheet);
  const {
    error,
    transactions,
    transactionsByMonth,
    isTransactionsByMonthLoading,
    isTransactionsLoading,
  } = useTransactions();

  return (
    <>
      <ErrorNotification errorMessage={error?.message} />
      <View style={styles.container}>
        <TransactionSummary
          transactionsByMonth={transactionsByMonth}
          isLoading={isTransactionsByMonthLoading}
        />
        <TransactionsList transactions={transactions} isLoading={isTransactionsLoading} />
        <Link href={'/create-transaction'} replace asChild>
          <TouchableOpacity style={styles.FAB} activeOpacity={0.7}>
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </Link>
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
    right: 40,
    bottom: 40,
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
