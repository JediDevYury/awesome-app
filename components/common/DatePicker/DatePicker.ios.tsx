import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import type { ControllerRenderProps } from 'react-hook-form';
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
      </View>
    </>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  dateAndTime: {
    paddingTop: theme.spacing.s,
    gap: theme.spacing.s,
    tintColor: theme.colors.accent,
  },
  text: {
    fontSize: theme.typography.size.m,
    fontFamily: theme.typography.variant.semiBold,
  },
}));

export default DateTimePicker;
