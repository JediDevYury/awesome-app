import React, { PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native';

type TitleProps = {
  text: string;
};

export const Title = ({
  className,
  text,
  children,
  ...props
}: PropsWithChildren<TextProps & TitleProps>) => {
  return (
    <Text className={className || 'font-firaSemibold text-2xl mb-4'} {...props}>
      {text || children}
    </Text>
  );
};
