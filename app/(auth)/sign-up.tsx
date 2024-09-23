import { Button, Input, CustomLink, Title } from '@/components/common';
import { type SignUpFormSchema, signUpFormSchema } from '@/forms/schemas';
import { useAuth } from '@/providers';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function SignUp() {
  const { t } = useTranslation();
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
        <Title text={t('sign-up.title')} />
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
          <Controller
            name="confirmPassword"
            control={methods.control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                placeholder={t('components.form.confirm-password')}
                value={value}
                onChangeText={onChange}
                errorMessage={error?.message}
                isPassword
              />
            )}
          />
          <Button
            text={t('components.button.sign-up')}
            onPress={methods.handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        </FormProvider>
        <Text>
          {t('sign-up.already-account')}{' '}
          <CustomLink href={'/'} text={t('components.link.sign-in')} />
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
