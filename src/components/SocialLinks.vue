<template>
    <div class="flex gap-3">
        <a href="https://facebook.com/frenchiepoutoi" target="_blank" class="icon-btn">
            <i class="icon-[carbon--logo-facebook]" />
            <span v-if="withLabel">Facebook</span>
        </a>

        <a href="https://instagram.com/frenchiepoutoi" target="_blank" class="icon-btn">
            <i class="icon-[carbon--logo-instagram]" />
            <span v-if="withLabel">Instagram</span>
        </a>

        <a href="https://tiktok.com/@frenchiepoutoi" target="_blank" class="icon-btn">
            <i class="icon-[carbon--logo-tiktok]" />
            <span v-if="withLabel">TikTok</span>
        </a>

        <a href="https://youtube.com/c/frenchiepoutoi" target="_blank" class="icon-btn">
            <i class="icon-[carbon--logo-youtube]" />
            <span v-if="withLabel">YouTube</span>
        </a>
    </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ withLabel?: boolean }>(), {
    withLabel: false,
});
</script>
