import { Colors } from '../tokens';
import { useEffect, useState } from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export interface ErrorNotificationProps {
  error?: string;
}

export function ErrorNotification({ error }: ErrorNotificationProps) {
  const [isShown, setIsShown] = useState<boolean>(false);
  const animatedValue = useSharedValue(-100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedValue.value }],
    };
  });

  const onEnter = () => {
    animatedValue.value = withTiming(0, { duration: 300 });
  };

  useEffect(() => {
    if (!error) {
      return;
    }
    setIsShown(true);

    const timerId = setTimeout(() => {
      setIsShown(false);
      animatedValue.value = withTiming(-100, { duration: 300 });
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  if (!isShown) {
    return <></>;
  }

  return (
    <Animated.View style={[styles.error, animatedStyle]} onLayout={onEnter}>
      <Text className="font-firaReg text-[16px] text-white text-center">{error}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    backgroundColor: Colors.primary,
    padding: 15,
    top: 50,
  },
});
