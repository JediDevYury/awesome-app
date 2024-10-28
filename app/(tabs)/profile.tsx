import { Button } from '@/components/common';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function ProfileScreen() {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Button text={'Go to Onboarding'} onPress={handlePress} />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
