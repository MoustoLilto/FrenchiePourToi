export function useOnKeyUp(keyCode: string, fn: () => void) {
    function onKeyUp(event: KeyboardEvent) {
        if (event.code === keyCode) {
            fn();
        }
    }

    onMounted(() => {
        document.addEventListener('keyup', onKeyUp);
    });

    onUnmounted(() => {
        document.removeEventListener('keyup', onKeyUp);
    });
}
