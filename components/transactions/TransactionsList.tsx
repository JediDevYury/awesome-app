import { TransactionListItem } from './TransactionListItem';
import { Loader } from '@/components/common';
import { deleteTransactionConfirmation } from '@/shared';
import { useDeleteTransaction } from '@/sqlite/transaction';
import { Transaction, TransactionWithCategory } from '@/types';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View, Text, RefreshControl, Platform } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

type TransactionsListProps = { transactions: TransactionWithCategory[]; isLoading: boolean };

export function TransactionsList({ transactions, isLoading }: TransactionsListProps) {
  const { t } = useTranslation();
  const db = useSQLiteContext();
  const { deleteTransaction } = useDeleteTransaction(db);
  const [refreshing, setRefreshing] = useState(false);
  const { styles, theme } = useStyles(stylesheet);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  if (isLoading) {
    return <Loader loading={isLoading} />;
  }

  if (!transactions?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t('transactions.no-transactions')}</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={transactions}
        keyExtractor={(item: Transaction) => item.id.toString()}
        contentContainerStyle={styles.flatListContainer}
        contentInsetAdjustmentBehavior={'automatic'}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onLongPress={async () => {
                deleteTransactionConfirmation(
                  async () => {
                    await deleteTransaction(item.id);
                  },
                  {
                    title: t('confirmations.delete-transaction.title'),
                    message: t('confirmations.delete-transaction.description'),
                    confirmText: t('confirmations.delete-transaction.confirm'),
                    cancelText: t('confirmations.delete-transaction.cancel'),
                  },
                );
              }}
              activeOpacity={0.7}
            >
              <TransactionListItem transaction={item} category={item.category} />
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.accent}
            colors={[theme.colors.accent]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        // TODO: Implement pagination
        // onEndReached={loadMoreTransactions}
        // ListFooterComponent={
        //   <View style={styles.footer(hasNextPage)}>
        //     <Loader loading={isFetchingNextPage} />
        //   </View>
        // }
      />
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    paddingTop: UnistylesRuntime.insets.top,
    paddingBottom: UnistylesRuntime.insets.bottom,
  },
  flatListContainer: {
    paddingHorizontal: theme.spacing.s,
    paddingTop: 10,
    paddingBottom: Platform.select({ ios: 20, android: 40 }),
  },
  text: {
    color: theme.colors.typography,
    fontSize: theme.typography.size.l,
    fontFamily: theme.typography.variant.semiBold,
  },
  refreshControl: {
    color: theme.colors.accent,
  },
  footer: (hasNextPage: boolean) => ({
    position: 'relative',
    height: hasNextPage ? 60 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  }),
}));
