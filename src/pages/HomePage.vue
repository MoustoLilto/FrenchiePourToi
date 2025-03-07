<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Section Présentation -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        Bienvenue chez Frenchie Pour Toi
                    </h2>
                    <p class="mb-4">
                        Nous sommes un élevage familial spécialisé dans les bouledogues français de
                        qualité. Nos chiots sont élevés avec amour et attention pour devenir vos
                        fidèles compagnons.
                    </p>
                    <p class="mb-6">
                        Chaque chiot est issu de parents sélectionnés pour leur santé, leur
                        tempérament et leur conformité aux standards de la race. Nous mettons tout
                        en œuvre pour vous offrir des chiots en parfaite santé et bien socialisés.
                    </p>
                    <div class="flex gap-4">
                        <RouterLink :to="{ name: ROUTE_NAMES.PUPPIES }" class="btn btn-primary">
                            Voir nos chiots
                        </RouterLink>
                        <RouterLink :to="{ name: ROUTE_NAMES.RESERVATION }" class="btn btn-outline">
                            Réserver un chiot
                        </RouterLink>
                    </div>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        src="@/assets/frenchie-family.jpg"
                        alt="Famille de bouledogues français"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>

        <!-- Section Derniers Chiots -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Nos derniers chiots
            </h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 3" :key="i" class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="`@/assets/puppy-${i}.jpg`"
                            alt="Chiot bouledogue français"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Chiot {{ i }}</h3>
                        <p>
                            Adorable chiot bouledogue français, né le 15 mars 2023. Disponible à
                            partir du 15 mai 2023.
                        </p>
                        <div class="card-actions justify-end">
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.PUPPIES }"
                                class="btn btn-primary btn-sm"
                            >
                                En savoir plus
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-center">
                <RouterLink :to="{ name: ROUTE_NAMES.PUPPIES }" class="btn btn-outline">
                    Voir tous nos chiots
                </RouterLink>
            </div>
        </section>

        <!-- Section Pourquoi nous choisir -->
        <section class="bg-base-200 mb-16 rounded-lg p-8">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Pourquoi nous choisir ?
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div class="card bg-base-100">
                    <div class="card-body items-center text-center">
                        <i class="icon-[carbon--certificate] text-primary text-5xl" />
                        <h3 class="card-title font-serif">Qualité garantie</h3>
                        <p>
                            Nos chiots sont issus de lignées sélectionnées pour leur santé et leur
                            conformité aux standards de la race.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100">
                    <div class="card-body items-center text-center">
                        <i class="icon-[carbon--medical-cross] text-primary text-5xl" />
                        <h3 class="card-title font-serif">Suivi vétérinaire</h3>
                        <p>
                            Tous nos chiots bénéficient d'un suivi vétérinaire complet et sont
                            vendus vaccinés et identifiés.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100">
                    <div class="card-body items-center text-center">
                        <i class="icon-[carbon--home] text-primary text-5xl" />
                        <h3 class="card-title font-serif">Élevage familial</h3>
                        <p>
                            Nos chiots grandissent dans un environnement familial, ce qui favorise
                            leur socialisation et leur équilibre.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Témoignages -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Ce que disent nos clients
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 3" :key="i" class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="mb-2 flex">
                            <i
                                v-for="j in 5"
                                :key="j"
                                class="icon-[carbon--star-filled] text-warning"
                            />
                        </div>
                        <p class="mb-4 italic">
                            "Notre bouledogue est merveilleux ! Nous sommes ravis de l'avoir adopté
                            chez Frenchie Pour Toi. Un grand merci pour votre professionnalisme et
                            votre gentillesse."
                        </p>
                        <div class="flex items-center gap-4">
                            <div class="avatar">
                                <div class="w-12 rounded-full">
                                    <img :src="`@/assets/client-${i}.jpg`" alt="Client" />
                                </div>
                            </div>
                            <div>
                                <h3 class="font-bold">Client {{ i }}</h3>
                                <p class="text-sm">Propriétaire depuis 2022</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Blog -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Derniers articles
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 3" :key="i" class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="`@/assets/blog-${i}.jpg`"
                            alt="Article de blog"
                            class="h-48 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">
                            Comment prendre soin de votre bouledogue français
                        </h3>
                        <p>
                            Découvrez nos conseils pour prendre soin de votre bouledogue français et
                            lui assurer une vie saine et heureuse.
                        </p>
                        <div class="card-actions justify-end">
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.BLOG }"
                                class="btn btn-primary btn-sm"
                            >
                                Lire l'article
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-center">
                <RouterLink :to="{ name: ROUTE_NAMES.BLOG }" class="btn btn-outline">
                    Voir tous les articles
                </RouterLink>
            </div>
        </section>

        <!-- Section Contact -->
        <section class="bg-primary/10 rounded-lg p-8">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">Contactez-nous</h2>
                    <p class="mb-6">
                        Vous avez des questions sur nos chiots ou vous souhaitez réserver une visite
                        ? N'hésitez pas à nous contacter, nous serons ravis de vous répondre.
                    </p>
                    <div class="mb-4 flex items-center gap-2">
                        <i class="icon-[carbon--location] text-primary" />
                        <span>123 Rue des Bouledogues, 75000 Paris</span>
                    </div>
                    <div class="mb-4 flex items-center gap-2">
                        <i class="icon-[carbon--phone] text-primary" />
                        <span>+33 1 23 45 67 89</span>
                    </div>
                    <div class="mb-4 flex items-center gap-2">
                        <i class="icon-[carbon--email] text-primary" />
                        <span>contact@frenchiepoutoi.fr</span>
                    </div>
                    <div class="mt-6">
                        <SocialLinks withLabel />
                    </div>
                </div>
                <div>
                    <form class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Nom</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Votre nom"
                                    class="input input-bordered"
                                />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    class="input input-bordered"
                                />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Message</span>
                                </label>
                                <textarea
                                    class="textarea textarea-bordered"
                                    placeholder="Votre message"
                                    rows="4"
                                />
                            </div>
                            <div class="form-control mt-6">
                                <button class="btn btn-primary">Envoyer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import SocialLinks from '@/components/SocialLinks.vue';
</script>
