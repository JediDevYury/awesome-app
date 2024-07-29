import { Colors } from '../tokens';
import { EyeClosedIcon, EyeOpenedIcon } from '@/assets/icons';
import { useState } from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';

export function Input({ isPassword, style, ...props }: TextInputProps & { isPassword?: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <View style={style} className="relative w-full p-2 my-2 border border-gray-300 rounded-md">
      <TextInput
        secureTextEntry={isPassword && !isPasswordVisible}
        placeholderTextColor={Colors.neutral200}
        {...props}
      />
      {isPassword && (
        <Pressable
          className="absolute right-0 top-0 bottom-0 flex items-center justify-center p-2"
          onPress={() => setIsPasswordVisible((state) => !state)}
        >
          {isPasswordVisible ? <EyeOpenedIcon /> : <EyeClosedIcon />}
        </Pressable>
      )}
    </View>
  );
}
