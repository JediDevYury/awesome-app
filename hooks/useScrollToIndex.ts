import { useEffect, useRef } from 'react';
import { FlatList } from 'react-native';

export const useScrollToIndex = (index: number, isModalVisible: boolean) => {
  const flatListRef = useRef<FlatList>(null);

  const scrollToSelectedItem = () => {
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index,
          animated: true,
          viewPosition: 0.5,
        });
      }
    }, 500);
  };

  useEffect(() => {
    if (!isModalVisible) {
      return;
    }

    scrollToSelectedItem();
  }, [isModalVisible]);

  return {
    flatListRef,
  };
};
