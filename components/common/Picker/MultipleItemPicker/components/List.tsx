import { useMultiplePickerContext } from '../../context';
import { ListItem } from './ListItem';
import { useScrollToIndex } from '@/hooks/useScrollToIndex';
import type { SelectItem } from '@/types';
import { useCallback } from 'react';
import { FlatList, TouchableOpacity, View, ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ListProps<Items> = {
  items: Items;
};

export const List = <T extends SelectItem[]>({ items }: ListProps<T>) => {
  const { styles } = useStyles(styleSheet);
  const { selectedItems, modalVisible: isModalVisible } = useMultiplePickerContext();
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const { flatListRef: ref } = useScrollToIndex(
    selectedItems.length ? selectedItems[0].value - 1 : 0,
    isModalVisible,
  );

  const isSelected = useCallback(
    (item: SelectItem) => selectedItems.some((selectedItem) => selectedItem.value === item.value),
    [selectedItems],
  );

  return (
    <FlatList
      ref={ref}
      data={items}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onViewableItemsChanged={({ viewableItems: vItems }) => {
        viewableItems.value = vItems;
      }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.modalItem}>
          <ListItem
            key={item.value}
            selected={isSelected(item)}
            item={item}
            viewableItems={viewableItems}
          />
        </TouchableOpacity>
      )}
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
