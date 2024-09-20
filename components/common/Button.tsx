import {
  ActivityIndicator,
  GestureResponderEvent,
  Platform,
  Pressable,
  PressableProps,
  Text,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export function Button({
  text,
  isLoading,
  ...props
}: PressableProps & { text: string; isLoading?: boolean }) {
  const { styles, theme } = useStyles(stylesheet);
  const animatedValue = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animatedValue.value,
        [0, 100],
        [theme.colors.hover, theme.colors.accent],
      ),
    };
  });

  const fadeIn = (e: GestureResponderEvent) => {
    animatedValue.value = withTiming(0, { duration: 100 });
    props.onPressIn && props.onPressIn(e);
  };

  const fadeOut = (e: GestureResponderEvent) => {
    animatedValue.value = withTiming(100, { duration: 100 });
    props.onPressOut && props.onPressOut(e);
  };

  return (
    <Pressable {...props} onPressIn={fadeIn} onPressOut={fadeOut}>
      <Animated.View style={[styles.container, animatedStyle]}>
        {!isLoading && (
          <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
            {text}
          </Text>
        )}
        {isLoading && <ActivityIndicator size="small" color={theme.colors.white} />}
      </Animated.View>
    </Pressable>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.m,
    height: 36,
    borderRadius: theme.radius.s,
  },
  text: {
    fontFamily: theme.typography.variant.bold,
    color: theme.colors.white,
    ...Platform.select({
      android: {
        marginBottom: theme.spacing.xs / 2,
        paddingHorizontal: theme.spacing.s,
        fontSize: theme.typography.size.l,
      },
    }),
  },
}));
