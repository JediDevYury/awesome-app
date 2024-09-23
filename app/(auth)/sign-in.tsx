import { Button, CustomLink, Input, Title } from '@/components/common';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { signInFormSchema, type SignInFormSchema } from '@/forms/schemas';
import { useAuth } from '@/providers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function SignIn() {
  const { styles } = useStyles(stylesheet);
  const { t } = useTranslation();
  const router = useRouter();

  const { signIn, isLoading } = useAuth();
  const methods = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<SignInFormSchema> = async (formData) => {
    const { email, password } = formData;

    await signIn(email, password);
    router.push('/verification');
  };

  return (
    <>
      <View style={styles.container}>
        <LanguageSwitcher />
        <Title text={t('sign-in.title')} />
        <FormProvider {...methods}>
          <Controller
            name="email"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder={t('components.form.email')}
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
                placeholder={t('components.form.password')}
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
                isPassword
              />
            )}
          />

          <Button
            style={styles.submit}
            text={t('components.button.sign-in')}
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </FormProvider>
        <Text>
          {t('sign-in.no-account')}{' '}
          <CustomLink href={'/sign-up'} text={t('components.link.sign-up')} />
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
  submit: {
    marginTop: theme.spacing.xs,
  },
}));
