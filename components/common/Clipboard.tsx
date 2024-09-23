import { Button } from './Button';
import * as ClipboardExpo from 'expo-clipboard';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ClipboardProps = {
  text: string | undefined;
  styles?: ViewStyle;
};

export const Clipboard = ({ text, styles: customStyles }: ClipboardProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheets);

  const copyToClipboard = async () => {
    await ClipboardExpo.getStringAsync();
  };

  const handleCopyToClipboard = useCallback(async () => {
    if (!text) return;
    await ClipboardExpo.setStringAsync(text);
  }, []);

  const clearClipboard = useCallback(async () => {
    await ClipboardExpo.setStringAsync('');
  }, []);

  useEffect(() => {
    handleCopyToClipboard();

    return () => {
      clearClipboard();
    };
  }, [text]);

  return (
    <View style={[styles.container, customStyles]}>
      <Button text={t('components.button.copy-to-clipboard')} onPress={copyToClipboard} />
      <View style={styles.textContainer}>
        <Text style={styles.copiedText}>{`${t('verification.secret')}: ${text}`}</Text>
      </View>
    </View>
  );
};

const stylesheets = createStyleSheet((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    marginTop: theme.spacing.s,
    padding: theme.spacing.xs,
    borderRadius: theme.radius.s,
    backgroundColor: theme.colors.disabled,
  },
  copiedText: {
    ...theme.defaultStyles.text,
    color: theme.colors.black,
  },
}));
