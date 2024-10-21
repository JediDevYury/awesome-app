import { useSingleItemPickerContext } from '../../context';
import { ListItem } from './ListItem';
import { useScrollToIndex } from '@/hooks/useScrollToIndex';
import type { SelectItem } from '@/types';
import { FlatList, TouchableOpacity, View, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ListProps<Item> = {
  items: Item[];
};

export const List = <T extends SelectItem>({ items }: ListProps<T>) => {
  const { styles, theme } = useStyles(styleSheet);
  const { selectedItem, modalVisible: isModalVisible } = useSingleItemPickerContext();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const { flatListRef: ref } = useScrollToIndex(
    selectedItem ? selectedItem.value - 1 : 0,
    isModalVisible,
  );

  return (
    <FlatList
      ref={ref}
      data={items}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onViewableItemsChanged={({ viewableItems: vItems }) => {
        viewableItems.value = vItems;
      }}
      renderItem={({ item }) => {
        const isSelected = selectedItem?.value === item.value;

        return (
          <TouchableOpacity
            style={[
              styles.modalItem,
              isSelected && {
                backgroundColor: theme.colors.accent,
              },
            ]}
          >
            <ListItem
              key={item.value}
              selected={isSelected}
              item={item}
              viewableItems={viewableItems}
            />
          </TouchableOpacity>
        );
      }}
      showsVerticalScrollIndicator={false}
    />
  );
};

export const styleSheet = createStyleSheet((theme) => ({
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
  },
  modalItem: {
    padding: theme.spacing.s,
  },
}));
