<template>
    <div>
        <MKitMenu class="top-full">
            <template #trigger>
                <i class="icon-[carbon--menu] icon-btn" />
            </template>

            <div
                class="card card-sm bg-base-200/80 shadow-base-content/5 ring-base-content/5 w-max overflow-hidden shadow-lg ring-1 backdrop-blur"
            >
                <div class="card-body">
                    <nav class="text-base">
                        <ul>
                            <li v-for="item in routes" :key="item.name">
                                <RouterLink
                                    :to="{ name: item.name }"
                                    class="hover:text-primary flex-between group relative flex w-full text-nowrap py-2 transition"
                                    :class="{
                                        'text-primary': isActive(item.name),
                                    }"
                                >
                                    <span>{{ item.label }}</span>

                                    <i
                                        v-if="!isActive(item.name)"
                                        class="icon-[carbon--arrow-up-right] group-hover:icon-over-[carbon--arrow-right]"
                                    />
                                    <i v-else class="icon-[carbon--arrow-left]" />
                                </RouterLink>
                            </li>
                        </ul>
                    </nav>

                    <div class="border-1 border-base-content/20" />

                    <div class="flex-center mt-2 gap-x-3 text-2xl font-semibold">
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </MKitMenu>
    </div>
</template>

<script setup lang="ts">
import MKitMenu from '@/components/mKit/MKitMenu.vue';
import SocialLinks from '@/components/SocialLinks.vue';

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
