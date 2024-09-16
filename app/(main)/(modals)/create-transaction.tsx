import { Input, SegmentedControl } from '@/components/common';
import { signInFormSchema } from '@/forms/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

function CreateTransaction() {
  const { styles } = useStyles(stylesheet);
  const methods = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      amount: '',
      date: new Date().toDateString(),
      description: '',
    },
    mode: 'onBlur',
  });

  return (
    <BlurView intensity={80} tint={'dark'} style={styles.blurView}>
      <View style={styles.container}>
        <SegmentedControl options={['Income', 'Expense']} selectedOption={'Income'} />
        <FormProvider {...methods}>
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
        </FormProvider>
      </View>
    </BlurView>
  );
}

const stylesheet = createStyleSheet(() => ({
  blurView: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    flex: 1,
    padding: 20,
  },
}));

export default CreateTransaction;
