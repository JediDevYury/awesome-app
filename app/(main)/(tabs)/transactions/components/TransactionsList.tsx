import { TransactionListItem } from './TransactionListItem';
import { useCategories } from '@/api/categories';
import { useTransactions } from '@/api/transactions';
import { ErrorNotification, Loader } from '@/components/common';
import { Category, Transaction } from '@/types';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

export function TransactionsList() {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheet);

  const { categories, error: categoriesError, isLoading: isCategoriesLoading } = useCategories();

  const {
    transactions = [],
    isFetchingNextPage,
    isLoading: isTransactionsLoading,
    hasNextPage,
    error: transactionsError,
    loadMoreTransactions,
  } = useTransactions();

  const isLoading = isCategoriesLoading || isTransactionsLoading;
  const errorMessage = categoriesError?.message || transactionsError?.message;

  const getCategory = useMemo(
    () => (id: string) => categories?.find((category: Category) => category.id === id),
    [categories],
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Loader loading={isLoading} />
      </View>
    );
  }

  if (!categories?.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{t('transactions.no-categories')}</Text>
      </View>
    );
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
      <ErrorNotification errorMessage={errorMessage} />
      <FlatList
        data={transactions}
        keyExtractor={(item: Transaction) => item.id}
        contentContainerStyle={styles.flatListContainer}
        contentInsetAdjustmentBehavior={'automatic'}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity activeOpacity={0.7}>
              <TransactionListItem transaction={item} category={getCategory(item['categoryId'])} />
            </TouchableOpacity>
          );
        }}
        scrollEventThrottle={16}
        onEndReached={loadMoreTransactions}
        ListFooterComponent={
          <View style={styles.footer(hasNextPage)}>
            <Loader loading={isFetchingNextPage} />
          </View>
        }
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
    paddingTop: 20,
    paddingBottom: 20,
  },
  text: {
    color: theme.colors.typography,
    fontSize: theme.typography.size.l,
    fontFamily: theme.typography.variant.semiBold,
  },
  footer: (hasNextPage: boolean) => ({
    position: 'relative',
    height: hasNextPage ? 60 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  }),
}));
