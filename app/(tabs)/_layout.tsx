import { useUserStore } from '@/store/userStore';
import { Feather, Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import { Platform, Pressable, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const Layout = () => {
  const { theme, styles } = useStyles(stylesheet);
  SplashScreen.hideAsync();

  const hasFinishedOnboarding = useUserStore((state) => state.hasFinishedOnboarding);

  if (!hasFinishedOnboarding) {
    return <Redirect href={'/onboarding'} />;
  }

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.accent,
        }}
      >
        <Tabs.Screen
          name="(main)"
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => {
              return <FontAwesome6 name="money-bills" size={size} color={color} />;
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarShowLabel: false,
            tabBarIcon: ({ color, size }) => {
              return <Feather name="user" size={size} color={color} />;
            },
          }}
        />
      </Tabs>
      <Link href={'/new'} asChild>
        <Pressable style={styles.FAB} hitSlop={theme.spacing.s}>
          <Ionicons name="add" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
  },
  FAB: {
    position: 'absolute',
    bottom: Platform.select({ ios: 50, android: 20 }),
    left: '50%',
    transform: [{ translateX: -25 }],
    width: 40,
    height: 40,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
}));

export default Layout;
