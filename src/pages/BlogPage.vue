<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-primary mb-8 text-center font-serif text-4xl font-bold">Notre Blog</h1>

        <!-- Section Introduction -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        Conseils et actualités
                    </h2>
                    <p class="mb-4">
                        Bienvenue sur le blog de Frenchie Pour Toi, votre source d'informations sur
                        les bouledogues français. Ici, nous partageons nos connaissances, nos
                        conseils et nos actualités pour vous aider à mieux comprendre et prendre
                        soin de votre compagnon à quatre pattes.
                    </p>
                    <p class="mb-4">
                        De l'alimentation à l'éducation, en passant par la santé et le bien-être,
                        découvrez nos articles rédigés par des passionnés et des professionnels de
                        la race.
                    </p>
                    <p class="mb-6">
                        N'hésitez pas à parcourir les différentes catégories et à nous faire part de
                        vos commentaires et suggestions de sujets.
                    </p>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        :src="blogHeroImg"
                        alt="Blog Frenchie Pour Toi"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>

        <!-- Section Recherche et Filtres -->
        <section class="mb-8">
            <div class="bg-base-200 rounded-lg p-6">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div class="form-control md:col-span-2">
                        <label class="label">
                            <span class="label-text">Rechercher un article</span>
                        </label>
                        <div class="relative">
                            <input
                                v-model="searchQuery"
                                type="text"
                                placeholder="Rechercher par mot-clé..."
                                class="input input-bordered w-full pr-10"
                            />
                            <button
                                class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                            >
                                <i class="icon-[carbon--search]" />
                            </button>
                        </div>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Catégorie</span>
                        </label>
                        <select v-model="selectedCategory" class="select select-bordered w-full">
                            <option value="all">Toutes les catégories</option>
                            <option value="health">Santé</option>
                            <option value="nutrition">Alimentation</option>
                            <option value="training">Éducation</option>
                            <option value="lifestyle">Mode de vie</option>
                            <option value="news">Actualités</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Articles Récents -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Articles Récents
            </h2>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 6" :key="i" class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="getImageUrl(`blog-${i}.jpg`)"
                            alt="Article de blog"
                            class="h-48 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <div class="mb-2 flex items-center gap-2">
                            <span class="badge badge-primary">{{ getRandomCategory() }}</span>
                            <span class="text-neutral text-sm">{{ getRandomDate() }}</span>
                        </div>
                        <h3 class="card-title font-serif">{{ getRandomTitle() }}</h3>
                        <p class="mb-4">{{ getRandomExcerpt() }}</p>
                        <div class="card-actions justify-end">
                            <button class="btn btn-primary btn-sm">Lire l'article</button>
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
                    <button class="join-item btn">»</button>
                </div>
            </div>
        </section>

        <!-- Section Articles Populaires -->
        <section class="bg-base-200 mb-16 rounded-lg p-8">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Articles Populaires
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div v-for="i in 4" :key="i" class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="mb-2 flex items-center gap-2">
                            <span class="badge badge-secondary">{{ getRandomCategory() }}</span>
                        </div>
                        <h3 class="card-title font-serif text-base">{{ getRandomTitle() }}</h3>
                        <div class="card-actions justify-end">
                            <button class="btn btn-ghost btn-sm">Lire</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Catégories -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Explorez par Catégorie
            </h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div class="text-primary mb-4 text-4xl">
                            <i class="icon-[material-symbols--pill]" />
                        </div>
                        <h3 class="card-title font-serif">Santé</h3>
                        <p class="text-sm">Conseils vétérinaires et prévention</p>
                        <div class="card-actions mt-2">
                            <button
                                class="btn btn-ghost btn-sm"
                                @click="selectedCategory = 'health'"
                            >
                                Voir les articles
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div class="text-primary mb-4 text-4xl">
                            <i class="icon-[carbon--restaurant]" />
                        </div>
                        <h3 class="card-title font-serif">Alimentation</h3>
                        <p class="text-sm">Nutrition et régimes adaptés</p>
                        <div class="card-actions mt-2">
                            <button
                                class="btn btn-ghost btn-sm"
                                @click="selectedCategory = 'nutrition'"
                            >
                                Voir les articles
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div class="text-primary mb-4 text-4xl">
                            <i class="icon-[carbon--education]" />
                        </div>
                        <h3 class="card-title font-serif">Éducation</h3>
                        <p class="text-sm">Dressage et comportement</p>
                        <div class="card-actions mt-2">
                            <button
                                class="btn btn-ghost btn-sm"
                                @click="selectedCategory = 'training'"
                            >
                                Voir les articles
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div class="text-primary mb-4 text-4xl">
                            <i class="icon-[carbon--home]" />
                        </div>
                        <h3 class="card-title font-serif">Mode de vie</h3>
                        <p class="text-sm">Vie quotidienne et activités</p>
                        <div class="card-actions mt-2">
                            <button
                                class="btn btn-ghost btn-sm"
                                @click="selectedCategory = 'lifestyle'"
                            >
                                Voir les articles
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div class="text-primary mb-4 text-4xl">
                            <i class="icon-[carbon--notification]" />
                        </div>
                        <h3 class="card-title font-serif">Actualités</h3>
                        <p class="text-sm">Nouvelles de l'élevage</p>
                        <div class="card-actions mt-2">
                            <button class="btn btn-ghost btn-sm" @click="selectedCategory = 'news'">
                                Voir les articles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Newsletter -->
        <section class="bg-primary/10 mb-16 rounded-lg p-8">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h2 class="text-primary mb-4 font-serif text-2xl font-bold">
                        Abonnez-vous à notre newsletter
                    </h2>
                    <p class="mb-6">
                        Recevez nos derniers articles, conseils et actualités directement dans votre
                        boîte mail. Nous envoyons notre newsletter une fois par mois, et nous ne
                        partageons jamais vos informations personnelles.
                    </p>
                </div>
                <div class="flex items-center">
                    <form class="w-full" @submit.prevent="subscribeNewsletter">
                        <div class="flex flex-col gap-4 sm:flex-row">
                            <input
                                v-model="newsletterEmail"
                                type="email"
                                placeholder="Votre adresse email"
                                class="input input-bordered flex-1"
                                required
                            />
                            <button type="submit" class="btn btn-primary">S'abonner</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- Section CTA -->
        <section class="bg-base-200 rounded-lg p-8 text-center">
            <h2 class="text-primary mb-4 font-serif text-3xl font-bold">
                Vous avez des questions ?
            </h2>
            <p class="mx-auto mb-6 max-w-2xl">
                N'hésitez pas à nous contacter si vous avez des questions sur nos bouledogues
                français ou si vous souhaitez en savoir plus sur un sujet particulier.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <RouterLink :to="{ name: ROUTE_NAMES.CONTACT }" class="btn btn-primary">
                    Nous contacter
                </RouterLink>
                <RouterLink :to="{ name: ROUTE_NAMES.PUPPIES }" class="btn btn-outline">
                    Voir nos chiots
                </RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { getImageUrl } from '@/services/assetsService';
