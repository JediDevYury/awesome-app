import { useMemo } from 'react';
import { Platform } from 'react-native';

export const usePlatform = () => {
  return useMemo(
    () => ({
      isAndroid: Platform.OS === 'android',
      isIOS: Platform.OS === 'ios',
      isWeb: Platform.OS === 'web',
    }),
    [],
  );
};
