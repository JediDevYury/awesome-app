import { DATE_DDMMYYYY } from './masks';
import React, { forwardRef, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type Props = {} & MaskInputProps;

export const MaskedDateInput = forwardRef<TextInput, Props>((props, ref) => {
  const [date, setDate] = useState('');
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date: </Text>
      <MaskInput
        ref={ref}
        style={styles.input}
        value={date}
        mask={DATE_DDMMYYYY}
        keyboardType={'numeric'}
        maxLength={10}
        selectionColor={theme.colors.black}
        onSubmitEditing={props.onSubmitEditing}
        onChangeText={(masked) => {
          setDate(masked);
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
