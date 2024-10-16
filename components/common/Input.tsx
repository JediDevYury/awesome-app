import { EyeClosedIcon, EyeOpenedIcon } from '@/assets/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  View,
  TextInput,
  TextInputProps,
  Platform,
  StyleProp,
  TextStyle,
  Text,
} from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type InputProps = TextInputProps & {
  errorMessage?: string;
  isPassword?: boolean;
  inputStyle?: StyleProp<TextStyle>;
};

export function Input({ isPassword, style, inputStyle, errorMessage, ...props }: InputProps) {
  const { t } = useTranslation();
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
      {errorMessage && <Text style={styles.errorMessage}>{t(errorMessage)}</Text>}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.s,
    paddingVertical: Platform.select({ ios: theme.spacing.s, android: 0 }),
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    borderWidth: 1,
    borderColor: theme.colors.accent,
    borderRadius: theme.radius.s,
    height: 36,
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
  errorMessage: {
    position: 'absolute',
    bottom: -18,
    left: theme.spacing.s,
    color: theme.colors.active,
    fontSize: theme.typography.size.s,
    fontFamily: theme.typography.variant.regular,
    alignSelf: 'flex-start',
  },
}));
