import { useSingleItemPickerContext } from '../../context';
import type { SelectItem } from '@/types';
import { memo, useCallback, useState } from 'react';
import { Pressable, Text, ViewToken } from 'react-native';
import Animated, { DerivedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ListItemProps = {
  viewableItems: DerivedValue<ViewToken[]>;
  item: SelectItem;
  selected: boolean;
};

export const ListItem = memo(({ selected, item, viewableItems }: ListItemProps) => {
  const context = useSingleItemPickerContext();

  const [isSelected, setIsSelected] = useState(selected);

  const { styles } = useStyles(listStyleSheets);

  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.value === item.value),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isVisible ? 1 : 0.6),
        },
      ],
    };
  }, []);

  const handleCheckboxClick = useCallback(() => {
    if (!isSelected) {
      context.selectItem(item);
    } else {
      context.deselectItem(item);
    }

    setIsSelected(!isSelected);

    context.hideModal();
  }, [isSelected, item]);

  return (
    <Animated.View style={[styles.listItem, rStyle]}>
      <Pressable style={styles.selectedItem} onPress={handleCheckboxClick} hitSlop={10}>
        <Text
          style={styles.text({
            selected: isSelected,
          })}
        >
          {item.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
});

const listStyleSheets = createStyleSheet((theme) => {
  return {
    listItem: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: theme.radius.l,
    },
    text: ({ selected }: { selected: boolean }) => ({
      fontFamily: theme.typography.variant.semiBold,
      fontSize: theme.typography.size.l,
      color: selected ? theme.colors.white : theme.colors.black,
    }),
    selectedItem: {
      width: '100%',
    },
  };
});
