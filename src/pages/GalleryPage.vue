<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-primary mb-8 text-center font-serif text-4xl font-bold">Galerie Photos</h1>

        <!-- Section Introduction -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        Découvrez nos bouledogues en images
                    </h2>
                    <p class="mb-4">
                        Bienvenue dans notre galerie photo où vous pourrez découvrir nos adorables
                        bouledogues français dans leur quotidien. Ces images capturent leur
                        personnalité unique, leur charme irrésistible et les moments précieux qu'ils
                        partagent avec nous.
                    </p>
                    <p class="mb-4">
                        De nos chiots joueurs à nos reproducteurs adultes, en passant par les
                        moments de complicité avec leurs familles, cette galerie vous offre un
                        aperçu de la vie de nos bouledogues français.
                    </p>
                    <p class="mb-6">
                        N'hésitez pas à parcourir les différentes catégories pour découvrir toutes
                        nos photos.
                    </p>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        :src="galleryHeroImg"
                        alt="Galerie de bouledogues français"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>

        <!-- Section Filtres -->
        <section class="mb-8">
            <div class="bg-base-200 rounded-lg p-6">
                <h2 class="mb-4 font-serif text-2xl font-bold">Filtrer les photos</h2>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Catégorie</span>
                        </label>
                        <select v-model="selectedCategory" class="select select-bordered w-full">
                            <option value="all">Toutes les catégories</option>
                            <option value="puppies">Chiots</option>
                            <option value="adults">Adultes</option>
                            <option value="families">Familles</option>
                            <option value="events">Événements</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Couleur</span>
                        </label>
                        <select v-model="selectedColor" class="select select-bordered w-full">
                            <option value="all">Toutes les couleurs</option>
                            <option value="fauve">Fauve</option>
                            <option value="bringé">Bringé</option>
                            <option value="creme">Crème</option>
                            <option value="bleu">Bleu</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Trier par</span>
                        </label>
                        <select v-model="sortBy" class="select select-bordered w-full">
                            <option value="newest">Plus récentes</option>
                            <option value="oldest">Plus anciennes</option>
                            <option value="popular">Plus populaires</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Galerie -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                <div
                    v-for="i in 16"
                    :key="i"
                    class="group relative overflow-hidden rounded-lg shadow-lg"
                >
                    <img
                        :src="getImageUrl(`gallery-${i}.jpg`)"
                        :alt="`Photo de bouledogue français ${i}`"
                        class="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div
                        class="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                        <div class="text-white">
                            <h3 class="font-serif text-lg font-bold">Bouledogue {{ i }}</h3>
                            <p class="text-sm">{{ getRandomDescription() }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="mt-8 flex justify-center">
                <div class="join">
                    <button class="join-item btn">«</button>
                    <button class="join-item btn btn-active">1</button>
                    <button class="join-item btn">2</button>
                    <button class="join-item btn">3</button>
                    <button class="join-item btn">4</button>
                    <button class="join-item btn">»</button>
                </div>
            </div>
        </section>

        <!-- Section Albums -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Nos albums photo
            </h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="albumPuppiesImg"
                            alt="Album chiots"
                            class="h-48 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Nos adorables chiots</h3>
                        <p>
                            Découvrez nos chiots bouledogues français, de leur naissance à leur
                            départ pour leur nouvelle famille.
                        </p>
                        <div class="card-actions justify-end">
                            <button
                                class="btn btn-primary btn-sm"
                                @click="selectedCategory = 'puppies'"
                            >
                                Voir l'album
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="albumAdultsImg"
                            alt="Album adultes"
                            class="h-48 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Nos reproducteurs</h3>
                        <p>
                            Admirez nos magnifiques reproducteurs, sélectionnés pour leur beauté,
                            leur santé et leur tempérament.
                        </p>
                        <div class="card-actions justify-end">
                            <button
                                class="btn btn-primary btn-sm"
                                @click="selectedCategory = 'adults'"
                            >
                                Voir l'album
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="albumFamiliesImg"
                            alt="Album familles"
                            class="h-48 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Nos chiots dans leur famille</h3>
                        <p>
                            Retrouvez les photos de nos chiots dans leur nouvelle famille, heureux
                            et épanouis.
                        </p>
                        <div class="card-actions justify-end">
                            <button
                                class="btn btn-primary btn-sm"
                                @click="selectedCategory = 'families'"
                            >
                                Voir l'album
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Vidéos -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">Nos vidéos</h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div class="card bg-base-100 shadow-xl">
                    <div class="bg-base-200 flex aspect-video items-center justify-center">
                        <p class="text-center">
                            Vidéo de nos chiots
                            <br />
                            <span class="text-sm">(Intégration YouTube à venir)</span>
                        </p>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Nos chiots en action</h3>
                        <p>
                            Regardez nos adorables chiots jouer et découvrir le monde qui les
                            entoure.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="bg-base-200 flex aspect-video items-center justify-center">
                        <p class="text-center">
                            Vidéo de notre élevage
                            <br />
                            <span class="text-sm">(Intégration YouTube à venir)</span>
                        </p>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Visite de notre élevage</h3>
                        <p>
                            Découvrez notre élevage et nos installations dédiées au bien-être de nos
                            bouledogues.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Partagez vos photos -->
        <section class="bg-base-200 mb-16 rounded-lg p-8">
            <h2 class="text-primary mb-6 text-center font-serif text-3xl font-bold">
                Partagez vos photos
            </h2>
            <p class="mb-6 text-center">
                Vous êtes l'heureux propriétaire d'un de nos bouledogues français ? Partagez vos
                plus belles photos avec nous et rejoignez notre communauté !
            </p>
            <div class="flex justify-center">
                <button class="btn btn-primary">
                    <i class="icon-[carbon--upload] mr-2" />
                    Envoyer vos photos
                </button>
            </div>
        </section>

        <!-- Section CTA -->
        <section class="bg-primary/10 rounded-lg p-8 text-center">
            <h2 class="text-primary mb-4 font-serif text-3xl font-bold">
                Vous aimez ce que vous voyez ?
            </h2>
            <p class="mx-auto mb-6 max-w-2xl">
                Nos bouledogues français sont élevés avec amour et attention. Si vous souhaitez
                accueillir l'un de nos adorables chiots dans votre famille, n'hésitez pas à nous
                contacter.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <RouterLink :to="{ name: ROUTE_NAMES.PUPPIES }" class="btn btn-primary">
                    Voir nos chiots
                </RouterLink>
                <RouterLink :to="{ name: ROUTE_NAMES.CONTACT }" class="btn btn-outline">
                    Nous contacter
                </RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { getImageUrl } from '@/services/assetsService';
import { ref } from 'vue';

const selectedCategory = ref('all');
const selectedColor = ref('all');
const sortBy = ref('newest');

const galleryHeroImg = getImageUrl('gallery-hero.jpg');
const albumPuppiesImg = getImageUrl('album-puppies.jpg');
const albumAdultsImg = getImageUrl('album-adults.jpg');
const albumFamiliesImg = getImageUrl('album-families.jpg');

// Fonction pour générer des descriptions aléatoires pour les photos
const descriptions = [
    'Moment de jeu dans le jardin',
    'Sieste au soleil',
    'Câlin avec son maître',
    'Premier jour à la maison',
    'Exploration du jardin',
    'Séance photo professionnelle',
    'Moment de complicité',
    'Journée à la plage',
];

const getRandomDescription = () => {
    const randomIndex = Math.floor(Math.random() * descriptions.length);
    return descriptions[randomIndex];
};
</script>
