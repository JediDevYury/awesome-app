import { PropsWithChildren } from 'react';
import { ViewStyle, View, ViewProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type CardProps = PropsWithChildren<{
  style?: ViewStyle;
  className?: string;
}>;

export function Card({ children, style = {}, ...props }: CardProps & ViewProps) {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  card: {
    padding: theme.spacing.l,
    borderRadius: theme.radius.l,
    backgroundColor: theme.colors.white,
    elevation: 6,
    shadowColor: theme.colors.active,
    shadowRadius: 6,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.15,
  },
}));
