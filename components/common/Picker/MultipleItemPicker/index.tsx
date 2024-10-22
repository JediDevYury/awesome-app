import { Modal } from '../Modal';
import { MultiplePickerContext } from '../context';
import { Button } from './components/Button';
import { Chips } from './components/Chips';
import { List } from './components/List';
import type { SelectItem } from '@/types';
import { PropsWithChildren, useState } from 'react';

type MultipleItemPicker<T> = {
  selectedItems: T[];
  onChange: (selectedItems: T[]) => void;
};

const MultipleItemPicker = ({
  onChange,
  children,
  selectedItems,
}: PropsWithChildren<MultipleItemPicker<SelectItem>>) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectItem = (item: SelectItem) => {
    onChange([...selectedItems, item]);
  };

  const deselectItem = (item: SelectItem) => {
    onChange(selectedItems.filter((selectedItem) => selectedItem.value !== item.value));
  };

  const clearSelection = () => {
    onChange([]);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <MultiplePickerContext.Provider
      value={{
        modalVisible,
        selectedItems,
        selectItem,
        deselectItem,
        clearSelection,
        showModal,
        hideModal,
      }}
    >
      {children}
    </MultiplePickerContext.Provider>
  );
};

MultipleItemPicker.Modal = Modal;
MultipleItemPicker.Button = Button;
MultipleItemPicker.List = List;
MultipleItemPicker.Chips = Chips;

export default MultipleItemPicker;