import { ref } from 'vue';

const searchQuery = ref('');
const selectedCategory = ref('all');
const newsletterEmail = ref('');

const blogHeroImg = getImageUrl('blog-hero.jpg');

// Données fictives pour la démo
const categories = ['Santé', 'Alimentation', 'Éducation', 'Mode de vie', 'Actualités'];

const titles = [
    'Comment prendre soin des plis de votre bouledogue français',
    'Les meilleures croquettes pour bouledogues français',
    'Éduquer votre bouledogue français : les bases',
    'Activités adaptées pour votre bouledogue français',
    "Préparer l'arrivée de votre chiot bouledogue",
    'Les problèmes de santé courants chez le bouledogue français',
    'Voyager avec votre bouledogue français',
    "L'importance de la socialisation pour votre chiot",
];

const excerpts = [
    'Découvrez nos conseils pour prendre soin des plis de votre bouledogue français et éviter les problèmes de peau...',
    "L'alimentation joue un rôle crucial dans la santé de votre bouledogue français. Voici notre sélection de croquettes adaptées...",
    "L'éducation de votre bouledogue français doit commencer dès son plus jeune âge. Découvrez nos techniques efficaces...",
    "Malgré leur apparence, les bouledogues français sont des chiens actifs qui ont besoin d'exercice adapté à leur morphologie...",
    "L'arrivée d'un chiot bouledogue français nécessite une préparation minutieuse. Voici notre guide complet...",
];

// Fonctions pour générer des données aléatoires
const getRandomCategory = () => {
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
};

const getRandomTitle = () => {
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
};

const getRandomExcerpt = () => {
    const randomIndex = Math.floor(Math.random() * excerpts.length);
    return excerpts[randomIndex];
};

const getRandomDate = () => {
    const months = [
        'janvier',
        'février',
        'mars',
        'avril',
        'mai',
        'juin',
        'juillet',
        'août',
        'septembre',
        'octobre',
        'novembre',
        'décembre',
    ];
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const randomYear = 2023;
    return `${randomDay} ${randomMonth} ${randomYear}`;
};

// Fonction pour s'abonner à la newsletter
const subscribeNewsletter = () => {
    // Ici, vous pourriez implémenter la logique d'envoi du formulaire
    // Par exemple, envoyer les données à une API
    console.log('Email soumis:', newsletterEmail.value);
    alert('Merci de vous être abonné à notre newsletter !');

    // Réinitialiser le formulaire
    newsletterEmail.value = '';
};
</script>
