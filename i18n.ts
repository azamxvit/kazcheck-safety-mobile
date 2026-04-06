import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Импортируем словари из новых папок
import ruTranslation from './messages/ru/translation.json';
import kzTranslation from './messages/kz/translation.json';

const resources = {
  ru: { translation: ruTranslation },
  kz: { translation: kzTranslation },
};

// Определяем язык устройства
const deviceLanguage = Localization.getLocales()[0]?.languageCode;
const defaultLang = deviceLanguage === 'kk' ? 'kz' : 'ru';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLang,
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
