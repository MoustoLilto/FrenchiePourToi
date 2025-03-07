<template>
    <div class="bg-base-200 text-base-content flex h-full flex-col font-sans">
        <DefaultHeader />

        <main class="flex-auto">
            <RouterView />
        </main>

        <DefaultFooter />
    </div>
</template>

<script setup lang="ts">
import DefaultHeader from '@/components/layouts/DefaultHeader.vue';
import DefaultFooter from '@/components/layouts/DefaultFooter.vue';
</script>
