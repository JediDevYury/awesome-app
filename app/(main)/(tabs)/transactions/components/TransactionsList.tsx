import { TransactionListItem } from './TransactionListItem';
import { Loader, Title } from '@/components/common';
// import { ErrorNotification, Loader } from '@/components/common';
import { Transaction, TransactionWithCategory } from '@/types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

type TransactionsListProps = { transactions: TransactionWithCategory[]; isLoading: boolean };

export function TransactionsList({ transactions, isLoading }: TransactionsListProps) {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheet);

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
      {/*<ErrorNotification errorMessage={errorMessage} />*/}
      <FlatList
        data={transactions}
        keyExtractor={(item: Transaction) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            <Title text={t('tabs.title.transactions')} />
          </View>
        }
        contentContainerStyle={styles.flatListContainer}
        contentInsetAdjustmentBehavior={'automatic'}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity activeOpacity={0.7}>
              <TransactionListItem transaction={item} category={item.category} />
            </TouchableOpacity>
          );
        }}
        scrollEventThrottle={16}
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
  header: {
    alignItems: 'center',
    paddingBottom: 8,
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
