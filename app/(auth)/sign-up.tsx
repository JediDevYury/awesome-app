import { Button, Input, CustomLink, Title } from '@/components/common';
import { type SignUpFormSchema, signUpFormSchema } from '@/forms/schemas';
import { useAuth } from '@/providers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function SignUp() {
  const { createUser, isLoading } = useAuth();
  const router = useRouter();

  const { styles } = useStyles(stylesheet);

  const methods = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignUpFormSchema> = async (formData) => {
    await createUser(formData.email, formData.password);

    router.push('/verification');
  };

  return (
    <>
      <View style={styles.container}>
        <Title text="Registration Page" />
        <FormProvider {...methods}>
          <Controller
            name="email"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
                isPassword
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
                isPassword
              />
            )}
          />
          <Button text="Sign Up" onPress={methods.handleSubmit(onSubmit)} isLoading={isLoading} />
        </FormProvider>
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
