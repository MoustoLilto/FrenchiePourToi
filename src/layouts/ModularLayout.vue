<template>
    <div class="h-full bg-background text-text font-sans">
        <RouterView name="Header" />

        <main class="flex-1 pt-16">
            <RouterView />
        </main>

        <RouterView name="Footer" />
    </div>
</template>
