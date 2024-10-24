import { InputManagerRef } from '../types';
import { MASKS } from './masks';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { TextInput, View, Text } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = {} & MaskInputProps;

export const PhoneMaskInput = forwardRef<InputManagerRef, Props>((props, ref) => {
  const [phone, setPhone] = useState('');
  const { styles, theme } = useStyles(stylesheet);
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current?.focus();
      },
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Phone: </Text>
      <MaskInput
        ref={inputRef}
        style={styles.input}
        value={phone}
        selectionColor={theme.colors.black}
        keyboardType={'phone-pad'}
        mask={MASKS.phone}
        maxLength={MASKS.phone.length}
        onSubmitEditing={props.onSubmitEditing}
        onChangeText={(masked) => {
          setPhone(masked);
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
