import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function AuthLayout() {
  const { theme } = useStyles();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTintColor: theme.colors.typography,
      }}
    >
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
