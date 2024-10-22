import { Modal } from '../Modal';
import { SingleItemPickerContext } from '../context';
import { Button } from './components/Button';
import { List } from './components/List';
import type { SelectItem } from '@/types';
import { PropsWithChildren, useState } from 'react';

type SingleItemPickerProps<T> = {
  selectedItem: T;
  onChange: (selectedItem: T | null) => void;
};

const SingleItemPicker = ({
  onChange,
  children,
  selectedItem,
}: PropsWithChildren<SingleItemPickerProps<SelectItem | null>>) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectItem = (item: SelectItem) => {
    onChange(item);
  };

  const deselectItem = (item: SelectItem) => {
    onChange(item);
  };

  const clearSelection = () => {
    onChange(null);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <SingleItemPickerContext.Provider
      value={{
        modalVisible,
        selectedItem,
        selectItem,
        deselectItem,
        clearSelection,
        showModal,
        hideModal,
      }}
    >
      {children}
    </SingleItemPickerContext.Provider>
  );
};

SingleItemPicker.Modal = Modal;
SingleItemPicker.Button = Button;
SingleItemPicker.List = List;

export default SingleItemPicker;
