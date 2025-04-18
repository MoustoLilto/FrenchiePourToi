import { createI18n } from 'vue-i18n';
import fr from '@/locales/fr';
import en from '@/locales/en';

type MessageSchema = typeof fr;

const i18n = createI18n<[MessageSchema], 'fr' | 'en'>({
    legacy: false, // Vous devez définir cette option à `false` pour utiliser la Composition API
    locale: 'fr', // Définir le français comme langue par défaut
    fallbackLocale: 'en', // Définir l'anglais comme langue de secours
    messages: {
        fr,
        en,
    },
});

export default i18n;

// Fonction utilitaire pour changer la langue
export function setLocale(locale: 'fr' | 'en') {
    const { locale: localeRef } = i18n.global as unknown as { locale: { value: 'fr' | 'en' } };
    localeRef.value = locale;
    document.querySelector('html')?.setAttribute('lang', locale);
    localStorage.setItem('locale', locale);
}

// Fonction pour obtenir la langue actuelle
export function getLocale(): 'fr' | 'en' {
    const { locale: localeRef } = i18n.global as unknown as { locale: { value: 'fr' | 'en' } };
    return localeRef.value;
}

// Fonction pour initialiser la langue depuis le localStorage ou la langue du navigateur
export function initLocale() {
    const savedLocale = localStorage.getItem('locale') as 'fr' | 'en' | null;
    const browserLocale = navigator.language.split('-')[0] as 'fr' | 'en';
    const locale =
        savedLocale || (browserLocale === 'fr' || browserLocale === 'en' ? browserLocale : 'fr');

    setLocale(locale);
}
