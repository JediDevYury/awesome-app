import { Redirect, Stack, useRouter } from 'expo-router';

import { Loader } from '@/components/common/Loader';
import { useAuth } from '@/providers';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors } from 'react-native-ui-lib';

export default function MainLayout() {
  const { user, signOut, isLoading } = useAuth();

  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.navigate('/sign-in');
  };

  if (isLoading) return <Loader loading={isLoading} />;

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerTitle: 'Transactions',
        headerTitleStyle: {
          color: 'white',
          fontFamily: 'FiraSans-SemiBold',
          fontSize: 18,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTitleAlign: 'center',
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="white" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
