import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { Suspense, useEffect } from 'react';

import '@/services/i18n.service';
import '@/styles/unistyles';

import { ErrorNotification, Loader } from '@/components/common';
import { NetConnectionIndicator } from '@/components/common';
import { AuthProvider, useAuth } from '@/providers/auth.provider';
import { queryClient } from '@/services/react-query.service';
import { handleError } from '@/shared';
import { authStorage } from '@/storage/auth.storage';
import { focusManager } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Slot, useRouter, useSegments } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
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
  const router = useRouter();
  const segments = useSegments();
  const [loaded, fontLoadingError] = useFonts(fonts);
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
    try {
      const tokens = authStorage.getItem('tokens') || null;
      const inMainGroup = segments[0] === '(main)';

      if (tokens) {
        router.replace('/(main)');
      }

      if (!tokens && inMainGroup) {
        router.replace('/(main)');
      }
    } catch (error) {
      handleError(error);
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
      <ErrorNotification errorMessage={fontLoadingError?.message || authError?.message} />
      <Slot />
      <NetConnectionIndicator />
    </>
  );
}

function RootLayoutNav() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<Loader loading={true} />}>
          <SQLiteProvider
            databaseName={
              Platform.OS === 'android'
                ? (process.env.EXPO_PUBLIC_ANDROID_DATABASE_NAME ?? 'mySQLiteDB.db')
                : (process.env.EXPO_PUBLIC_IOS_DATABASE_NAME ?? 'mySQLiteDB')
            }
            assetSource={{ assetId: require('../assets/mySQLiteDB.db') }}
            useSuspense
          >
            <InitialLayout />
          </SQLiteProvider>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default RootLayoutNav;
