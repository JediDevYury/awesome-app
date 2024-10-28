import { Button } from '@/components/common/Button';
import { Image } from '@/components/common/Image';
import { useUserStore } from '@/store/userStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function OnboardingScreen() {
  const { styles, theme } = useStyles(stylesheets);
  const router = useRouter();
  const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);

  const handlePress = () => {
    toggleHasOnboarded();
    router.replace('/');
  };

  return (
    <LinearGradient
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      colors={[theme.colors.colorDarkRed, theme.colors.colorAppleRed, theme.colors.colorLimeRed]}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View>
        <Text style={styles.heading}>Welcome to Expenses Tracker!</Text>
        <Text style={styles.tagline}>
          Track, Save, Thrive – Your Finances Made Simple with Expenses Tracker!
        </Text>
      </View>
      <Image />
      <Button text="Let me go!" onPress={handlePress} />
    </LinearGradient>
  );
}

const stylesheets = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 24,
  },
  heading: {
    fontSize: 42,
    color: theme.colors.white,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontFamily: theme.typography.variant.regular,
    fontSize: 24,
    color: theme.colors.white,
    textAlign: 'center',
  },
}));
