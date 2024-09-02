import React, { memo } from 'react';
import { View, useWindowDimensions, TouchableOpacity, Platform } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type SegmentedControlProps = {
  options: string[];
  selectedOption: string;
  onOptionPress?: (option: string) => void;
};

type SegmentedControlOptionProps = {
  option: string;
  isSelected: boolean;
  itemWidth: number;
  onPress: (option: string) => void;
};

const SegmentedControlOption = memo(
  ({ option, isSelected, itemWidth, onPress }: SegmentedControlOptionProps) => {
    const { styles, theme } = useStyles(segmentedOptionStylesheet);

    const animatedTextStyle = useAnimatedStyle(() => {
      return {
        color: withTiming(isSelected ? theme.colors.accent : theme.colors.white),
      };
    }, [isSelected]);

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onPress(option)}
        style={styles.option({ itemWidth })}
      >
        <Animated.Text style={[styles.text, animatedTextStyle]}>{option}</Animated.Text>
      </TouchableOpacity>
    );
  },
);

const segmentedOptionStylesheet = createStyleSheet((theme) => ({
  option: ({ itemWidth }: { itemWidth: number }) => ({
    width: itemWidth,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        marginBottom: 2,
      },
    }),
  }),
  text: {
    color: theme.colors.white,
    fontFamily: theme.typography.variant.semiBold,
    fontSize: theme.typography.size.l,
  },
}));

export const SegmentedControl = memo(
  ({ options, selectedOption, onOptionPress }: SegmentedControlProps) => {
    const internalPadding = 20;
    const { width: windowWidth } = useWindowDimensions();
    const segmentedControlWidth = windowWidth - 40;
    const itemWidth = (segmentedControlWidth - internalPadding) / options.length;

    const { styles } = useStyles(stylesheet);

    const animatedViewStyle = useAnimatedStyle(() => {
      return {
        left: withTiming(itemWidth * options.indexOf(selectedOption) + internalPadding / 2),
      };
    }, [selectedOption, options, itemWidth]);

    const handleOptionPress = (option: string) => onOptionPress?.(option);

    return (
      <View
        style={styles.container({
          width: windowWidth - 40,
          paddingLeft: internalPadding / 2,
        })}
      >
        <Animated.View
          style={[
            styles.selectedOption({ itemWidth, index: options.indexOf(selectedOption) }),
            animatedViewStyle,
          ]}
        />
        {options.map((option) => (
          <SegmentedControlOption
            key={option}
            option={option}
            isSelected={option === selectedOption}
            itemWidth={itemWidth}
            onPress={handleOptionPress}
          />
        ))}
      </View>
    );
  },
);

const stylesheet = createStyleSheet((theme) => ({
  container: ({ width, paddingLeft }: { width: number; paddingLeft: number }) => ({
    paddingLeft,
    flexDirection: 'row',
    height: 40,
    width,
    backgroundColor: theme.colors.accent,
    borderRadius: theme.radius.m,
  }),
  selectedOption: ({ itemWidth, index }: { itemWidth: number; index: number }) => ({
    position: 'absolute',
    top: '10%',
    left: itemWidth * index,
    width: itemWidth,
    height: '80%',
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.background,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    elevation: 3,
  }),
}));
