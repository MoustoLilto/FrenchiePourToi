<template>
    <div ref="menuRef" class="relative">
        <div class="flex-center" @click="toggleMenu()">
            <slot name="trigger">Open menu</slot>
        </div>

        <Transition name="flyout">
            <div v-if="isMenuDisplayed" v-bind="$attrs" class="absolute right-0 z-10 flex w-max">
                <slot>
                    <div class="card bg-base-100 w-30 rounded-sm">
                        <div class="card-body">
                            <h2 class="card-title">Menu</h2>
                        </div>
                    </div>
                </slot>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
});
const emit = defineEmits(['onMenuToggle', 'onMenuClose']);

const menuRef = ref<HTMLDivElement | null>(null);
useOnClickOutside(menuRef, closeMenu);
useOnKeyUp('Escape', closeMenu);

const isMenuDisplayed = ref(false);
function toggleMenu() {
    emit('onMenuToggle');
    isMenuDisplayed.value = !isMenuDisplayed.value;
}
function closeMenu() {
    emit('onMenuClose');
    isMenuDisplayed.value = false;
}
</script>
