import { Colors } from '@/shared';
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
} from 'react-native';

export function Button({
  text,
  isLoading,
  ...props
}: PressableProps & { text: string; isLoading?: boolean }) {
  const animatedValue = new Animated.Value(100);
  const color = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [Colors.primaryHover, Colors.primary],
  });

  const fadeIn = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    props.onPressIn && props.onPressIn(e);
  };

  const fadeOut = (e: GestureResponderEvent) => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 100,
      useNativeDriver: false,
    }).start();
    props.onPressOut && props.onPressOut(e);
  };

  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View
        className="justify-center items-center h-12 rounded-md px-4"
        style={{ backgroundColor: color }}
      >
        {!isLoading && <Text className="text-white text-lg font-firaSemibold">{text}</Text>}
        {isLoading && <ActivityIndicator size="large" color={Colors.white} />}
      </Animated.View>
    </Pressable>
  );
}
