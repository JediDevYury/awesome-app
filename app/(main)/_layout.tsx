import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

const Layout = () => {
  const { theme } = useStyles();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Transactions',
          headerStyle: {
            backgroundColor: theme.colors.accent,
          },
          headerTitleStyle: {
            color: theme.colors.white,
            fontFamily: theme.typography.variant.semiBold,
            fontSize: theme.typography.size.xl,
          },
        }}
      />
      <Stack.Screen
        name="create-transaction"
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
    </Stack>
  );
};
export default Layout;
