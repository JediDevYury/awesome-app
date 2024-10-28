import { mmkvClientStorage } from '@/storage/mmkv.storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserStore = {
  isTransactionsUpdated: boolean;
  setTransactionsUpdated: () => void;
};

export const useTransactionStore = create(
  persist<UserStore>(
    (set) => ({
      isTransactionsUpdated: false,
      setTransactionsUpdated: () =>
        set((state) => {
          return {
            ...state,
            isTransactionsUpdated: !state.isTransactionsUpdated,
          };
        }),
    }),
    {
      name: 'expenses-tracker-transactions',
      storage: createJSONStorage(() => mmkvClientStorage),
    },
  ),
);
