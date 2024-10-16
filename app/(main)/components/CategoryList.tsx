import { Chip } from '@/components/common';
import { useCategories } from '@/hooks/useCategories';
import { CategoryColors, CategoryEmojies } from '@/shared';
import { Category } from '@/types';
import { FlatList, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type CategoriesListProps = {
  selectedCategoryId: Category['id'];
  setSelectedCategoryId: (id: Category['id']) => void;
};

const chunkCategories = (array: Category[], chunkSize: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const CategoriesList = ({ selectedCategoryId, setSelectedCategoryId }: CategoriesListProps) => {
  const { styles, theme } = useStyles(stylesheet);
  const { categories } = useCategories();

  const rows = chunkCategories(categories, 6);

  return (
    <View style={styles.container}>
      {rows.map((row, index) => {
        return (
          <View key={index.toString()} style={styles.row}>
            <FlatList
              data={row}
              keyExtractor={(category) => category.id.toString()}
              renderItem={({ item: category }: { item: Category }) => {
                return (
                  <Chip
                    label={category.name}
                    style={styles.chip}
                    backgroundColor={
                      selectedCategoryId === category.id
                        ? theme.colors.accent
                        : CategoryColors[category.name]
                    }
                    emoji={CategoryEmojies[category.name ?? 'Default']}
                    onPress={() => {
                      setSelectedCategoryId(category.id);
                    }}
                  >
                    {category.name}
                  </Chip>
                );
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          </View>
        );
      })}
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
  chip: {
    flex: 0,
    height: 40,
    alignItems: 'center',
    maxWidth: 140,
    marginHorizontal: theme.spacing.s,
  },
}));

export default CategoriesList;
