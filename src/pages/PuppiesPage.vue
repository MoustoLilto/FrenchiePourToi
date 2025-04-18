<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-primary mb-8 text-center font-serif text-4xl font-bold">Nos Chiots</h1>

        <!-- Section Introduction -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        Nos adorables bouledogues français
                    </h2>
                    <p class="mb-4">
                        Découvrez nos adorables chiots bouledogues français disponibles à la
                        réservation. Tous nos chiots sont élevés avec amour et attention dans un
                        environnement familial.
                    </p>
                    <p class="mb-4">
                        Chaque chiot est issu de parents sélectionnés pour leur santé, leur
                        tempérament et leur conformité aux standards de la race. Nous mettons tout
                        en œuvre pour vous offrir des chiots en parfaite santé et bien socialisés.
                    </p>
                    <p class="mb-6">
                        Nos chiots sont disponibles à partir de 8 semaines, âge légal minimum pour
                        la cession d'un chiot. Ils sont vendus avec un certificat de bonne santé, un
                        carnet de santé à jour, une puce électronique et une garantie écrite.
                    </p>
                    <div class="flex gap-4">
                        <RouterLink :to="{ name: ROUTE_NAMES.RESERVATION }" class="btn btn-primary">
                            Réserver un chiot
                        </RouterLink>
                        <RouterLink :to="{ name: ROUTE_NAMES.CONTACT }" class="btn btn-outline">
                            Nous contacter
                        </RouterLink>
                    </div>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        :src="puppiesHeroImg"
                        alt="Chiots bouledogues français"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>

        <!-- Section Filtres -->
        <section class="mb-8">
            <div class="bg-base-200 rounded-lg p-6">
                <h2 class="mb-4 font-serif text-2xl font-bold">Filtrer les chiots</h2>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Sexe</span>
                        </label>
                        <select class="select select-bordered w-full">
                            <option value="">Tous</option>
                            <option value="male">Mâle</option>
                            <option value="female">Femelle</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Couleur</span>
                        </label>
                        <select class="select select-bordered w-full">
                            <option value="">Toutes</option>
                            <option value="fauve">Fauve</option>
                            <option value="bringé">Bringé</option>
                            <option value="creme">Crème</option>
                            <option value="bleu">Bleu</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Disponibilité</span>
                        </label>
                        <select class="select select-bordered w-full">
                            <option value="">Toutes</option>
                            <option value="available">Disponibles</option>
                            <option value="reserved">Réservés</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Chiots Disponibles -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Chiots disponibles
            </h2>
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 6" :key="i" class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="getImageUrl(`puppy-${i}.jpg`)"
                            alt="Chiot bouledogue français"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <div class="flex justify-between">
                            <h3 class="card-title font-serif">Chiot {{ i }}</h3>
                            <div class="badge badge-primary">Disponible</div>
                        </div>
                        <div class="my-2 flex flex-wrap gap-2">
                            <div class="badge badge-outline">Mâle</div>
                            <div class="badge badge-outline">Fauve</div>
                            <div class="badge badge-outline">Né le 15/03/2023</div>
                        </div>
                        <p class="mb-4">
                            Adorable chiot bouledogue français, joueur et affectueux. Il est issu de
                            parents sélectionnés pour leur santé et leur tempérament.
                        </p>
                        <div class="card-actions justify-between">
                            <span class="text-primary text-lg font-bold">2 500 €</span>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.RESERVATION }"
                                class="btn btn-primary btn-sm"
                            >
                                Réserver
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Chiots Réservés -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Chiots réservés
            </h2>
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 3" :key="i" class="card bg-base-100 shadow-xl">
                    <figure class="relative">
                        <img
                            :src="getImageUrl(`puppy-reserved-${i}.jpg`)"
                            alt="Chiot bouledogue français"
                            class="h-64 w-full object-cover opacity-70"
                        />
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="badge badge-lg badge-secondary">Réservé</div>
                        </div>
                    </figure>
                    <div class="card-body">
                        <div class="flex justify-between">
                            <h3 class="card-title font-serif">Chiot R{{ i }}</h3>
                            <div class="badge badge-secondary">Réservé</div>
                        </div>
                        <div class="my-2 flex flex-wrap gap-2">
                            <div class="badge badge-outline">Femelle</div>
                            <div class="badge badge-outline">Bringé</div>
                            <div class="badge badge-outline">Née le 10/02/2023</div>
                        </div>
                        <p class="mb-4">
                            Adorable chiot bouledogue français, joueuse et affectueuse. Elle est
                            issue de parents sélectionnés pour leur santé et leur tempérament.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Prochaines Portées -->
        <section class="bg-base-200 mb-16 rounded-lg p-8">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Prochaines portées
            </h2>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title font-serif">Portée prévue en juin 2023</h3>
                        <p class="mb-4">
                            Une portée est prévue pour juin 2023 entre notre femelle Luna (fauve) et
                            notre mâle Max (bringé). Les chiots seront disponibles à partir d'août
                            2023.
                        </p>
                        <div class="card-actions justify-end">
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.CONTACT }"
                                class="btn btn-primary btn-sm"
                            >
                                Pré-réserver
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h3 class="card-title font-serif">Portée prévue en septembre 2023</h3>
                        <p class="mb-4">
                            Une portée est prévue pour septembre 2023 entre notre femelle Bella
                            (bringé) et notre mâle Oscar (fauve). Les chiots seront disponibles à
                            partir de novembre 2023.
                        </p>
                        <div class="card-actions justify-end">
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.CONTACT }"
                                class="btn btn-primary btn-sm"
                            >
                                Pré-réserver
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section FAQ -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Questions fréquentes
            </h2>
            <div class="space-y-4">
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" checked="true" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Comment réserver un chiot ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Pour réserver un chiot, vous pouvez nous contacter par téléphone, email
                            ou via notre formulaire de contact. Un acompte de 30% du prix du chiot
                            est demandé pour confirmer la réservation. Le solde est à régler lors de
                            la remise du chiot.
                        </p>
                    </div>
                </div>
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        À quel âge les chiots sont-ils disponibles ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Nos chiots sont disponibles à partir de 8 semaines, âge légal minimum
                            pour la cession d'un chiot. Cela leur permet de rester suffisamment
                            longtemps avec leur mère et leurs frères et sœurs pour une bonne
                            socialisation.
                        </p>
                    </div>
                </div>
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Quels documents sont fournis avec le chiot ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Chaque chiot est vendu avec un certificat de bonne santé délivré par
                            notre vétérinaire, un carnet de santé à jour des vaccinations, une puce
                            électronique, un certificat de naissance LOF (si applicable), un contrat
                            de vente et une garantie écrite.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section CTA -->
        <section class="bg-primary/10 rounded-lg p-8 text-center">
            <h2 class="text-primary mb-4 font-serif text-3xl font-bold">
                Prêt à accueillir un bouledogue français ?
            </h2>
            <p class="mx-auto mb-6 max-w-2xl">
                Contactez-nous dès aujourd'hui pour en savoir plus sur nos chiots disponibles ou
                pour réserver une visite de notre élevage. Nous serons ravis de vous accueillir et
                de vous présenter nos bouledogues.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <RouterLink :to="{ name: ROUTE_NAMES.RESERVATION }" class="btn btn-primary">
                    Réserver un chiot
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

const puppiesHeroImg = getImageUrl('puppies-hero.jpg');
</script>
