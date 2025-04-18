<template>
    <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-sm text-base-content">
            <span class="mr-1">{{ currentLanguageLabel }}</span>
            <i class="icon-[carbon--globe] text-lg" />
        </label>
        <ul
            tabindex="0"
            class="dropdown-content menu rounded-box bg-base-100 z-[1] min-w-32 p-2 shadow"
        >
            <li v-for="language in languages" :key="language.locale">
                <a
                    href="#"
                    :class="{ 'font-bold': language.locale === currentLocale }"
                    @click.prevent="changeLanguage(language.locale)"
                >
                    {{ language.label }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { getLocale, setLocale } from '@/plugins/i18n';

const currentLocale = ref(getLocale());

const languages = [
    { locale: 'fr', label: 'Français' },
    { locale: 'en', label: 'English' },
] as const;

const currentLanguageLabel = computed(() => {
    const lang = languages.find((lang) => lang.locale === currentLocale.value);
    return lang ? lang.label : 'Français';
});

function changeLanguage(locale: 'fr' | 'en') {
    currentLocale.value = locale;
    setLocale(locale);
}
</script>
