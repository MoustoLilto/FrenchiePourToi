import { acceptHMRUpdate, defineStore } from 'pinia';
import breakpoints from '@/constants/breakpoints';
import { useWindowSize } from '@vueuse/core';

export const useScreenStore = defineStore('screen', () => {
    const screenWidth = useWindowSize().width;
    const screenHeight = useWindowSize().height;

    const isScreenXS = computed(() => screenWidth.value >= breakpoints.XS);
    const isScreenSM = computed(() => screenWidth.value >= breakpoints.SM);
    const isScreenMD = computed(() => screenWidth.value >= breakpoints.MD);
    const isScreenLG = computed(() => screenWidth.value >= breakpoints.LG);
    const isScreenXL = computed(() => screenWidth.value >= breakpoints.XL);

    return {
        screenSize: screenWidth,
        screenHeight,

        isScreenXS,
        isScreenSM,
        isScreenMD,
        isScreenLG,
        isScreenXL,
    };
});

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useScreenStore, import.meta.hot));
