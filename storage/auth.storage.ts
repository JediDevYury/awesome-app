import { MMKV } from 'react-native-mmkv';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const mmkvInstance = new MMKV();

export const authStorage = {
  setItem: (key: string, value: Tokens) => {
    mmkvInstance.set(key, JSON.stringify(value));
  },
  getItem: (key: string): Tokens => {
    const value = mmkvInstance.getString(key);
    return value === undefined ? null : JSON.parse(value);
  },
  removeItem: (key: string) => {
    mmkvInstance.delete(key);
  },
};
