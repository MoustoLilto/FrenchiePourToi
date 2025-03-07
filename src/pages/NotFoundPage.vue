<template>
    <div
        class="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center"
    >
        <h1 class="text-primary mb-6 font-serif text-6xl font-bold">404</h1>
        <h2 class="mb-8 font-serif text-3xl">Page non trouvée</h2>
        <p class="mb-8 max-w-md">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <RouterLink :to="{ name: ROUTE_NAMES.HOME }" class="btn btn-primary">
            Retour à l'accueil
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
</script>
