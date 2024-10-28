import { Stack } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function Layout() {
  const { theme } = useStyles();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Transactions',
          headerStyle: {
            backgroundColor: theme.colors.accent,
          },
          headerTitleStyle: {
            color: 'white',
            fontFamily: theme.typography.variant.semiBold,
            fontSize: 24,
          },
        }}
      />
    </Stack>
  );
}
