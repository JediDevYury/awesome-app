import { Button } from './Button';
import * as ClipboardExpo from 'expo-clipboard';
import { useCallback, useEffect } from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ClipboardProps = {
  text: Partial<string>;
  styles?: ViewStyle;
};

export const Clipboard = ({ text, styles: customStyles }: ClipboardProps) => {
  const { styles } = useStyles(stylesheets);

  const copyToClipboard = async () => {
    await ClipboardExpo.getStringAsync();
  };

  const handleCopyToClipboard = useCallback(async () => {
    await ClipboardExpo.setStringAsync(text);
  }, []);

  const clearClipboard = useCallback(async () => {
    await ClipboardExpo.setStringAsync('');
  }, []);

  useEffect(() => {
    if (!text) return;
    handleCopyToClipboard();

    return () => {
      clearClipboard();
    };
  }, [text]);

  return (
    <View style={[styles.container, customStyles]}>
      <Button text="Click here to copy to Clipboard" onPress={copyToClipboard} />
      <View style={styles.textContainer}>
        <Text style={styles.copiedText}>{`Verification Secret: ${text}`}</Text>
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
