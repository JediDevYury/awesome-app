/* eslint-disable react-native/no-raw-text */
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

type AmountProps = {
  iconName: 'remove-circle' | 'add-circle';
  color: string;
  amount: number;
};

export function Amount({ iconName, color, amount }: AmountProps) {
  return (
    <View className="flex-row items-center gap-1.5">
      <Ionicons color={color} name={iconName} size={18} style={styles.icon} allowFontScaling />
      <AutoSizeText
        fontSize={24}
        adjustsFontSizeToFit
        mode={ResizeTextMode.max_lines}
        numberOfLines={1}
        style={styles.amount}
      >
        ${amount}
      </AutoSizeText>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    fontFamily: 'FiraSans-Bold',
    maxWidth: '80%',
  },
  icon: {
    paddingRight: 4,
    marginTop: Platform.select({ ios: 0, android: 4 }),
  },
});
