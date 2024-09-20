import { Clipboard, CustomLink, Title } from '@/components/common';
import QRCodeScreen from '@/components/common/QRCodeScreen';
import { qrcode } from '@/mocks/qrcode';
import { useState } from 'react';
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
  const { styles, theme } = useStyles(stylesheet);
  const [code, setCode] = useState('');
  const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Title
          style={{
            marginTop: 20,
          }}
          text={'Verification'}
        />
        <View
          style={{
            flexDirection: 'column',
            marginTop: 20,
            gap: theme.spacing.m,
          }}
        >
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
          <View
            style={{
              gap: theme.spacing.m,
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {qrcode ? (
              <>
                <QRCodeScreen width={150} height={150} uri={qrcode} />
                <Clipboard text="Default New" />
              </>
            ) : (
              <CustomLink href={'/'} text={'Reset two step verification'} />
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
    alignItems: 'center',
    gap: theme.spacing.m,
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
}));
