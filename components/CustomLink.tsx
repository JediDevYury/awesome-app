import { Link } from 'expo-router';
import { LinkProps } from 'expo-router/build/link/Link';
import { Text } from 'react-native';

export function CustomLink({ text, ...props }: LinkProps & { text: string }) {
  return (
    <Link className="text-[--font-size-dynamic] text-gray-500" {...props}>
      <Text>{text}</Text>
    </Link>
  );
}
