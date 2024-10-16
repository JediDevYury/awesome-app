import { Button } from '@/components/common';
import { useAuth } from '@/providers';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

export default function Settings() {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheet);
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();

    router.replace('/(auth)/sign-in');
  };

  return (
    <View style={styles.container}>
      <Button text={t('components.button.sign-out')} onPress={handleSignOut} />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    paddingHorizontal: theme.spacing.m,
    paddingTop: UnistylesRuntime.insets.top * 2,
    ...theme.defaultStyles.container,
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.typography,
  },
}));
