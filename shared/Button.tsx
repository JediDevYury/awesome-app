import {
  ActivityIndicator,
  Animated,
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';
import { Colors, BorderRadiuses, Text, Typography } from 'react-native-ui-lib';

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
          <Text style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>
            {text}
          </Text>
        )}
        {isLoading && <ActivityIndicator size="small" color={Colors.white} />}
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
    borderRadius: BorderRadiuses.br10,
  },
  buttonText: {
    ...Typography.button,
  },
});
