import { forwardRef, useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import MaskInput, { createNumberMask, MaskInputProps } from 'react-native-mask-input';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const prefix = '$';

const dollarMask = createNumberMask({
  prefix: [prefix],
  delimiter: '.',
  separator: ',',
  precision: 2,
});

type Props = {} & MaskInputProps;

export const CurrencyMaskInput = forwardRef<TextInput, Props>((props, ref) => {
  const { styles, theme } = useStyles(stylesheet);
  const [money, setMoney] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Money Amount: </Text>
      <MaskInput
        ref={ref}
        style={styles.input}
        value={money}
        mask={dollarMask}
        keyboardType="numeric"
        placeholder={`${prefix}000.000.000,00`}
        maxLength={15}
        selectionColor={theme.colors.black}
        onSubmitEditing={props.onSubmitEditing}
        onChangeText={(unmasked) => {
          setMoney(unmasked);
        }}
      />
    </View>
  );
});

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: '100%',
  },
  label: {
    paddingVertical: theme.spacing.s,
    fontSize: 16,
    color: theme.colors.gray,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.m,
    padding: theme.spacing.s,
    fontSize: 24,
  },
}));
