import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';

import '@/services/i18n.service';
import '@/styles/unistyles';

import { ErrorNotification } from '@/components/common';
import { AuthProvider, useAuth } from '@/providers/auth.provider';
import { persister, queryClient } from '@/services/react-query.service';
import { authStorage } from '@/storage/auth.storage';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { focusManager } from '@tanstack/query-core';
import { useQueryClient } from '@tanstack/react-query';
import { Slot, useRouter, useSegments } from 'expo-router';
import { AppState, AppStateStatus, Platform } from 'react-native';

const fonts = {
  'FiraSans-Regular': require('../assets/fonts/FiraSans-Regular.ttf'),
  'FiraSans-SemiBold': require('../assets/fonts/FiraSans-SemiBold.ttf'),
  'FiraSans-Bold': require('../assets/fonts/FiraSans-Bold.ttf'),
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export function InitialLayout() {
  const { user, authenticationStatus, signOut, error: authError } = useAuth();
  const queryClient = useQueryClient();
  const router = useRouter();
  const segments = useSegments();
  const [loaded, error] = useFonts(fonts);
  const hideSplashScreen = loaded && !(authenticationStatus === 'loading');

  const onAppStateChange = async (status: AppStateStatus) => {
    if (Platform.OS !== 'web') {
      focusManager.setFocused(status === 'active');
    }
    if (status === 'inactive') {
      await signOut();
    }
  };

  useEffect(() => {
    const tokens = authStorage.getItem('tokens');
    const inMainGroup = segments[0] === '(main)';

    if (tokens) {
      router.replace('/(main)/(tabs)/transactions');
    }

    if (!tokens && inMainGroup) {
      router.replace('/(auth)/sign-in');
    }

    return () => {
      queryClient.clear();
    };
  }, [user, authenticationStatus]);

  useEffect(() => {
    if (hideSplashScreen) {
      SplashScreen.hideAsync();
    }
  }, [hideSplashScreen]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <>
      <ErrorNotification errorMessage={error?.message || authError?.message} />
      <Slot />
    </>
  );
}

function RootLayoutNav() {
  useReactQueryDevTools(queryClient);

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <AuthProvider>
        <InitialLayout />
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}

export default RootLayoutNav;
