<template>
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Suspense>
                <component :is="Component" />

                <template #fallback>
                    <div class="min-h-xs flex items-center justify-center">
                        <div class="text-primary">Chargement...</div>
                    </div>
                </template>
            </Suspense>
        </template>
    </RouterView>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue';
import { Settings } from 'luxon';

useHead({
    title: 'Frenchie Pour Toi - Bouledogues Français de Qualité',
    meta: [
        {
            name: 'description',
            content:
                'Boutique en ligne de bouledogues français de qualité. Réservez votre chiot ou prenez rendez-vous pour une visite.',
        },
    ],
});

Settings.defaultLocale = 'fr';
</script>

<style>
html[data-theme='frenchieLight'] {
    color-scheme: light;
}
html[data-theme='frenchieDark'] {
    color-scheme: dark;
}

body {
    overflow: auto;

    &.modal-open {
        overflow: hidden;
    }
}
</style>
