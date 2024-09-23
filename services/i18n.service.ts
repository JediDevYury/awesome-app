import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import fr from '@/locales/fr.json';
import { localStorage } from '@/storage/local.storage';

const resources = {
  'en-US': { translation: en },
  'fr-FR': { translation: fr },
};

const initI18n = async () => {
  const locale = localStorage.getItem('locale');
  const defaultLocale = locale || Localization.getLocales()[0].languageTag;

  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    ns: ['translation'],
    defaultNS: 'translation',
    resources,
    lng: defaultLocale,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
