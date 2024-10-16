import { Button } from '@/components/common';
import { formatDateToTime } from '@/shared';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

function DateTimePicker() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const { styles } = useStyles(stylesheet);
  const methods = useFormContext();

  const handleToggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleToggleTimePicker = () => {
    setShowTimePicker(!showDatePicker);
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

  const handleTimeChange = useCallback(
    (onChange: (...event: Parameters<ControllerRenderProps['onChange']>) => void) =>
      (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
        setShowTimePicker(false);
        onChange(selectedDate);
        selectedDate && setTime(selectedDate);
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
        <Button
          style={styles.showDatePickerButton}
          text={formatDateToTime(time)}
          onPress={handleToggleTimePicker}
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
      {showTimePicker && (
        <Controller
          name="time"
          control={methods.control}
          render={({ field: { onChange, value } }) => {
            return (
              <RNDateTimePicker
                value={value}
                mode={'time'}
                display={'default'}
                onChange={handleTimeChange(onChange)}
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
  showDatePickerButton: {
    paddingHorizontal: theme.spacing.s,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.m,
  },
  dateAndTime: {
    flexDirection: 'row',
    gap: theme.spacing.s,
    height: 0,
  },
  text: {
    fontSize: theme.typography.size.m,
    fontFamily: theme.typography.variant.semiBold,
  },
}));

export default DateTimePicker;
