import { Button } from '../Button';
import { pickerContexts } from './context';
import React, { PropsWithChildren } from 'react';
import { View, Modal as RNModal } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type ModalProps = {
  type: 'single' | 'multiple';
};

export const Modal = ({ children, type }: PropsWithChildren<ModalProps>) => {
  const { modalVisible, hideModal } = pickerContexts[type].useContext();
  const { styles } = useStyles(stylesheet);

  return (
    <RNModal visible={modalVisible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {children}
          <Button style={styles.closeButton} text={'Close'} onPress={hideModal} />
        </View>
      </View>
    </RNModal>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.colors.blur,
  },
  closeButton: {
    marginTop: theme.spacing.l,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 50,
    maxHeight: '50%',
    borderRadius: 10,
    padding: 20,
  },
}));
