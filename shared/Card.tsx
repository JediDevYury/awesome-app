import { Colors, Radius } from './tokens';
import { PropsWithChildren } from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface CardProps extends PropsWithChildren {
  style?: ViewStyle;
  className?: string;
}

export function Card({ children, className, style = {} }: CardProps) {
  return (
    <View className={className} style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: Radius.extraLarge,
    backgroundColor: Colors.white,
    elevation: 8,
    shadowColor: Colors.black,
    shadowRadius: 8,
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.15,
  },
});
