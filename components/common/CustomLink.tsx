import { Link } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';
import { Text } from 'react-native-ui-lib';

export function CustomLink({ text, ...props }: LinkProps & { text: string }) {
  return (
    <Link {...props}>
      <Text link>{text}</Text>
    </Link>
  );
}
