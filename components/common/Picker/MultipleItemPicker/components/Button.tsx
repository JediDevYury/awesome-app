import { useMultiplePickerContext } from '../../context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type MultipleItemPickerButtonProps = {
  text: string;
};

export const Button = ({ text }: MultipleItemPickerButtonProps) => {
  const { showModal, selectedItems, clearSelection } = useMultiplePickerContext();
  const { styles, theme } = useStyles(stylesheet);

  const getButtonText = () => {
    if (selectedItems.length === 0) {
      return text;
    }

    if (selectedItems.length === 1) {
      return selectedItems[0].label;
    }

    return `${selectedItems.length} items selected`;
  };

  return (
    <TouchableOpacity style={styles.pickerButton} onPress={showModal}>
      <Text style={styles.pickerButtonText}>{getButtonText()}</Text>
      {selectedItems.length !== 0 && (
        <TouchableOpacity style={styles.clearButtonInline} onPress={clearSelection}>
          <MaterialIcons name="clear" size={24} color={theme.colors.accent} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  pickerButton: {
    width: '100%',
    padding: theme.spacing.s,
    paddingRight: 50,
    backgroundColor: theme.colors.gray94,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  pickerButtonText: {
    fontSize: 16,
    color: theme.colors.gray,
  },
  clearButtonInline: {
    position: 'absolute',
    top: 6,
    right: 2,
    borderRadius: 5,
  },
}));
