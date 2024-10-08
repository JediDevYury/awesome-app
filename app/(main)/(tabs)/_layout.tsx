import { FontAwesome } from '@expo/vector-icons';

import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useStyles } from 'react-native-unistyles';

export default function TabLayout() {
  const { t } = useTranslation();
  const { theme } = useStyles();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.accent }}>
      <Tabs.Screen
        name="transactions"
        options={{
          title: t('tabs.title.transactions'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerTitleStyle: {
            color: theme.colors.typography,
            fontSize: theme.typography.size.xxl,
            fontFamily: theme.typography.variant.semiBold,
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t('tabs.title.settings'),
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
