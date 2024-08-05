import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import '../configs/rn-ui-lib.config';
import { AuthProvider } from '@/providers/auth.provider';
import { persister, queryClient } from '@/services/react-query.service';
import { ErrorNotification } from '@/shared';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { focusManager } from '@tanstack/query-core';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export function InitialLayout() {
  const [loaded, error] = useFonts({
    'FiraSans-Regular': require('../assets/fonts/FiraSans-Regular.ttf'),
    'FiraSans-SemiBold': require('../assets/fonts/FiraSans-SemiBold.ttf'),
    'FiraSans-Bold': require('../assets/fonts/FiraSans-Bold.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ErrorNotification error={error?.message} />
      <Slot />
    </>
  );
}

function RootLayoutNav() {
  useReactQueryDevTools(queryClient);

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <AuthProvider>
        <SafeAreaProvider>
          <InitialLayout />
        </SafeAreaProvider>
      </AuthProvider>
    </PersistQueryClientProvider>
  );
}

export default RootLayoutNav;
