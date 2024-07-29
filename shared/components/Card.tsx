import { Colors, Radius } from '../tokens';
import { PropsWithChildren } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface CardProps extends PropsWithChildren {
  style?: ViewStyle;
}

export default function Card({ children, style = {} }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: Radius.r15,
    backgroundColor: Colors.white,
    elevation: 8,
    shadowColor: Colors.black,
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
});
