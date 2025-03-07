export function useOnClickOutside(targetRef: Ref, callback: () => void, delay = 0) {
    let timeout: NodeJS.Timeout;

    const onClickOutside = (event: Event) => {
        if (targetRef.value && !targetRef.value.contains(event.target)) {
            callback();
        }
    };

    onMounted(() => {
        timeout = setTimeout(() => {
            document.addEventListener('click', onClickOutside);
        }, delay);
    });

    onUnmounted(() => {
        clearTimeout(timeout);
        document.removeEventListener('click', onClickOutside);
    });
}
