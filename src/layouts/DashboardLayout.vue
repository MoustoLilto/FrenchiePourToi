<template>
    <div class="bg-base-200 flex min-h-screen flex-col md:flex-row">
        <!-- Sidebar pour les écrans moyens et grands -->
        <aside class="bg-base-100 hidden w-64 shadow-xl md:flex md:flex-col">
            <div class="border-base-300 border-b p-4">
                <div class="flex items-center gap-3">
                    <img
                        src="@/assets/frenchie-logo.png"
                        alt="Frenchie Pour Toi"
                        class="h-10 w-10"
                    />
                    <div>
                        <h2 class="text-primary font-serif font-bold">Frenchie Pour Toi</h2>
                        <p class="text-neutral text-xs">Espace Client</p>
                    </div>
                </div>
            </div>
            <nav class="flex-1 p-4">
                <ul class="space-y-2">
                    <li>
                        <RouterLink
                            :to="{ name: ROUTE_NAMES.DASHBOARD }"
                            class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                            :class="{
                                'bg-primary/10 text-primary': isActive(ROUTE_NAMES.DASHBOARD),
                            }"
                        >
                            <i class="icon-[carbon--dashboard]" />
                            <span>Tableau de bord</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            :to="{ name: 'profile' }"
                            class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                            :class="{ 'bg-primary/10 text-primary': isActive('profile') }"
                        >
                            <i class="icon-[carbon--user-profile]" />
                            <span>Mon profil</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            :to="{ name: 'reservations' }"
                            class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                            :class="{ 'bg-primary/10 text-primary': isActive('reservations') }"
                        >
                            <i class="icon-[carbon--dog-walker]" />
                            <span>Mes réservations</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            :to="{ name: 'messages' }"
                            class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                            :class="{ 'bg-primary/10 text-primary': isActive('messages') }"
                        >
                            <i class="icon-[carbon--email]" />
                            <span>Mes messages</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            :to="{ name: 'appointments' }"
                            class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                            :class="{ 'bg-primary/10 text-primary': isActive('appointments') }"
                        >
                            <i class="icon-[carbon--calendar]" />
                            <span>Mes rendez-vous</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            :to="{ name: 'documents' }"
                            class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                            :class="{ 'bg-primary/10 text-primary': isActive('documents') }"
                        >
                            <i class="icon-[carbon--document]" />
                            <span>Mes documents</span>
                        </RouterLink>
                    </li>
                </ul>
                <div class="border-base-300 mt-6 border-t pt-6">
                    <ul class="space-y-2">
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.HOME }"
                                class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                            >
                                <i class="icon-[carbon--home]" />
                                <span>Retour au site</span>
                            </RouterLink>
                        </li>
                        <li>
                            <button
                                class="hover:bg-base-200 flex w-full items-center gap-3 rounded-lg p-2 text-left"
                                @click="logout"
                            >
                                <i class="icon-[carbon--logout]" />
                                <span>Déconnexion</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </aside>

        <!-- Header mobile -->
        <div class="bg-base-100 flex items-center justify-between p-4 shadow-md md:hidden">
            <div class="flex items-center gap-2">
                <img src="@/assets/frenchie-logo.png" alt="Frenchie Pour Toi" class="h-8 w-8" />
                <h2 class="text-primary font-serif font-bold">Frenchie Pour Toi</h2>
            </div>
            <button class="btn btn-ghost btn-sm" @click="toggleMobileMenu">
                <i class="icon-[carbon--menu]" />
            </button>
        </div>

        <!-- Menu mobile -->
        <div
            v-if="mobileMenuOpen"
            class="fixed inset-0 z-50 bg-black/50 md:hidden"
            @click="closeMobileMenu"
        >
            <div class="bg-base-100 h-full w-64 transform p-4 transition-transform" @click.stop>
                <div class="mb-6 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                        <img
                            src="@/assets/frenchie-logo.png"
                            alt="Frenchie Pour Toi"
                            class="h-8 w-8"
                        />
                        <h2 class="text-primary font-serif font-bold">Frenchie Pour Toi</h2>
                    </div>
                    <button class="btn btn-ghost btn-sm" @click="closeMobileMenu">
                        <i class="icon-[carbon--close]" />
                    </button>
                </div>
                <nav>
                    <ul class="space-y-2">
                        <li>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.DASHBOARD }"
                                class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                                :class="{
                                    'bg-primary/10 text-primary': isActive(ROUTE_NAMES.DASHBOARD),
                                }"
                                @click="closeMobileMenu"
                            >
                                <i class="icon-[carbon--dashboard]" />
                                <span>Tableau de bord</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: 'profile' }"
                                class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                                :class="{ 'bg-primary/10 text-primary': isActive('profile') }"
                                @click="closeMobileMenu"
                            >
                                <i class="icon-[carbon--user-profile]" />
                                <span>Mon profil</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: 'reservations' }"
                                class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                                :class="{ 'bg-primary/10 text-primary': isActive('reservations') }"
                                @click="closeMobileMenu"
                            >
                                <i class="icon-[carbon--dog-walker]" />
                                <span>Mes réservations</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: 'messages' }"
                                class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                                :class="{ 'bg-primary/10 text-primary': isActive('messages') }"
                                @click="closeMobileMenu"
                            >
                                <i class="icon-[carbon--email]" />
                                <span>Mes messages</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: 'appointments' }"
                                class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                                :class="{ 'bg-primary/10 text-primary': isActive('appointments') }"
                                @click="closeMobileMenu"
                            >
                                <i class="icon-[carbon--calendar]" />
                                <span>Mes rendez-vous</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink
                                :to="{ name: 'documents' }"
                                class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                                :class="{ 'bg-primary/10 text-primary': isActive('documents') }"
                                @click="closeMobileMenu"
                            >
                                <i class="icon-[carbon--document]" />
                                <span>Mes documents</span>
                            </RouterLink>
                        </li>
                    </ul>
                    <div class="border-base-300 mt-6 border-t pt-6">
                        <ul class="space-y-2">
                            <li>
                                <RouterLink
                                    :to="{ name: ROUTE_NAMES.HOME }"
                                    class="hover:bg-base-200 flex items-center gap-3 rounded-lg p-2"
                                    @click="closeMobileMenu"
                                >
                                    <i class="icon-[carbon--home]" />
                                    <span>Retour au site</span>
                                </RouterLink>
                            </li>
                            <li>
                                <button
                                    class="hover:bg-base-200 flex w-full items-center gap-3 rounded-lg p-2 text-left"
                                    @click="logout"
                                >
                                    <i class="icon-[carbon--logout]" />
                                    <span>Déconnexion</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>

        <!-- Contenu principal -->
        <main class="flex-1 p-4">
            <RouterView />
        </main>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const mobileMenuOpen = ref(false);

const isActive = (routeName: string) => {
    return route.name === routeName;
};

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
};

const logout = () => {
    // Ici, vous implémenteriez la logique de déconnexion
    closeMobileMenu();
    router.push({ name: ROUTE_NAMES.HOME });
};
</script>
