/* eslint-disable react-native/no-raw-text */
import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { Typography, View } from 'react-native-ui-lib';

type AmountProps = PropsWithChildren<{
  color: string;
  amount: number;
}>;

export function Amount({ amount, children }: AmountProps) {
  return (
    <View row gap-6 centerV>
      {children}
      <AutoSizeText
        fontSize={24}
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

const styles = StyleSheet.create({
  amount: {
    ...Typography.bold,
    maxWidth: '80%',
  },
});
