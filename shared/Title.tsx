import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps, Typography } from 'react-native-ui-lib';

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
    <Text style={[styles.title, style]} {...props}>
      {text || children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Typography.h3,
  },
});
