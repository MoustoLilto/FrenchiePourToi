<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Section Présentation -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        {{ $t('home.hero.title') }}
                    </h2>
                    <p class="mb-4">
                        {{ $t('home.hero.description') }}
                    </p>
                    <p class="mb-6">
                        {{ $t('home.hero.additionalInfo') }}
                    </p>
                    <div class="flex gap-4">
                        <RouterLink :to="{ name: ROUTE_NAMES.PUPPIES }" class="btn btn-primary">
                            {{ $t('common.buttons.viewMore') }}
                        </RouterLink>
                        <RouterLink :to="{ name: ROUTE_NAMES.RESERVATION }" class="btn btn-outline">
                            {{ $t('common.buttons.reserve') }}
                        </RouterLink>
                    </div>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        :src="frenchieFamilyImg"
                        alt="Famille de bouledogues français"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>

        <!-- Section Derniers Chiots -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                {{ $t('home.latestPuppies.title') }}
            </h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 3" :key="i" class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="getImageUrl(`puppy-${i}.jpg`)"
                            alt="Chiot bouledogue français"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">
                            {{ $t('home.latestPuppies.puppy') }} {{ i }}
                        </h3>
                        <p>
                            {{ $t('home.latestPuppies.description') }}
                        </p>
                        <div class="card-actions justify-end">
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.PUPPIES }"
                                class="btn btn-primary btn-sm"
                            >
                                {{ $t('common.buttons.learnMore') }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-center">
                <RouterLink :to="{ name: ROUTE_NAMES.PUPPIES }" class="btn btn-outline">
                    {{ $t('home.latestPuppies.buttonText') }}
                </RouterLink>
            </div>
        </section>

        <!-- Section Pourquoi nous choisir -->
        <section class="bg-base-200 mb-16 rounded-lg p-8">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                {{ $t('home.whyChooseUs.title') }}
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div class="card bg-base-100">
                    <div class="card-body items-center text-center">
                        <i class="icon-[carbon--certificate] text-primary text-5xl" />
                        <h3 class="card-title font-serif">
                            {{ $t('home.whyChooseUs.quality.title') }}
                        </h3>
                        <p>
                            {{ $t('home.whyChooseUs.quality.description') }}
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100">
                    <div class="card-body items-center text-center">
                        <i class="icon-[carbon--health-cross] text-primary text-5xl" />
                        <h3 class="card-title font-serif">
                            {{ $t('home.whyChooseUs.veterinaryCare.title') }}
                        </h3>
                        <p>
                            {{ $t('home.whyChooseUs.veterinaryCare.description') }}
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100">
                    <div class="card-body items-center text-center">
                        <i class="icon-[carbon--home] text-primary text-5xl" />
                        <h3 class="card-title font-serif">
                            {{ $t('home.whyChooseUs.familyBreeding.title') }}
                        </h3>
                        <p>
                            {{ $t('home.whyChooseUs.familyBreeding.description') }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Témoignages -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                {{ $t('home.testimonials.title') }}
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
                            {{ $t('home.testimonials.testimonial') }}
                        </p>
                        <div class="flex items-center gap-4">
                            <div class="avatar">
                                <div class="w-12 rounded-full">
                                    <img :src="getImageUrl(`client-${i}.jpg`)" alt="Client" />
                                </div>
                            </div>
                            <div>
                                <h3 class="font-bold">
                                    {{ $t('home.testimonials.client') }} {{ i }}
                                </h3>
                                <p class="text-sm">{{ $t('home.testimonials.since') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Blog -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                {{ $t('home.blog.title') }}
            </h2>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div v-for="i in 3" :key="i" class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="getImageUrl(`blog-${i}.jpg`)"
                            alt="Article de blog"
                            class="h-48 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">
                            {{ $t('home.blog.articleTitle') }}
                        </h3>
                        <p>
                            {{ $t('home.blog.description') }}
                        </p>
                        <div class="card-actions justify-end">
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.BLOG }"
                                class="btn btn-primary btn-sm"
                            >
                                {{ $t('common.buttons.readMore') }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-8 text-center">
                <RouterLink :to="{ name: ROUTE_NAMES.BLOG }" class="btn btn-outline">
                    {{ $t('home.blog.buttonText') }}
                </RouterLink>
            </div>
        </section>

        <!-- Section Contact -->
        <section class="bg-primary/10 rounded-lg p-8">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        {{ $t('home.contact.title') }}
                    </h2>
                    <p class="mb-6">
                        {{ $t('home.contact.description') }}
                    </p>
                    <RouterLink :to="{ name: ROUTE_NAMES.CONTACT }" class="btn btn-primary">
                        {{ $t('common.buttons.contact') }}
                    </RouterLink>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        :src="getImageUrl('contact.jpg')"
                        alt="Contactez-nous"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '@/services/assetsService';
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const frenchieFamilyImg = getImageUrl('frenchie-family.jpg');
</script>
