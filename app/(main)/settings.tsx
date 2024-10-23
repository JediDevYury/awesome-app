import { Button } from '@/components/common';
import {
  PhoneMaskInput,
  CreditCardMaskInput,
  CurrencyMaskInput,
  MaskedDateInput,
} from '@/components/common/MaskedInput/examples';
import { InputManagerRef } from '@/components/common/MaskedInput/types';
import { hiqoTheme } from '@/configs/theme';
import { useEffect, useRef, useState } from 'react';
import { TextInput, Keyboard } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
  KeyboardToolbarProps,
  DefaultKeyboardToolbarTheme,
  KeyboardEvents,
} from 'react-native-keyboard-controller';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

const theme: KeyboardToolbarProps['theme'] = {
  ...DefaultKeyboardToolbarTheme,
  dark: {
    ...DefaultKeyboardToolbarTheme.dark,
    primary: hiqoTheme.colors.accent,
  },
  light: {
    ...DefaultKeyboardToolbarTheme.light,
    primary: hiqoTheme.colors.accent,
  },
};

export default function Settings() {
  const { styles } = useStyles(settingsStylesheet);

  const inputManagerRef = useRef<InputManagerRef>(null);
  const [keyboardStatus, setKeyboardStatus] = useState('Default');

  const handleSignOut = async () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (inputManagerRef) {
      inputManagerRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const showSubscription = KeyboardEvents.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Did Shown');
    });

    const hideSubscription = KeyboardEvents.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Did Hide');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.container}
        bottomOffset={62}
      >
        <TextInput style={styles.label}>{keyboardStatus}</TextInput>
        <PhoneMaskInput ref={inputManagerRef} />
        <CreditCardMaskInput />
        <CurrencyMaskInput />
        <MaskedDateInput />
        <Button style={styles.button} text={'Sign Out'} onPress={handleSignOut} />
      </KeyboardAwareScrollView>
      <KeyboardToolbar doneText={'OK'} theme={theme} />
    </>
  );
}

const settingsStylesheet = createStyleSheet((theme) => ({
  container: {
    paddingTop: theme.spacing.m + UnistylesRuntime.insets.top,
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.m,
  },
  button: {
    marginTop: theme.spacing.l,
  },
  text: {
    color: theme.colors.typography,
  },
  label: {
    paddingVertical: theme.spacing.s,
    fontSize: 16,
    color: theme.colors.black,
  },
}));
