import { Platform, View } from 'react-native';

import { Button, Input, SegmentedControl } from '@/components/common';
import DatePicker from '@/components/common/DatePicker/DatePicker';
import CategoriesList from '@/components/transactions/CategoryList';
import { CreateTransactionSchema, createTransactionSchema } from '@/forms/schemas';
import { excludeProperties } from '@/shared';
import { useCreateTransaction } from '@/sqlite/transaction';
import { useTransactionStore } from '@/store/transactionStore';
import { CategoryType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function NewTransaction() {
  const { styles } = useStyles(stylesheets);
  const { t } = useTranslation();
  const db = useSQLiteContext();
  const { createTransaction } = useCreateTransaction(db);
  const setTransactionsUpdated = useTransactionStore((state) => state.setTransactionsUpdated);
  const router = useRouter();

  const methods = useForm({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: CategoryType.Expense,
      amount: '',
      date: new Date(),
      time: new Date(),
      description: '',
      categoryId: 1,
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<CreateTransactionSchema> = async (formData) => {
    const {
      categoryId: category_id,
      amount,
      date,
      ...rest
    } = excludeProperties(formData, ['time']);

    await createTransaction({
      ...rest,
      category_id,
      amount: parseFloat(amount),
      date: Math.floor(date.getTime() / 1000),
    });

    setTransactionsUpdated();

    router.navigate('/');
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps={'handled'}
    >
      <FormProvider {...methods}>
        <Controller
          name="type"
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.segmentedControl}>
              <SegmentedControl
                options={[
                  t('transactions.transaction.types.expense'),
                  t('transactions.transaction.types.income'),
                ]}
                selectedOption={value}
                onOptionPress={onChange}
              />
            </View>
          )}
        />
        <View style={styles.categoryAndDateContainer}>
          <Controller
            name="categoryId"
            control={methods.control}
            render={({ field: { onChange, value } }) => (
              <CategoriesList selectedCategoryId={value} setSelectedCategoryId={onChange} />
            )}
          />
          <DatePicker />
        </View>
        <Controller
          name="amount"
          control={methods.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder={t('transactions.transaction.amount')}
              value={value}
              onChangeText={onChange}
              keyboardType="number-pad"
              autoCapitalize="none"
              errorMessage={error?.message}
              inputStyle={styles.input}
            />
          )}
        />
        <Controller
          name="description"
          control={methods.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder={t('transactions.transaction.description')}
              value={value}
              errorMessage={error?.message}
              onChangeText={onChange}
              style={styles.description}
              numberOfLines={4}
              inputStyle={styles.input}
              textAlignVertical="top"
              multiline
            />
          )}
        />
        <Button
          text={t('transactions.create-transaction')}
          style={styles.createTransactionButton}
          isLoading={methods.formState.isSubmitting}
          onPress={() => {
            methods.handleSubmit(onSubmit)();
          }}
        />
      </FormProvider>
    </KeyboardAwareScrollView>
  );
}

const stylesheets = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
    gap: theme.spacing.l,
  },
  segmentedControl: {
    alignSelf: 'center',
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    width: theme.spacing.l,
    alignItems: 'center',
  },
  description: {
    justifyContent: 'flex-start',
    height: 100,
    paddingVertical: Platform.select({ android: 4, ios: 2 }),
  },
  createTransactionButton: {
    marginTop: 24,
    width: '80%',
    alignSelf: 'center',
  },
  categoryAndDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
  },
}));
