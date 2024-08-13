import { PropsWithChildren } from 'react';
import { ViewStyle, StyleSheet } from 'react-native';
import { Colors, BorderRadiuses, View, ViewProps } from 'react-native-ui-lib';

type CardProps = PropsWithChildren<{
  style?: ViewStyle;
  className?: string;
}>;

export function Card({ children, style = {}, ...props }: CardProps & ViewProps) {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: BorderRadiuses.br20,
    backgroundColor: Colors.white,
    elevation: 8,
    shadowColor: Colors.black,
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
});
