import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { Button, CustomLink, Input } from '@/components';
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
    <View className="flex-1 justify-center items-center px-4">
      <Text className="font-firaSemibold text-2xl mb-4">Welcome to Awesome App!</Text>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input isPassword placeholder="Password" value={password} onChangeText={setPassword} />
      <Button text="Sign In" onPress={handleSignIn} />
      <Text className="mt-4">
        Don't have an account? <CustomLink href={'/sign-up'} text={'Sign Up'} />
      </Text>
    </View>
  );
}
