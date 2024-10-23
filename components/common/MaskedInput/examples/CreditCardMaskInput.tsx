import { MASKS } from './masks';
import { forwardRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = {} & MaskInputProps;

export const CreditCardMaskInput = forwardRef<TextInput, Props>((props, ref) => {
  const [creditCard, setCreditCard] = useState('');

  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Credit Card: </Text>
      <MaskInput
        ref={ref}
        style={styles.input}
        value={creditCard}
        mask={MASKS.creditCard}
        selectionColor={theme.colors.black}
        showObfuscatedValue
        obfuscationCharacter="-"
        maxLength={MASKS.creditCard.length}
        keyboardType="numeric"
        onChangeText={(unmasked) => {
          setCreditCard(unmasked);
        }}
        onSubmitEditing={props.onSubmitEditing}
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
