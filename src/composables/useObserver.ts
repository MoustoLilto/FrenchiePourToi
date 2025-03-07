export function useObserver(
    targetRef: Ref,
    intersectionCallback = () => {},
    unintersectionCallback = () => {},
    threshold = 0
) {
    const isVisible = ref(false);

    const observer = new IntersectionObserver(
        (entries) => {
            const sentinel = entries[0];
            if (sentinel.isIntersecting) {
                isVisible.value = true;
                intersectionCallback();
            } else {
                isVisible.value = false;
                unintersectionCallback();
            }
        },
        { threshold }
    );

    onMounted(() => {
        observer.observe(targetRef.value);
    });

    onUnmounted(() => {
        observer.disconnect();
    });

    return { isVisible };
}
