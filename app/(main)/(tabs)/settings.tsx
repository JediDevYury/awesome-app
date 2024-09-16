import { Button, SegmentedControl } from '@/components/common';
import HeaderBar from '@/components/common/HeaderBar';
import { useAuth } from '@/providers';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

// TODO: Add a segmented control into settings page for test

export default function Settings() {
  const { styles } = useStyles(stylesheet);
  const { signOut } = useAuth();
  const router = useRouter();
  const options = ['Income', 'Expense'];

  const [selectedOption, setSelectedOption] = useState('Income');

  const handleSignOut = async () => {
    await signOut();

    router.replace('/(auth)/sign-in');
  };

  return (
    <View style={styles.container}>
      <HeaderBar />
      <SegmentedControl
        selectedOption={selectedOption}
        options={options}
        onOptionPress={setSelectedOption}
      />
      <Button text="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    ...theme.defaultStyles.container,
    backgroundColor: theme.colors.background,
  },
  text: {
    color: theme.colors.typography,
  },
}));
