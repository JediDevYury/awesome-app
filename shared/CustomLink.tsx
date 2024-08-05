import { Link } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';
import { Text, StyleSheet } from 'react-native';
import { Typography } from 'react-native-ui-lib';

export function CustomLink({ text, ...props }: LinkProps & { text: string }) {
  return (
    <Link style={styles.link} {...props}>
      <Text>{text}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  link: {
    ...Typography.link,
  },
});
