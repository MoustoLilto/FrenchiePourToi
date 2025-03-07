<template>
    <div class="bg-background p-4 text-text">
        <div class="h-sm w-screen">
            <div class="bg[hsl(41, 31%, 14%)] h-full w-20%" />
            <div class="bg-[hsl(41, 31%, 34%)] h-full w-20%" />
            <div class="bg-[hsl(41, 31%, 54%)] h-full w-20%" />
            <div class="bg-[hsl(41, 31%, 64%)] h-full w-20%" />
            <div class="bg-[hsl(41, 31%, 84%)] h-full w-20%" />
        </div>

        <abbr class="bg-red-500" title="Toggle dark mode">
            <button class="icon-btn" @click="toggleDark()">
                <i class="icon-[material-symbols--sunny-outline] dark:icon-[material-symbols--dark-mode]" />
            </button>
        </abbr>

        <p>
            Ceci est un exemple de texte utilisant la couleur de texte principale.
            <a :style="{ color: theme.link }" href="#">Voici un lien</a>
            .
        </p>
        <div :style="{ border: `1px solid ${theme.border}`, padding: '10px' }">
            <p :style="{ color: theme.success }">Ceci est un message de succès.</p>
            <p :style="{ color: theme.warning }">Ceci est un message d'avertissement.</p>
            <p :style="{ color: theme.error }">Ceci est un message d'erreur.</p>
        </div>

        <!-- Carte basique -->
        <div class="card">
            <h3 class="mb-2 text-xl text-primary">Titre de la carte</h3>
            <p class="text-text">Contenu de la carte...</p>
        </div>

        <!-- Carte avec état de survol -->
        <div class="card hover:card-hover">
            <!-- Contenu -->
        </div>

        <!-- Surface modale -->
        <!-- <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="card max-w-md w-full">
                <h2>Titre de la modale</h2>
            </div>
        </div> -->

        <!-- Input avec anneau de focus -->
        <input type="text" class="border-border border rounded px-3 py-2 focus:focus-ring" />

        <!-- Bouton avec état de focus visible -->
        <button class="btn-primary focus:focus-ring">Soumettre</button>

        <!-- Bouton désactivé -->
        <button class="btn-primary" :class="isDisabled ? 'btn-disabled' : ''">Enregistrer</button>

        <!-- Input désactivé -->
        <input
            type="text"
            class="border-border border rounded px-3 py-2"
            :class="isDisabled ? 'input-disabled' : 'focus:focus-ring'"
            :disabled="isDisabled"
        />

        <footer :style="{ marginTop: '20px', color: theme['light-text'] }">
            <p>Texte léger dans le pied de page.</p>
        </footer>
    </div>
</template>

<script lang="ts" setup>
import { theme } from '@/constants/design/colors2';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const isDisabled = ref(false);
</script>

<style scoped></style>
