import { FontAwesome } from '@expo/vector-icons';

import { Tabs } from 'expo-router';
import { useStyles } from 'react-native-unistyles';

export default function TabLayout() {
  const { theme } = useStyles();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.accent }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
