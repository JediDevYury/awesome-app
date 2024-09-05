import { EyeClosedIcon, EyeOpenedIcon } from '@/assets/icons';
import { useState } from 'react';
import {
  Pressable,
  View,
  TextInput,
  TextInputProps,
  Platform,
  StyleProp,
  TextStyle,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export function Input({
  isPassword,
  style,
  inputStyle,
  ...props
}: TextInputProps & { isPassword?: boolean; inputStyle?: StyleProp<TextStyle> }) {
  const { styles, theme } = useStyles(stylesheet);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View style={[styles.container, style]}>
      <TextInput
        secureTextEntry={isPassword && !isPasswordVisible}
        selectionColor={theme.colors.accent}
        placeholderTextColor={theme.colors.gray}
        style={[styles.input, inputStyle]}
        {...props}
      />
      {isPassword && (
        <Pressable
          style={styles.passwordIcon}
          onPress={() => setIsPasswordVisible((state) => !state)}
        >
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    position: 'relative',
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.s,
    height: 32,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: Platform.select({ ios: theme.spacing.s, android: 0 }),
    backgroundColor: theme.colors.white,
  },
  input: {
    fontFamily: theme.typography.variant.regular,
    fontSize: theme.typography.size.m,
    color: theme.colors.typography,
  },
  passwordIcon: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
