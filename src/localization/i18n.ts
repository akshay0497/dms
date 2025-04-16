import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en/translations';
import hiTranslations from './hi/translations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      hi: {
        translation: hiTranslations,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;