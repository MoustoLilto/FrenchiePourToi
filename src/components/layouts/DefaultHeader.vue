<template>
    <div :class="{ 'mt-16': !isHomePage }">
        <header class="bg-base-100/90 fixed inset-x-0 top-0 z-50 backdrop-blur-sm">
            <div class="flex-center container pointer-events-none h-16 px-4">
                <div class="flex flex-1">
                    <RouterLink
                        v-show="shouldShowLogo"
                        to="/"
                        aria-label="Home"
                        class="pointer-events-auto flex items-center gap-2"
                    >
                        <img :src="logoImg" alt="Frenchie Pour Toi" class="size-10" />
                        <span class="text-primary font-serif text-xl font-bold">
                            Frenchie Pour Toi
                        </span>
                    </RouterLink>
                </div>

                <DesktopNavigation v-if="screenStore.isScreenSM" :routes="routes" />

                <div
                    class="pointer-events-auto flex flex-1 items-center justify-end gap-6 text-2xl"
                >
                    <div v-if="screenStore.isScreenMD" class="flex gap-3">
                        <SocialLinks />
                    </div>

                    <MobileNavigation
                        v-if="screenStore.isScreenXS && !screenStore.isScreenSM"
                        :routes="routes"
                    />

                    <LanguageSwitcher class="pointer-events-auto" />

                    <i
                        class="icon-[carbon--sun] dark:icon-[carbon--moon] icon-btn"
                        @click="toggleDark()"
                    />
                </div>
            </div>

            <transition name="fade">
                <button
                    v-if="scrollY > screenStore.screenHeight"
                    class="btn btn-circle btn-primary fixed bottom-3 right-3"
                    @click="scrollToTop"
                >
                    <i class="icon-[carbon--arrow-up]" />
                </button>
            </transition>
        </header>

        <div v-if="isHomePage" class="container pt-16">
            <section class="section bg-base-200">
                <div class="flex flex-col items-center gap-12 md:flex-row">
                    <div ref="animatedLogoRef" class="flex-center flex-1 md:basis-1/3">
                        <img
                            src="https://res.cloudinary.com/duswjj3x8/image/upload/v1741359862/WhatsApp_Image_2025-03-07_at_15.57.45_xy8noe.jpg"
                            alt="Bouledogue Français"
                            class="aspect-1/1 h-64 w-64 rounded-full object-cover"
                        />
                    </div>

                    <div class="flex flex-1 flex-col gap-6 md:basis-2/3" uno-xs="flex-1">
                        <h1 class="text-h1 font-serif">Frenchie Pour Toi</h1>

                        <p class="text-subtitle flex flex-col gap-4">
                            <span>
                                {{ $t('home.hero.description') }}
                            </span>

                            <span>
                                {{ $t('home.hero.additionalInfo') }}
                            </span>
                        </p>

                        <RouterLink
                            :to="{ name: ROUTE_NAMES.PUPPIES }"
                            class="btn btn-primary w-fit"
                        >
                            {{ $t('common.buttons.viewMore') }}
                        </RouterLink>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '@/services/assetsService';
import { ROUTE_NAMES, HOME_ROUTE } from '@/constants/routesConstants';
import logoImg from '@/assets/frenchie-logo.png';
import { useI18n } from 'vue-i18n';

import DesktopNavigation from '@/components/layouts/DesktopNavigation.vue';
import MobileNavigation from '@/components/layouts/MobileNavigation.vue';
import SocialLinks from '@/components/SocialLinks.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const { t } = useI18n();
const screenStore = useScreenStore();

const route = useRoute();
const isHomePage = computed(() => route.name === HOME_ROUTE);
const routes = computed(() => [
    { label: t('common.navigation.home'), name: ROUTE_NAMES.HOME },
    { label: t('common.navigation.puppies'), name: ROUTE_NAMES.PUPPIES },
    { label: t('common.navigation.parents'), name: ROUTE_NAMES.PARENTS },
    { label: t('common.navigation.care'), name: ROUTE_NAMES.CARE },
    { label: t('common.navigation.reservation'), name: ROUTE_NAMES.RESERVATION },
    { label: t('common.navigation.gallery'), name: ROUTE_NAMES.GALLERY },
    { label: t('common.navigation.blog'), name: ROUTE_NAMES.BLOG },
    { label: t('common.navigation.contact'), name: ROUTE_NAMES.CONTACT },
    { label: t('common.navigation.about'), name: ROUTE_NAMES.ABOUT },
]);

const animatedLogoRef = ref<HTMLElement | null>(null);
const { isVisible: isAnimatedLogoVisible } = useObserver(
    animatedLogoRef,
    () => {},
    () => {},
    0.1
);
const shouldShowLogo = computed(() => !isHomePage.value || !isAnimatedLogoVisible.value);

const { scrollY } = useScrollBehavior();

const isDark = useDark({
    selector: 'html',
    attribute: 'data-theme',
    valueDark: 'frenchieDark',
    valueLight: 'frenchieLight',
});
const toggleDark = useToggle(isDark);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
</script>
