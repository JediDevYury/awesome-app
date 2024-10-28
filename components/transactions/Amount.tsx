/* eslint-disable react-native/no-raw-text */
import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type AmountProps = PropsWithChildren<{
  color: string;
  amount: number;
}>;

export function Amount({ amount, children }: AmountProps) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.amount}>
      {children}
      <AutoSizeText
        fontSize={theme.typography.size.xl}
        adjustsFontSizeToFit
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={styles.amount}
      >
        ${amount}
      </AutoSizeText>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    fontFamily: theme.typography.variant.bold,
    fontSize: theme.typography.size.m,
    maxWidth: '80%',
  },
}));
