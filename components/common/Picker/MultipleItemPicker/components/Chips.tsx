import { useMultiplePickerContext } from '../../context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { View, Text, FlatList, ScrollView, Pressable } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const CHIP_HEIGHT = 40;

export const Chips = () => {
  const { selectedItems, deselectItem } = useMultiplePickerContext();
  const { styles, theme } = useStyles(stylesheets);

  if (!selectedItems.length) {
    return null;
  }

  return (
    <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
      <FlatList
        data={selectedItems}
        contentContainerStyle={styles.chipList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.chip} key={item.label}>
            <Text style={styles.text}>{item.label}</Text>
            <Pressable
              onPress={() => {
                deselectItem(item);
              }}
              hitSlop={theme.spacing.m}
              style={{
                padding: theme.spacing.s,
              }}
            >
              <AntDesign name="close" size={14} color="white" />
            </Pressable>
          </View>
        )}
        numColumns={3}
      />
    </ScrollView>
  );
};

export const stylesheets = createStyleSheet((theme) => ({
  container: {
    maxHeight: (CHIP_HEIGHT + theme.spacing.s) * 3,
    width: '100%',
  },
  chip: {
    height: 40,
    marginHorizontal: theme.spacing.xs,
    alignItems: 'center',
    backgroundColor: theme.colors.accent,
    borderRadius: 20,
    paddingHorizontal: theme.spacing.s,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chipList: {
    marginVertical: theme.spacing.m,
    gap: theme.spacing.s,
  },
  text: {
    ...theme.defaultStyles.text,
    color: theme.colors.background,
  },
}));
