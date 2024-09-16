import { MMKV } from 'react-native-mmkv';

const mmkvStorage = new MMKV();

export const mmkvClientStorage = {
  setItem: (key: string, value: string) => {
    mmkvStorage.set(key, value);
  },
  getItem: (key: string) => {
    const value = mmkvStorage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    mmkvStorage.delete(key);
  },
};
