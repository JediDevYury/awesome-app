import { useRegisterUser } from '@/api/users';
import { Button, Input, CustomLink, Title } from '@/components/common';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text } from 'react-native-ui-lib';

export default function SignUp() {
  const { mutateAsync, isPending } = useRegisterUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await mutateAsync({ email, password });

      router.replace('/sign-in');
    } catch (err) {
      if (err instanceof Error) {
        throw err;
      }
    }
  };

  return (
    <View flex paddingH-4 centerV centerH gap-10>
      <Title text={'Registration Page'} />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Input isPassword placeholder="Password" value={password} onChangeText={setPassword} />
      <Button text="Sign Up" onPress={handleSignUp} isLoading={isPending} />
      <Text regular>
        Already have an account? <CustomLink href={'/sign-in'} text={'Sign In'} />
      </Text>
    </View>
  );
}
