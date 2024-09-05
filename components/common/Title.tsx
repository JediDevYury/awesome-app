import React, { PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type TitleProps = {
  text: string;
};

export const Title = ({
  text,
  children,
  style,
  ...props
}: PropsWithChildren<TextProps & TitleProps>) => {
  const { styles } = useStyles(stylesheet);

  return (
    <Text style={[styles.title, style]} {...props}>
      {text || children}
    </Text>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  title: {
    fontFamily: theme.typography.variant.bold,
    fontSize: theme.typography.size.xxl,
    color: theme.colors.typography,
  },
}));
