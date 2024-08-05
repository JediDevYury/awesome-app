import { EyeClosedIcon, EyeOpenedIcon } from '@/assets/icons';
import { useState } from 'react';
import { Pressable, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { BorderRadiuses, Colors, View } from 'react-native-ui-lib';

export function Input({ isPassword, style, ...props }: TextInputProps & { isPassword?: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View padding-8 marginT-8 style={[styles.container, style]}>
      <TextInput
        secureTextEntry={isPassword && !isPasswordVisible}
        placeholderTextColor={Colors.neutral}
        {...props}
      />
      {isPassword && (
        <Pressable
          style={styles.passwordIcon}
          onPress={() => setIsPasswordVisible((state) => !state)}
        >
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '70%',
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.grey30,
    borderRadius: BorderRadiuses.br10,
  },
  passwordIcon: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
