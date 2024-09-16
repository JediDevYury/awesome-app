import { Stack } from 'expo-router';
import React from 'react';
import { useStyles } from 'react-native-unistyles';

const TransactionsLayout = () => {
  const { theme } = useStyles();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: theme.colors.white,
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Transaction' }} />
    </Stack>
  );
};

export default TransactionsLayout;
