import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Text, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export type ErrorNotificationProps = {
  errorMessage?: string;
  clearError?: () => void;
};

export function ErrorNotification({ errorMessage, clearError }: ErrorNotificationProps) {
  const [isShown, setIsShown] = useState<boolean>(false);

  const { styles } = useStyles(stylesheet);
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedValue.value }],
    };
  });

  const onEnter = () => {
    animatedValue.value = withTiming(0, { duration: 300 });
  };

  useEffect(() => {
    if (!errorMessage) {
      setIsShown(false);
      return;
    }

    setIsShown(true);

    const timerId = setTimeout(() => {
      animatedValue.value = withTiming(-100, { duration: 300 });
      setIsShown(false);
      clearError?.();
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage]);

  if (!isShown) {
    return <></>;
  }

  return (
    <Animated.View style={[styles.error, animatedStyle]} onLayout={onEnter}>
      <Ionicons name="alert-circle-outline" size={24} color="white" />
      <Text style={styles.text}>{errorMessage}</Text>
    </Animated.View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  error: {
    position: 'absolute',
    top: 50,
    zIndex: 100,
    width: Dimensions.get('screen').width,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.s,
    justifyContent: 'center',
    backgroundColor: theme.colors.accent,
    padding: theme.spacing.m,
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.typography.size.l,
    fontFamily: theme.typography.variant.regular,
  },
}));
