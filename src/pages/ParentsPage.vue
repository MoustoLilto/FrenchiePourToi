<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-primary mb-8 text-center font-serif text-4xl font-bold">Nos Parents</h1>

        <!-- Section Introduction -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        Des reproducteurs d'exception
                    </h2>
                    <p class="mb-4">
                        Chez Frenchie Pour Toi, nous sélectionnons avec soin nos reproducteurs pour
                        garantir la qualité de nos chiots. Nos bouledogues français sont choisis
                        pour leur santé, leur tempérament équilibré et leur conformité aux standards
                        de la race.
                    </p>
                    <p class="mb-4">
                        Tous nos reproducteurs sont testés pour les principales maladies génétiques
                        qui peuvent affecter la race. Nous veillons également à leur bien-être
                        physique et émotionnel, car des parents en bonne santé donnent naissance à
                        des chiots en bonne santé.
                    </p>
                    <p class="mb-6">
                        Découvrez ci-dessous nos magnifiques reproducteurs, qui sont avant tout des
                        membres à part entière de notre famille.
                    </p>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        :src="parentsHeroImg"
                        alt="Parents bouledogues français"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>

        <!-- Section Nos Femelles -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Nos Femelles
            </h2>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="female1Img"
                            alt="Femelle bouledogue français"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Luna</h3>
                        <div class="my-2 flex flex-wrap gap-2">
                            <div class="badge badge-outline">Fauve</div>
                            <div class="badge badge-outline">3 ans</div>
                            <div class="badge badge-outline">LOF</div>
                        </div>
                        <p class="mb-4">
                            Luna est notre première femelle reproductrice. Douce et affectueuse,
                            elle est une excellente mère pour ses chiots. Elle a un caractère
                            équilibré et une santé de fer.
                        </p>
                        <div class="collapse-arrow bg-base-200 collapse">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">Voir ses tests de santé</div>
                            <div class="collapse-content">
                                <ul class="list-disc pl-5">
                                    <li>Test ADN : Clear</li>
                                    <li>Test BOAS : Grade 0</li>
                                    <li>Test Patella : 0/0</li>
                                    <li>Test Cardiaque : Normal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="female2Img"
                            alt="Femelle bouledogue français"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Bella</h3>
                        <div class="my-2 flex flex-wrap gap-2">
                            <div class="badge badge-outline">Bringé</div>
                            <div class="badge badge-outline">2 ans</div>
                            <div class="badge badge-outline">LOF</div>
                        </div>
                        <p class="mb-4">
                            Bella est notre deuxième femelle reproductrice. Joueuse et pleine
                            d'énergie, elle transmet son tempérament joyeux à ses chiots. Elle est
                            très attachée à sa famille.
                        </p>
                        <div class="collapse-arrow bg-base-200 collapse">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">Voir ses tests de santé</div>
                            <div class="collapse-content">
                                <ul class="list-disc pl-5">
                                    <li>Test ADN : Clear</li>
                                    <li>Test BOAS : Grade 0</li>
                                    <li>Test Patella : 0/0</li>
                                    <li>Test Cardiaque : Normal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="female3Img"
                            alt="Femelle bouledogue français"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Ruby</h3>
                        <div class="my-2 flex flex-wrap gap-2">
                            <div class="badge badge-outline">Crème</div>
                            <div class="badge badge-outline">2.5 ans</div>
                            <div class="badge badge-outline">LOF</div>
                        </div>
                        <p class="mb-4">
                            Ruby est notre troisième femelle reproductrice. Calme et posée, elle est
                            très attentionnée avec ses chiots. Elle a une excellente structure et
                            une santé robuste.
                        </p>
                        <div class="collapse-arrow bg-base-200 collapse">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">Voir ses tests de santé</div>
                            <div class="collapse-content">
                                <ul class="list-disc pl-5">
                                    <li>Test ADN : Clear</li>
                                    <li>Test BOAS : Grade 0</li>
                                    <li>Test Patella : 0/0</li>
                                    <li>Test Cardiaque : Normal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Nos Mâles -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">Nos Mâles</h2>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="male1Img"
                            alt="Mâle bouledogue français"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Max</h3>
                        <div class="my-2 flex flex-wrap gap-2">
                            <div class="badge badge-outline">Bringé</div>
                            <div class="badge badge-outline">3.5 ans</div>
                            <div class="badge badge-outline">LOF</div>
                        </div>
                        <p class="mb-4">
                            Max est notre mâle principal. Avec sa structure musclée et son caractère
                            équilibré, il transmet d'excellentes qualités à sa descendance. Il est
                            très sociable et joueur.
                        </p>
                        <div class="collapse-arrow bg-base-200 collapse">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">Voir ses tests de santé</div>
                            <div class="collapse-content">
                                <ul class="list-disc pl-5">
                                    <li>Test ADN : Clear</li>
                                    <li>Test BOAS : Grade 0</li>
                                    <li>Test Patella : 0/0</li>
                                    <li>Test Cardiaque : Normal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="male2Img"
                            alt="Mâle bouledogue français"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Oscar</h3>
                        <div class="my-2 flex flex-wrap gap-2">
                            <div class="badge badge-outline">Fauve</div>
                            <div class="badge badge-outline">3 ans</div>
                            <div class="badge badge-outline">LOF</div>
                        </div>
                        <p class="mb-4">
                            Oscar est notre deuxième mâle reproducteur. Avec sa tête typique et son
                            corps compact, il correspond parfaitement au standard de la race. Il a
                            un tempérament doux et affectueux.
                        </p>
                        <div class="collapse-arrow bg-base-200 collapse">
                            <input type="checkbox" />
                            <div class="collapse-title font-medium">Voir ses tests de santé</div>
                            <div class="collapse-content">
                                <ul class="list-disc pl-5">
                                    <li>Test ADN : Clear</li>
                                    <li>Test BOAS : Grade 0</li>
                                    <li>Test Patella : 0/0</li>
                                    <li>Test Cardiaque : Normal</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Lignées et Pedigrees -->
        <section class="bg-base-200 mb-16 rounded-lg p-8">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Lignées et Pedigrees
            </h2>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h3 class="mb-4 font-serif text-2xl font-bold">Des lignées sélectionnées</h3>
                    <p class="mb-4">
                        Nos bouledogues français sont issus de lignées soigneusement sélectionnées
                        pour leur qualité, leur santé et leur conformité aux standards de la race.
                        Nous travaillons avec des éleveurs reconnus en France et en Europe pour
                        améliorer constamment notre élevage.
                    </p>
                    <p>
                        Tous nos reproducteurs sont inscrits au LOF (Livre des Origines Français) et
                        possèdent un pedigree complet sur plusieurs générations. Nous pouvons vous
                        fournir ces informations sur demande.
                    </p>
                </div>
                <div>
                    <h3 class="mb-4 font-serif text-2xl font-bold">Santé et bien-être</h3>
                    <p class="mb-4">
                        La santé de nos reproducteurs est notre priorité absolue. Tous nos chiens
                        sont testés pour les principales maladies génétiques qui peuvent affecter la
                        race, notamment :
                    </p>
                    <ul class="mb-4 list-disc pl-5">
                        <li>Syndrome Brachycéphale (BOAS)</li>
                        <li>Luxation de la rotule</li>
                        <li>Maladies cardiaques</li>
                        <li>Tests ADN pour diverses maladies génétiques</li>
                    </ul>
                    <p>
                        Ces tests nous permettent de sélectionner les meilleurs reproducteurs et
                        d'éviter la transmission de maladies génétiques à leur descendance.
                    </p>
                </div>
            </div>
        </section>

        <!-- Section Galerie -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Galerie de nos parents
            </h2>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                <img
                    v-for="i in 8"
                    :key="i"
                    :src="getImageUrl(`parent-gallery-${i}.jpg`)"
                    alt="Bouledogue français"
                    class="rounded-lg shadow-lg"
                />
            </div>
        </section>

        <!-- Section CTA -->
        <section class="bg-primary/10 rounded-lg p-8 text-center">
            <h2 class="text-primary mb-4 font-serif text-3xl font-bold">
                Vous souhaitez en savoir plus ?
            </h2>
            <p class="mx-auto mb-6 max-w-2xl">
                N'hésitez pas à nous contacter pour plus d'informations sur nos reproducteurs ou
                pour planifier une visite afin de les rencontrer. Nous serons ravis de répondre à
                toutes vos questions.
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

const parentsHeroImg = getImageUrl('parents-hero.jpg');
const female1Img = getImageUrl('female-1.jpg');
const female2Img = getImageUrl('female-2.jpg');
const female3Img = getImageUrl('female-3.jpg');
const male1Img = getImageUrl('male-1.jpg');
const male2Img = getImageUrl('male-2.jpg');
</script>
