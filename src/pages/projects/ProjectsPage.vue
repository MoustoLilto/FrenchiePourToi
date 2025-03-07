<template>
    <div>
        <h1>Projects</h1>
        <div v-for="project in projects" :key="project.title">
            <h2>{{ project.title }}</h2>
            <p>{{ project.description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { projects } from '@/data/projects';
</script>
