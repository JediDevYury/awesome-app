import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';

import { useAuth } from '@/providers';

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
