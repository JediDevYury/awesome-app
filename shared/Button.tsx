import { Colors, Radius } from './tokens';
import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  Text,
  StyleSheet,
  Platform,
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
        style={[
          styles.container,
          {
            backgroundColor: color,
          },
        ]}
      >
        {!isLoading && (
          <Text
            className="text-white font-firaSemibold text-[16px]"
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.text}
          >
            {text}
          </Text>
        )}
        {isLoading && <ActivityIndicator size="large" color={Colors.white} />}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    height: 36,
    borderRadius: Radius.medium,
  },
  text: {
    textAlignVertical: 'center',
    textAlign: 'center',
    marginBottom: Platform.select({
      ios: 0,
      android: 2,
    }),
  },
});
