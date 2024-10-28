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
      <Text
        style={styles.pickerButtonText({
          isItemSelected: Boolean(selectedItem),
        })}
      >
        {text}
      </Text>
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
    position: 'relative',
    width: 190,
    padding: theme.spacing.s,
    paddingRight: 50,
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  pickerButtonText: ({ isItemSelected }: { isItemSelected: boolean }) => ({
    ...theme.defaultStyles.text,
    fontSize: 16,
    color: isItemSelected ? theme.colors.black : theme.colors.gray,
  }),
  clearButtonInline: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -4 }],
    borderRadius: 5,
  },
}));
