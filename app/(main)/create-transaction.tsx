import CategoriesList from './components/CategoryList';

import { Input, SegmentedControl, Title, Button } from '@/components/common';
import DateTimePicker from '@/components/common/DateTimePicker/DateTimePicker';
import { CreateTransactionSchema, createTransactionSchema } from '@/forms/schemas';
import { CategoryType } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { View, Platform, TouchableOpacity } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

function CreateTransaction() {
  const { styles, theme } = useStyles(stylesheet);

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
    //TODO: Create transaction into SQLite database
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href={'/'} replace asChild>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name={'close'} size={24} color={theme.colors.black} />
          </TouchableOpacity>
        </Link>
        <Title text="Create Transaction" />
      </View>
      <FormProvider {...methods}>
        <Controller
          name="type"
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <View style={styles.segmentedControl}>
              <SegmentedControl
                options={['Expense', 'Income']}
                selectedOption={value}
                onOptionPress={onChange}
              />
            </View>
          )}
        />
        <DateTimePicker />
        <Controller
          name="amount"
          control={methods.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder="Amount"
              value={value}
              onChangeText={onChange}
              keyboardType="numeric"
              autoCapitalize="none"
              errorMessage={error?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={methods.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              placeholder="Description"
              value={value}
              errorMessage={error?.message}
              onChangeText={onChange}
              style={styles.description}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          )}
        />
        <Controller
          name="categoryId"
          control={methods.control}
          render={({ field: { onChange, value } }) => (
            <CategoriesList selectedCategoryId={value} setSelectedCategoryId={onChange} />
          )}
        />
      </FormProvider>
      <Button
        text={'Create Transaction'}
        style={styles.createTransactionButton}
        onPress={methods.handleSubmit(onSubmit)}
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    borderRadius: theme.radius.s,
    paddingHorizontal: theme.spacing.l,
    paddingVertical: theme.spacing.s,
    paddingTop: UnistylesRuntime.insets.top,
    flex: 1,
    gap: theme.spacing.m,
  },
  header: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
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
    marginTop: theme.spacing.m,
    width: '80%',
    alignSelf: 'center',
  },
}));

export default CreateTransaction;
