import { useAuth } from '@/providers';

import { Text, View } from 'react-native';

export default function Main() {
  const { signOut } = useAuth();

  const onSignOut = () => {
    signOut();
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text onPress={onSignOut}>Sign Out</Text>
    </View>
  );
}
