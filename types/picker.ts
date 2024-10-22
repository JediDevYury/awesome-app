export type SelectItem = { label: string; value: any };

export type CommonPickerContextType<S> = {
  selectItem: (item: S) => void;
  deselectItem: (item: S) => void;
  clearSelection: () => void;
  modalVisible: boolean;
  showModal: () => void;
  hideModal: () => void;
};
