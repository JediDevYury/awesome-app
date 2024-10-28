import type { SelectItem } from '@/types/picker';

export const handleError = (
  err: unknown,
  callback?: (error: Error) => void,
  accessor?: string,
): void => {
  if (err instanceof Error && callback) {
    callback(new Error(accessor ? `${accessor}: ${err.message}` : err.message));
  }

  return err instanceof Error ? console.error(err) : console.error('An error occurred:', err);
};

export const formatDateToTime = (date: Date) => {
  let hours: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();

  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;

  return `${hours}:${minutes}`;
};

type FormatValuesToSelectItems = {
  items: SelectItem[];
  map: Map<string, any>;
};

export const formatValuesToSelectItems = <L extends string>(
  values: {
    [key: string]: any;
  }[],
  labelAccessor: L,
) => {
  const { items, map } = values.reduce(
    ({ items, map }: FormatValuesToSelectItems, currentValue, currentIndex) => {
      const label = currentValue[labelAccessor];

      map.set(currentIndex.toString(), currentValue['id']);

      return {
        items: [
          ...items,
          {
            label,
            value: currentIndex,
          },
        ],
        map,
      };
    },
    {
      items: [],
      map: new Map<string, number>(),
    },
  );

  return { items, map };
};

export const excludeProperties = <O extends Record<string, any>, K extends keyof O>(
  obj: O,
  keys: K[],
) => {
  const newObj = { ...obj };

  keys.forEach((key) => {
    delete newObj[key];
  });

  return newObj;
};

export function getKeyByValue<K extends string, V extends number>(
  map: Map<K, V>,
  targetValue: number,
): K | null {
  for (const [key, value] of map.entries()) {
    if (value === targetValue) {
      return key;
    }
  }
  return null;
}
