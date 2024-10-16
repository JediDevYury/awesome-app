import { Ionicons } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';
import { Text, Dimensions, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

export function NetConnectionIndicator() {
  const [isShown, setIsShown] = useState<boolean>(false);
  const { isConnected } = useNetInfo();

  const { styles } = useStyles(stylesheet);
  const animatedValue = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedValue.value }],
    };
  });

  useEffect(() => {
    if (isConnected !== null) {
      setIsShown(true);

      animatedValue.value = withTiming(0, { duration: 500 });

      const timerId = setTimeout(() => {
        animatedValue.value = withTiming(100, { duration: 500 }, () => {
          runOnJS(setIsShown)(false);
        });
      }, 3000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [isConnected]);

  if (!isShown) {
    return null;
  }

  return (
    <Animated.View style={[styles.notification(Boolean(isConnected)), animatedStyle]}>
      <Ionicons name="alert-circle-outline" size={24} color="white" />
      {!isConnected ? (
        <Text style={styles.text}>You are offline</Text>
      ) : (
        <Text style={styles.text}>You are online</Text>
      )}
    </Animated.View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  notification: (isConnected: boolean) => ({
    position: 'absolute',
    bottom: Platform.select({ ios: 0, android: UnistylesRuntime.insets.bottom }),
    zIndex: 100,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
    justifyContent: 'center',
    padding: theme.spacing.m,
    height: Platform.select({ ios: 80 }),
    backgroundColor: isConnected ? theme.colors.green : theme.colors.accent,
  }),
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.size.l,
    fontFamily: theme.typography.variant.regular,
  },
}));
