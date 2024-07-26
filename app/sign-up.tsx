import { CustomLink } from '@/components';
import { auth } from '@/services/firebase';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

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
      <Text className="font-bold text-[--font-size-dynamic] mb-4">Registration Page</Text>
      <TextInput
        className="w-full p-2 my-2 border border-gray-300 rounded-md"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="w-full p-2 my-2 border border-gray-300 rounded-md"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Text>
        Already have an account? <CustomLink href={'/sign-in'} text={'Sign In'} />
      </Text>
    </View>
  );
}
