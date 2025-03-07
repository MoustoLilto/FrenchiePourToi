<template>
    <div class="info-section">
        <i class="icon-[carbon--search] info-section-icon" />
        <div class="info-section-title">{{ title }}</div>
        <div class="info-section-subtitle">
            {{ subtitle }}
        </div>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    title?: string;
    subtitle?: string;
    icon?: string;
}

withDefaults(defineProps<Props>(), {
    title: 'Aucun résultat',
    subtitle: "Nous n'avons pas trouvé de résultats correspondant à votre recherche.",
    icon: 'carbon:search',
});
</script>
