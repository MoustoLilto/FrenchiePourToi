<template>
    <div class="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
        <h3 class="heading-3">{{ project.title }}</h3>
        <p class="mb-4 body-text">{{ project.description }}</p>
        <div class="mb-4 flex flex-wrap gap-2">
            <span
                v-for="tech in project.technologies"
                :key="tech"
                class="rounded bg-secondary/10 px-2 py-1 text-sm"
            >
                {{ tech }}
            </span>
        </div>
        <a :href="project.link" class="group link text-secondary">
            Preview
            <i class="icon-[material-symbols--open-in-new] hidden group-hover:inline-block" />
        </a>
    </div>
</template>

<script setup lang="ts">
import type { Project } from '@/types';

defineProps<{
    project: Project;
}>();
</script>
