import { auth } from '@/services/firebase.service';
import { Button, Input, CustomLink, Title } from '@/shared';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text } from 'react-native';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      router.replace('/sign-in');
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4">
      <Title text={'Registration Page'} />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input isPassword placeholder="Password" value={password} onChangeText={setPassword} />
      <Button text="Sign Up" onPress={handleSignUp} />
      <Text className="mt-4">
        Already have an account? <CustomLink href={'/sign-in'} text={'Sign In'} />
      </Text>
    </View>
  );
}
