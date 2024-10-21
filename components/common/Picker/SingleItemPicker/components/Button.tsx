import { useSingleItemPickerContext } from '../../context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, TouchableOpacity } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type MultipleItemPickerButtonProps = {
  placeholder: string;
};

export const Button = ({ placeholder }: MultipleItemPickerButtonProps) => {
  const { showModal, selectedItem, clearSelection } = useSingleItemPickerContext();
  const { styles, theme } = useStyles(stylesheet);
  const text = !selectedItem ? placeholder : selectedItem.label;

  return (
    <TouchableOpacity style={styles.pickerButton} onPress={showModal}>
      <Text style={styles.pickerButtonText}>{text}</Text>
      {selectedItem && (
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
