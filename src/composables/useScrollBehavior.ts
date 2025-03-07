export function useScrollBehavior(onScrollDown = () => {}, onScrollUp = () => {}, margin = 2) {
    const isAtTheTop = ref(true);
    const scrollY = ref(0);
    const lastScrollY = ref(0);

    const handleScroll = () => {
        scrollY.value = window.scrollY;
        isAtTheTop.value = scrollY.value <= margin;

        if (scrollY.value > lastScrollY.value + margin) {
            onScrollDown();
            lastScrollY.value = scrollY.value;
        } else if (scrollY.value < lastScrollY.value - margin) {
            onScrollUp();
            lastScrollY.value = scrollY.value;
        }
    };

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    return { isAtTheTop, scrollY };
}
