<template>
    <form class="space-y-6">
        <div>
            <label class="mb-2 block font-heading" for="name">Nom</label>
            <input
                id="name"
                type="text"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
            />
        </div>
        <div>
            <label class="mb-2 block font-heading" for="email">Email</label>
            <input
                id="email"
                type="email"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
            />
        </div>
        <div>
            <label class="mb-2 block font-heading" for="message">Message</label>
            <textarea
                id="message"
                rows="6"
                class="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                required
            />
        </div>
        <button type="submit" class="w-full btn-primary">Envoyer</button>
    </form>
</template>

<script setup lang="ts"></script>
