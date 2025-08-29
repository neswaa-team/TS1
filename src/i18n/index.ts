import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';
import en from '../locales/en.json';
import kab from '../locales/kab.json';

const resources = { 
  ar: { translation: ar }, 
  fr: { translation: fr }, 
  en: { translation: en }, 
  kab: { translation: kab } 
};

const saved = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
const fallbackLng = 'ar';
const lng = saved || fallbackLng;

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng,
  interpolation: {
    escapeValue: false
  }
});

export function applyDir(lang: string) {
  const rtl = lang === 'ar' || lang === 'kab';
  if (typeof document !== 'undefined') {
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }
}

applyDir(lng);
export default i18n;