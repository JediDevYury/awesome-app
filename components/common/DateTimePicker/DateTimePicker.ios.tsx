import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

function DateTimePicker() {
  const { styles, theme } = useStyles(stylesheet);
  const methods = useFormContext();

  const handleDateChange = useCallback(
    (onChange: (...event: Parameters<ControllerRenderProps['onChange']>) => void) =>
      (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
        onChange(selectedDate);
      },
    [],
  );

  const handleTimeChange = useCallback(
    (onChange: (...event: Parameters<ControllerRenderProps['onChange']>) => void) =>
      (_: DateTimePickerEvent, selectedDate: Date | undefined) => {
        onChange(selectedDate);
      },
    [],
  );

  return (
    <>
      <View style={styles.dateAndTime}>
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
                accentColor={theme.colors.accent}
              />
            );
          }}
        />

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
                accentColor={theme.colors.accent}
              />
            );
          }}
        />
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  showDatePickerButton: {
    paddingHorizontal: theme.spacing.m,
  },
  controls: {
    flexDirection: 'row',
    gap: theme.spacing.s,
    alignItems: 'center',
  },
  dateAndTime: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: theme.spacing.s,
    tintColor: theme.colors.accent,
  },
  text: {
    fontSize: theme.typography.size.m,
    fontFamily: theme.typography.variant.semiBold,
  },
}));

export default DateTimePicker;
