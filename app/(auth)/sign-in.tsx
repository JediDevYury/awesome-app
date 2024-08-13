import { router } from 'expo-router';
import { View, Text } from 'react-native-ui-lib';

import { Button, CustomLink, Input, Title } from '@/components/common';
import { useAuth } from '@/providers';
import React, { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn(email, password);

      router.replace('/');
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  return (
    <View flex paddingH-4 centerV centerH gap-10>
      <Title text="Welcome to Awesome App!" />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input isPassword placeholder="Password" value={password} onChangeText={setPassword} />
      <Button text="Sign In" onPress={handleSignIn} />
      <Text regular>
        Don't have an account? <CustomLink href={'/sign-up'} text={'Sign Up'} />
      </Text>
    </View>
  );
}
