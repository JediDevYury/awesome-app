import { Alert } from 'react-native';

type AsyncActionType = (...args: any[]) => Promise<any>;

const deleteTransactionConfirmation = (
  callback: AsyncActionType,
  {
    title = 'Delete Transaction',
    message = 'Are you sure that transaction will be deleted?',
    confirmText = 'Delete',
    cancelText = 'Cancel',
  } = {},
) =>
  Alert.alert(title, message, [
    { text: confirmText, onPress: async () => await callback() },
    {
      text: cancelText,
      onPress: () => null,
      style: 'cancel',
    },
  ]);

export { deleteTransactionConfirmation };
