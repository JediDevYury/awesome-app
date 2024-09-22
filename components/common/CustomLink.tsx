import { Link, LinkProps } from 'expo-router';
import { Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export function CustomLink({ text, ...props }: LinkProps<string | object> & { text: string }) {
  const { styles } = useStyles(stylesheet);

  return (
    <Link style={styles.container} {...props} asChild>
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.gray,
    textDecorationLine: 'underline',
  },
}));
