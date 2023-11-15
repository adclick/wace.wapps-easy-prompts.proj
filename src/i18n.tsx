// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJson from '../locales/en.json';
import ptJson from '../locales/pt.json';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    resources: {
      en: {
        translation: { ...enJson }
      },
      pt: {
        translation: { ...ptJson }
      }
    },
    lng: "en"
  });

export default i18n;
