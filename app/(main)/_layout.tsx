import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useStyles } from 'react-native-unistyles';

const Layout = () => {
  const { theme } = useStyles();

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/create-transaction"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerTransparent: true,
          headerTintColor: theme.colors.white,
          headerTitle: 'Create Transaction',
          headerLeft: () => (
            <Link replace href={'/(main)/(tabs)/transactions'} asChild>
              <TouchableOpacity>
                <Ionicons name="close-outline" size={24} color={theme.colors.white} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Stack>
  );
};
export default Layout;
