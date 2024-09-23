import { MMKV } from 'react-native-mmkv';

const mmkvInstance = new MMKV();

export const localStorage = {
  setItem: (key: string, value: any) => {
    mmkvInstance.set(key, JSON.stringify(value));
  },
  getItem: (key: string): any => {
    const value = mmkvInstance.getString(key);
    return value === undefined ? null : JSON.parse(value);
  },
  removeItem: (key: string) => {
    mmkvInstance.delete(key);
  },
};
