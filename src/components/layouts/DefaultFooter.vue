<template>
    <footer class="bg-primary/10 py-8">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                    <h3 class="mb-4 font-serif text-xl font-bold">Frenchie Pour Toi</h3>
                    <p class="mb-4">
                        Élevage de bouledogues français de qualité. Nos chiots sont élevés avec
                        amour et attention pour devenir vos fidèles compagnons.
                    </p>
                    <SocialLinks />
                </div>
                <div>
                    <h3 class="mb-4 font-serif text-xl font-bold">Liens rapides</h3>
                    <ul class="space-y-2">
                        <li><RouterLink to="/" class="hover:text-primary">Accueil</RouterLink></li>
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
                                :to="{ name: ROUTE_NAMES.PARENTS }"
                                class="hover:text-primary"
                            >
                                Nos Parents
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.RESERVATION }"
                                class="hover:text-primary"
                            >
                                Réservation
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
                </div>
                <div>
                    <h3 class="mb-4 font-serif text-xl font-bold">Contact</h3>
                    <p class="mb-2">
                        <i class="icon-[carbon--location] mr-2" />
                        123 Rue des Bouledogues, 75000 Paris
                    </p>
                    <p class="mb-2">
                        <i class="icon-[carbon--phone] mr-2" />
                        +33 1 23 45 67 89
                    </p>
                    <p class="mb-2">
                        <i class="icon-[carbon--email] mr-2" />
                        contact@frenchiepoutoi.fr
                    </p>
                </div>
            </div>
            <div class="border-base-300 mt-8 border-t pt-8 text-center">
                <p class="caption-text">
                    © {{ currentYear }} Frenchie Pour Toi. Tous droits réservés.
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import SocialLinks from '@/components/SocialLinks.vue';

const currentYear = computed(() => DateTime.now().year);
</script>
