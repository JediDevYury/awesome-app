import { SingleItemPicker } from '@/components/common/Picker';
import { useEffectOnlyOnUpdate } from '@/hooks/useEffectOnlyOnUpdate';
import { formatValuesToSelectItems, getKeyByValue } from '@/shared';
import { useCategories } from '@/sqlite/category';
import { Category, SelectItem } from '@/types';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type CategoriesListProps = {
  selectedCategoryId: Category['id'];
  setSelectedCategoryId: (id: Category['id']) => void;
};

const PLACEHOLDER = 'Select Category...';

const CategoriesList = ({ selectedCategoryId, setSelectedCategoryId }: CategoriesListProps) => {
  const context = useFormContext();
  const type = context.watch('type');

  const { styles } = useStyles(stylesheet);
  const db = useSQLiteContext();
  const { categories, getCategoriesByType } = useCategories(db);

  const { items: selectItems, map: idToIndexDictionary } = useMemo(() => {
    if (!categories) return { items: [], map: new Map<string, string>() };

    return formatValuesToSelectItems(
      categories.filter((category) => category.type === type),
      'name',
    );
  }, [categories, type]);

  const selectedCategory = useMemo(() => {
    if (selectItems.length === 0) return null;

    return (
      selectItems.find((category) => {
        return category.value.toString() === getKeyByValue(idToIndexDictionary, selectedCategoryId);
      }) ?? null
    );
  }, [selectItems, type, selectedCategoryId, idToIndexDictionary]);

  const handleCategoryChange = useCallback(
    (selectedItem: SelectItem | null) => {
      setSelectedCategoryId(
        selectedItem ? parseInt(idToIndexDictionary.get(selectedItem.value.toString()), 10) : -1,
      );
    },
    [idToIndexDictionary],
  );

  useEffect(() => {
    if (!type) return;

    getCategoriesByType(type);
  }, [type]);

  useEffectOnlyOnUpdate(() => {
    if (categories.length === 0) return;

    setSelectedCategoryId(categories[0].id);
  }, [categories]);

  return (
    <View style={styles.container}>
      <SingleItemPicker selectedItem={selectedCategory} onChange={handleCategoryChange}>
        <SingleItemPicker.Button placeholder={PLACEHOLDER} />
        <SingleItemPicker.Modal type="single">
          <SingleItemPicker.List items={selectItems} />
        </SingleItemPicker.Modal>
      </SingleItemPicker>
    </View>
  );
};

export const stylesheet = createStyleSheet((theme) => ({
  container: {
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
    gap: theme.spacing.s,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default CategoriesList;
