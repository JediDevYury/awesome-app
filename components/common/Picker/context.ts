import type { CommonPickerContextType, SelectItem } from '@/types';
import { createContext, useContext } from 'react';

type SingleItemPickerContextType<S> = {
  selectedItem: S | null;
} & CommonPickerContextType<S>;

type MultipleItemPickerContextType<S extends SelectItem | null> = {
  selectedItems: S[];
} & CommonPickerContextType<S>;

export const PickerContext = {
  selectItem: () => {},
  deselectItem: () => {},
  clearSelection: () => {},
  modalVisible: false,
  showModal: () => {},
  hideModal: () => {},
};

export const SingleItemPickerContext = createContext<SingleItemPickerContextType<SelectItem>>({
  ...PickerContext,
  selectedItem: null,
});

export const MultiplePickerContext = createContext<MultipleItemPickerContextType<SelectItem>>({
  ...PickerContext,
  selectedItems: [],
});

export const useSingleItemPickerContext = () => {
  const context = useContext(SingleItemPickerContext);
  // const multipleContext = useContext(MultiplePickerContext);

  if (!context) {
    throw new Error(
      'useSingleItemPickerContext must be used within a SingleItemPickerContextProvider',
    );
  }

  return context;
};

export const useMultiplePickerContext = () => {
  const context = useContext(MultiplePickerContext);

  if (!context) {
    throw new Error(
      'useMultiplePickerContext must be used within a MultipleItemPickerContextProvider',
    );
  }

  return context;
};

export const pickerContexts = {
  single: {
    useContext: useSingleItemPickerContext,
  },
  multiple: {
    useContext: useMultiplePickerContext,
  },
};
