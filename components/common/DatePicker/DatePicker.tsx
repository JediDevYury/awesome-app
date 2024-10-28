import { Button } from '@/components/common';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { ControllerRenderProps } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

function DateTimePicker() {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  const { styles } = useStyles(stylesheet);
  const methods = useFormContext();

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };
  const handleDateChange = useCallback(
    (onChange: (...event: Parameters<ControllerRenderProps['onChange']>) => void) =>
      (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        onChange(selectedDate);
        selectedDate && setDate(selectedDate);
      },
    [],
  );

  return (
    <>
      <View style={styles.controls}>
        <Button
          style={styles.showDatePickerButton}
          text={date.toDateString()}
          onPress={handleToggleDatePicker}
        />
      </View>
      {showDatePicker && (
        <Controller
          name="date"
          control={methods.control}
          render={({ field: { onChange, value } }) => {
            return (
              <RNDateTimePicker
                value={value}
                mode={'date'}
                display={'default'}
                onChange={handleDateChange(onChange)}
                is24Hour
              />
            );
          }}
        />
      )}
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  controls: {
    paddingTop: theme.spacing.s,
    gap: theme.spacing.m,
    paddingHorizontal: theme.spacing.s,
  },
  showDatePickerButton: {
    paddingHorizontal: theme.spacing.s,
  },
  text: {
    fontSize: theme.typography.size.m,
    fontFamily: theme.typography.variant.semiBold,
  },
}));

export default DateTimePicker;
