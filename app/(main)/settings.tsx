import { Button } from '@/components/common';
import { MultipleItemPicker, SingleItemPicker } from '@/components/common/Picker';
import { defaultStyles } from '@/configs/theme';
import { categories } from '@/mocks/categories';
import { useAuth } from '@/providers';
import { formatValuesToSelectItems } from '@/shared';
import type { SelectItem } from '@/types';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { createStyleSheet, UnistylesRuntime, useStyles } from 'react-native-unistyles';

export default function Settings() {
  const { t } = useTranslation();
  const { styles } = useStyles(stylesheet);
  const { signOut } = useAuth();
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<SelectItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<SelectItem | null>(null);

  const handleSignOut = async () => {
    await signOut();

    router.replace('/(auth)/sign-in');
  };

  const handleMultipleItemPickerChange = (selectItems: SelectItem[]) => {
    setSelectedItems(selectItems);
  };

  const handlePickerChange = (selectedItem: SelectItem | null) => {
    setSelectedItem(selectedItem);
  };

  return (
    <View style={styles.container}>
      <MultipleItemPicker onChange={handleMultipleItemPickerChange} selectedItems={selectedItems}>
        <MultipleItemPicker.Modal type={'multiple'}>
          <MultipleItemPicker.List items={formatValuesToSelectItems(categories, 'id', 'name')} />
        </MultipleItemPicker.Modal>
        <MultipleItemPicker.Button text={'Select Categories...'} />
        <MultipleItemPicker.Chips />
      </MultipleItemPicker>
      <SingleItemPicker onChange={handlePickerChange} selectedItem={selectedItem}>
        <SingleItemPicker.Modal type={'single'}>
          <SingleItemPicker.List items={formatValuesToSelectItems(categories, 'id', 'name')} />
        </SingleItemPicker.Modal>
        <SingleItemPicker.Button placeholder={'Select Category...'} />
      </SingleItemPicker>
      <Button text={t('components.button.sign-out')} onPress={handleSignOut} />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    ...defaultStyles.container,
    paddingHorizontal: theme.spacing.m,
    paddingTop: UnistylesRuntime.insets.top,
    paddingBottom: UnistylesRuntime.insets.bottom,
    backgroundColor: theme.colors.background,
    flexWrap: 'wrap',
  },
  text: {
    color: theme.colors.typography,
  },
}));
