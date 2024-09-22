import { Button, Clipboard, Title } from '@/components/common';
import QRCodeScreen from '@/components/common/QRCodeScreen';
import { useAuth } from '@/providers';
import { authStorage } from '@/storage/auth.storage';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { createStyleSheet, useStyles, UnistylesRuntime } from 'react-native-unistyles';

const CELL_COUNT = 6;

export default function Verification() {
  const { verification, reset2fa, verify2fa } = useAuth();
  const router = useRouter();
  const isActiveUser = verification && !verification['qrCode'];

  const { styles } = useStyles(stylesheet);
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  const handleReset2fa = async () => {
    if (!verification?.email) return;

    await reset2fa(verification?.email);

    router.push('/sign-in');
  };

  const handleVerify2fa = async () => {
    if (!verification?.email) return;

    const response = await verify2fa(verification?.email, code);

    if (!response) return;

    authStorage.setItem('tokens', response?.data);
    router.replace('/(main)/(tabs)/transactions');
  };

  useEffect(() => {
    if (code.length !== CELL_COUNT) return;
    handleVerify2fa();
  }, [code]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Title
            style={{
              marginTop: 20,
            }}
            text="Verification"
          />
          <Link style={styles.arrowBackIcon} href={'/(auth)/sign-in'} asChild replace>
            <FontAwesome name="chevron-left" size={24} color="black" />
          </Link>
        </View>
        <View style={styles.bodyWrapper}>
          <Text style={styles.description}>
            Please enter the 6-digit verification code from Google Authenticator (or any other OTP
            Authenticator app):
          </Text>
          <CodeField
            ref={ref}
            {...props}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}
              >
                <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
              </View>
            )}
          />
          <View style={styles.controlsWrapper}>
            {isActiveUser ? (
              <Button text={'Reset to step verification'} onPress={handleReset2fa} />
            ) : (
              <>
                <QRCodeScreen width={150} height={150} uri={verification?.qrCode} />
                <Clipboard text={verification?.otpSecret} />
              </>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingTop: UnistylesRuntime.insets.top,
    paddingBottom: UnistylesRuntime.insets.bottom,
    flex: 1,
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.background,
    gap: theme.spacing.m,
  },
  bodyWrapper: {
    flexDirection: 'column',
    marginTop: 20,
    gap: theme.spacing.m,
  },
  controlsWrapper: {
    gap: theme.spacing.m,
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    ...theme.defaultStyles.text,
    paddingHorizontal: theme.spacing.s,
  },
  codeFieldRoot: {
    gap: theme.spacing.s,
  },
  cellRoot: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.black,
    borderRadius: theme.radius.m,
    backgroundColor: theme.colors.white,
  },
  cellText: {
    ...theme.defaultStyles.text,
    fontSize: 32,
    color: theme.colors.black,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: theme.colors.black,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
  },
  arrowBackIcon: {
    position: 'absolute',
    top: 24,
    left: 0,
  },
}));
