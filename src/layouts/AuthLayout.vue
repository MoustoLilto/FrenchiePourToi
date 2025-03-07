<template>
    <div class="bg-base-200 flex min-h-screen flex-col">
        <!-- Header -->
        <header class="bg-base-100 shadow-md">
            <div class="container mx-auto flex items-center justify-between px-4 py-3">
                <RouterLink :to="{ name: ROUTE_NAMES.HOME }" class="flex items-center gap-2">
                    <img src="@/assets/frenchie-logo.png" alt="Frenchie Pour Toi" class="h-8 w-8" />
                    <span class="text-primary font-serif font-bold">Frenchie Pour Toi</span>
                </RouterLink>
                <nav>
                    <ul class="flex gap-4">
                        <li>
                            <RouterLink :to="{ name: ROUTE_NAMES.HOME }" class="hover:text-primary">
                                Accueil
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.PUPPIES }"
                                class="hover:text-primary"
                            >
                                Nos Chiots
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.CONTACT }"
                                class="hover:text-primary"
                            >
                                Contact
                            </RouterLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

        <!-- Contenu principal -->
        <main class="flex flex-1 items-center justify-center">
            <RouterView />
        </main>

        <!-- Footer -->
        <footer class="bg-base-100 text-neutral py-4 text-center text-sm">
            <div class="container mx-auto px-4">
                <p>© {{ currentYear }} Frenchie Pour Toi. Tous droits réservés.</p>
                <div class="mt-2 flex justify-center gap-4">
                    <a href="#" class="hover:text-primary">Conditions générales</a>
                    <a href="#" class="hover:text-primary">Politique de confidentialité</a>
                    <a href="#" class="hover:text-primary">Mentions légales</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>
