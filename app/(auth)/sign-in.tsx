import { Button, CustomLink, Input, Title } from '@/components/common';
import { ErrorNotification } from '@/components/common';
import { useAuth } from '@/providers';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function SignIn() {
  const { styles } = useStyles(stylesheet);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  const { signIn, user, isLoading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);

      if (user) {
        router.replace('/(main)');
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');

      setError(error);
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
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input isPassword placeholder="Password" value={password} onChangeText={setPassword} />
        <Button text="Sign In" onPress={handleSignIn} isLoading={isLoading} />
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
    gap: theme.spacing.m,
  },
}));
