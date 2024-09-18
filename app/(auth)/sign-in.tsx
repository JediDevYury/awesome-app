import { Button, CustomLink, Input, Title } from '@/components/common';
import { ErrorNotification } from '@/components/common';
import { signInFormSchema, type SignInFormSchema } from '@/forms/schemas';
import { useAuth } from '@/providers';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const { setUser } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [_, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '1070189961360-0sq5ctd0bkkr496oahq4mmpqu2407j2j.apps.googleusercontent.com',
    androidClientId: '1070189961360-lt7vvjq7gdeshcj9rkudk8erip80mchu.apps.googleusercontent.com',
  });
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
        router.push('/sign-up');
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    }
  };

  const clearError = () => {
    setError(null);
  };

  const fetchUserInfo = async () => {
    const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();

    setUser(userInfo);
  };

  useEffect(() => {
    if (response?.type === 'success' && response?.authentication?.accessToken) {
      setAccessToken(response?.authentication?.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

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
        <Button text="Sign in with Google" onPress={() => promptAsync()} />
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
