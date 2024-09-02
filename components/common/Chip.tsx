import { CategoryEmojies } from '@/shared';
import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ChipProps = {
  label: string;
  color?: string;
  emoji?: string;
};

export const Chip = ({ color, label, style, ...props }: ChipProps & TouchableOpacityProps) => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }, style]}
      activeOpacity={0.7}
      {...props}
    >
      {props.emoji && (
        <Text style={styles.categoryEmoji} numberOfLines={2}>
          {CategoryEmojies[label] || CategoryEmojies['default']}
        </Text>
      )}
      <AutoSizeText
        minFontSize={theme.typography.size.s}
        fontSize={theme.typography.size.m}
        numberOfLines={2}
        adjustsFontSizeToFit
        mode={ResizeTextMode.min_font_size}
        style={styles.text}
      >
        {label}
      </AutoSizeText>
    </TouchableOpacity>
  );
};

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.s,
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.gray,
    borderRadius: theme.radius.m,
    height: 40,
  },
  categoryEmoji: {
    fontSize: theme.typography.size.l,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: theme.colors.typography,
    fontFamily: theme.typography.variant.semiBold,
    maxWidth: '80%',
  },
}));
