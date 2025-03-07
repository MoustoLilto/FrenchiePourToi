<template>
    <nav class="flex-center pointer-events-auto flex-1">
        <ul
            class="bg-base-200/80 text-base-content/80 rounded-(--radius-selector) shadow-base-content/5 ring-base-content/5 flex-center px-8 text-base font-medium shadow-lg ring-1 backdrop-blur"
        >
            <li v-for="item in routes" :key="item.name">
                <RouterLink
                    :to="{ name: item.name }"
                    class="hover:text-primary relative block text-nowrap px-3 py-2 transition"
                    :class="{
                        'text-primary': isActive(item.name),
                    }"
                >
                    {{ item.label }}

                    <div
                        v-if="isActive(item.name)"
                        class="bg-linear-to-r from-primary/0 via-primary/40 to-primary/0 absolute inset-x-1 -bottom-px h-[2px]"
                    />
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
defineProps<{
    routes: {
        label: string;
        name: string;
    }[];
}>();

const route = useRoute();
const isActive = (routeName: string) => {
    return route.name === routeName;
};
</script>
