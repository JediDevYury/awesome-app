import { Button, CustomLink, Input, Title } from '@/components/common';
import { ErrorNotification } from '@/components/common';
import { signInFormSchema, type SignInFormSchema } from '@/forms/schemas';
import { useAuth } from '@/providers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function SignIn() {
  const { styles } = useStyles(stylesheet);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const { signIn, user, isLoading } = useAuth();
  const methods = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignInFormSchema> = async (formData) => {
    const { email, password } = formData;

    try {
      await signIn(email, password);

      if (user) {
        router.push('/verification');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      <ErrorNotification errorMessage={error?.message} clearError={clearError} />
      <View style={styles.container}>
        <Title text="Welcome to Awesome App!" />
        <FormProvider {...methods}>
          <Controller
            name="email"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                isPassword
                errorMessage={error?.message}
              />
            )}
          />

          <Button text="Sign In" onPress={methods.handleSubmit(onSubmit)} isLoading={isLoading} />
        </FormProvider>
        <Text>
          Don't have an account? <CustomLink href={'/sign-up'} text={'Sign Up'} />
        </Text>
      </View>
    </>
  );
}

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    ...theme.defaultStyles.container,
    paddingHorizontal: theme.spacing.m,
  },
}));
