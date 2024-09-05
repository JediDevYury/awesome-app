import { Ionicons } from '@expo/vector-icons';
import { useCallback, useRef, useState } from 'react';
import { ViewProps, TextInput, StyleSheet, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

type Props = ViewProps & {};

const HeaderBar = (props: Props) => {
  const { theme, styles } = useStyles(stylesheets);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInputHasFocus, setSearchInputHasFocus] = useState(false);

  const refSearchInput = useRef<TextInput>(null);

  const handleSearchInputFocus = () => {
    setSearchInputHasFocus(true);
  };

  const handleSearchInputBlur = () => {
    setSearchInputHasFocus(false);
  };

  const handleLeftButtonPress = useCallback(() => {
    const { current: input } = refSearchInput;

    if (searchInputHasFocus && input) {
      input.blur();
      setSearchQuery('');
      return;
    }

    input?.focus();
    setSearchInputHasFocus(true);
  }, [searchInputHasFocus]);

  const handleClearButtonPress = () => {
    setSearchQuery('');
  };

  const emptyBoxStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(searchInputHasFocus ? 1 : 0, {
        duration: 400,
      }),
    };
  }, [searchInputHasFocus]);

  const barStyle = useAnimatedStyle(() => {
    return {
      marginHorizontal: withTiming(searchInputHasFocus ? 0 : 20),
      borderRadius: withTiming(searchInputHasFocus ? 0 : 64, {
        duration: 400,
      }),
      backgroundColor: withTiming(searchInputHasFocus ? theme.colors.accent : theme.colors.white),
    };
  }, [searchInputHasFocus]);

  return (
    <Animated.View style={StyleSheet.absoluteFillObject} {...props}>
      <Animated.View style={[styles.emptySpaceBox, emptyBoxStyle]} />
      <Animated.View style={[styles.searchContainer, barStyle]}>
        <Pressable style={styles.button} onPress={handleLeftButtonPress}>
          {searchInputHasFocus ? (
            <Ionicons color={theme.colors.white} name="arrow-back" size={22} />
          ) : (
            <Ionicons name="search" size={22} color={theme.colors.accent} />
          )}
        </Pressable>
        <TextInput
          ref={refSearchInput}
          autoCapitalize="none"
          placeholder={!searchInputHasFocus ? 'Search' : ''}
          placeholderTextColor={theme.colors.accent}
          value={searchQuery}
          onFocus={handleSearchInputFocus}
          onBlur={handleSearchInputBlur}
          onChangeText={setSearchQuery}
          selectionColor={searchInputHasFocus ? theme.colors.white : theme.colors.accent}
          style={styles.search}
        />
        {searchQuery.length > 0 && (
          <Pressable style={styles.button} onPress={handleClearButtonPress}>
            <Ionicons color={theme.colors.white} name="close" size={22} />
          </Pressable>
        )}
      </Animated.View>
    </Animated.View>
  );
};

export const stylesheets = createStyleSheet((theme) => ({
  emptySpaceBox: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.accent,
    paddingTop: UnistylesRuntime.insets.top,
    height: UnistylesRuntime.insets.top + 44,
  },
  searchContainer: {
    borderColor: theme.colors.accent,
    borderWidth: 2,
    marginVertical: UnistylesRuntime.insets.top,
    paddingHorizontal: theme.spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    backgroundColor: theme.colors.white,
  },
  search: {
    flex: 1,
    fontFamily: theme.typography.variant.regular,
    fontSize: theme.typography.size.l,
    color: theme.colors.white,
  },
  searchIcon: {
    position: 'absolute',
    left: theme.spacing.s,
  },
  button: {
    margin: theme.spacing.xs,
    padding: theme.spacing.xs,
  },
}));

export default HeaderBar;
