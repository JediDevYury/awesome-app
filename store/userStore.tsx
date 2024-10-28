import { mmkvClientStorage } from '@/storage/mmkv.storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type UserStore = {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      hasFinishedOnboarding: false,
      toggleHasOnboarded: () =>
        set((state) => {
          return {
            ...state,
            hasFinishedOnboarding: !state.hasFinishedOnboarding,
          };
        }),
    }),
    {
      name: 'expenses-tracker-user',
      storage: createJSONStorage(() => mmkvClientStorage),
    },
  ),
);
