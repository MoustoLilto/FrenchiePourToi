import { computed } from 'vue';
import { useI18n as vueUseI18n } from 'vue-i18n';
import { getLocale, setLocale } from '@/plugins/i18n';
import { routeWithI18n } from '@/plugins/router';

export function useI18n() {
    const { t, locale } = vueUseI18n();

    // Récupérer la langue actuelle
    const currentLocale = computed(() => locale.value);

    // Changer la langue
    const changeLocale = (newLocale: 'fr' | 'en') => {
        setLocale(newLocale);
    };

    // Vérifier si la langue actuelle est le français
    const isFrench = computed(() => currentLocale.value === 'fr');

    // Vérifier si la langue actuelle est l'anglais
    const isEnglish = computed(() => currentLocale.value === 'en');

    // Obtenir le nom de la langue en texte
    const localeName = computed(() => {
        return currentLocale.value === 'fr' ? 'Français' : 'English';
    });

    // Créer une route avec i18n
    const translateRoute = (name: string, params = {}) => {
        return routeWithI18n(name, params);
    };

    return {
        t,
        locale: currentLocale,
        changeLocale,
        isFrench,
        isEnglish,
        localeName,
        translateRoute,
        getLocale,
    };
}
