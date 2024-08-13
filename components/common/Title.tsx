import React, { PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native-ui-lib';

type TitleProps = {
  text: string;
};

export const Title = ({
  text,
  children,
  style,
  ...props
}: PropsWithChildren<TextProps & TitleProps>) => {
  return (
    <Text h3 style={style} {...props}>
      {text || children}
    </Text>
  );
};
