import { useRegisterUser } from '@/api/users';
import { Button, Input, CustomLink, Title } from '@/components/common';
import { ErrorNotification } from '@/components/common/ErrorNotification';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function SignUp() {
  const router = useRouter();
  const { mutate, isPending, isSuccess, error } = useRegisterUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { styles } = useStyles(stylesheet);

  const handleSignUp = () => {
    mutate({ email, password });
  };

  useEffect(() => {
    if (!isSuccess) {
      return;
    }

    router.replace('/');
  }, [isSuccess]);

  return (
    <>
      <ErrorNotification errorMessage={error?.message} />
      <View style={styles.container}>
        <Title text="Registration Page" />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input isPassword placeholder="Password" value={password} onChangeText={setPassword} />
        <Button text="Sign Up" onPress={handleSignUp} isLoading={isPending} />
        <Text>
          Already have an account? <CustomLink href={'/'} text={'Sign In'} />
        </Text>
      </View>
    </>
  );
}

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    ...theme.defaultStyles.container,
    paddingHorizontal: theme.spacing.m,
    gap: theme.spacing.m,
  },
}));
