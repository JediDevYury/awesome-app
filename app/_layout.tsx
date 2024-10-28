import migrations from '@/migrations';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { Suspense, useEffect } from 'react';

import '@/services/i18n.service';
import '@/styles/unistyles';

import { ErrorNotification, Loader } from '@/components/common';
import { NetConnectionIndicator } from '@/components/common';
import { AuthProvider, useAuth } from '@/providers/auth.provider';
import { DbMigrationRunnerService } from '@/services';
import { queryClient } from '@/services/react-query.service';
import { handleError } from '@/shared';
import { focusManager } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { SQLiteDatabase, SQLiteProvider } from 'expo-sqlite';
import { useTranslation } from 'react-i18next';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useStyles } from 'react-native-unistyles';

const fonts = {
  'FiraSans-Regular': require('../assets/fonts/FiraSans-Regular.ttf'),
  'FiraSans-SemiBold': require('../assets/fonts/FiraSans-SemiBold.ttf'),
  'FiraSans-Bold': require('../assets/fonts/FiraSans-Bold.ttf'),
};

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export function InitialLayout() {
  const { t } = useTranslation();
  const { user, authenticationStatus, signOut, error: authError } = useAuth();
  const { theme } = useStyles();
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
      // const tokens = authStorage.getItem('tokens') || null;
      // const inMainGroup = segments[0] === '(tabs)';
      // if (tokens) {
      //   router.replace('/(tabs)');
      // }
      //
      // if (!tokens && inMainGroup) {
      //   router.replace('/(tabs)');
      // }
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

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <ErrorNotification errorMessage={fontLoadingError?.message || authError?.message} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            title: 'Onboarding',
            headerShown: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="new"
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
            title: t('transactions.create-transaction'),
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
      <NetConnectionIndicator />
    </>
  );
}

function RootLayoutNav() {
  const migrateDbIfNeeded = async (db: SQLiteDatabase) => {
    try {
      await new DbMigrationRunnerService(db).apply(migrations);
      console.log('All migrations applied.');
    } catch (err) {
      console.error('Error applying migrations:', err);
    }
  };

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
            onInit={migrateDbIfNeeded}
            useSuspense
          >
            <KeyboardProvider>
              <InitialLayout />
            </KeyboardProvider>
          </SQLiteProvider>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default RootLayoutNav;
