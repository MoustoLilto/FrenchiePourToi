<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-primary mb-8 text-center font-serif text-4xl font-bold">
            {{ $t('about.title') }}
        </h1>

        <!-- Section Notre Histoire -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        {{ $t('about.subtitle') }}
                    </h2>
                    <p class="mb-4">
                        {{ $t('about.description') }}
                    </p>
                    <p class="mb-4">
                        Après plusieurs années d'expérience et de formation auprès d'éleveurs
                        reconnus, nous avons décidé de créer notre propre élevage familial avec pour
                        objectif de produire des chiots de qualité, en bonne santé et au tempérament
                        équilibré.
                    </p>
                    <p>
                        Aujourd'hui, Frenchie Pour Toi est reconnu pour la qualité de ses
                        bouledogues français et pour son engagement envers le bien-être animal. Nous
                        mettons tout en œuvre pour offrir à nos clients des chiots exceptionnels qui
                        deviendront des compagnons fidèles pour la vie.
                    </p>
                </div>
                <div class="flex items-center justify-center">
                    <img :src="aboutHistoryImg" alt="Notre histoire" class="rounded-lg shadow-lg" />
                </div>
            </div>
        </section>

        <!-- Section Notre Équipe -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                {{ $t('about.team.title') }}
            </h2>
            <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="team1Img"
                            alt="Membre de l'équipe"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Sophie Martin</h3>
                        <p class="text-neutral text-sm">Fondatrice & Éleveuse</p>
                        <p class="mt-2">
                            Passionnée par les bouledogues français depuis plus de 10 ans, Sophie
                            veille au bien-être de nos chiens et à la qualité de notre élevage.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="team2Img"
                            alt="Membre de l'équipe"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Thomas Dubois</h3>
                        <p class="text-neutral text-sm">Co-fondateur & Responsable des soins</p>
                        <p class="mt-2">
                            Thomas s'occupe de la santé et du bien-être quotidien de nos chiens. Il
                            est également responsable de la socialisation des chiots.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <figure>
                        <img
                            :src="team3Img"
                            alt="Membre de l'équipe"
                            class="h-64 w-full object-cover"
                        />
                    </figure>
                    <div class="card-body">
                        <h3 class="card-title font-serif">Dr. Julie Leroy</h3>
                        <p class="text-neutral text-sm">Vétérinaire partenaire</p>
                        <p class="mt-2">
                            Dr. Leroy assure le suivi médical de nos chiens et chiots. Son expertise
                            est précieuse pour garantir la santé de notre élevage.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Notre Philosophie -->
        <section class="bg-base-200 mb-16 rounded-lg p-8">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                {{ $t('about.values.title') }}
            </h2>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                    <h3 class="mb-4 font-serif text-2xl font-bold">
                        {{ $t('about.values.health.title') }}
                    </h3>
                    <p class="mb-6">
                        {{ $t('about.values.health.description') }}
                    </p>
                    <p>
                        Nous limitons volontairement le nombre de portées par an pour garantir que
                        chaque chiot reçoive toute l'attention dont il a besoin pendant ses
                        premières semaines de vie, cruciales pour son développement.
                    </p>
                </div>
                <div>
                    <h3 class="mb-4 font-serif text-2xl font-bold">
                        {{ $t('about.values.quality.title') }}
                    </h3>
                    <p class="mb-6">
                        {{ $t('about.values.quality.description') }}
                    </p>
                    <p>
                        Tous nos chiots sont vendus avec un certificat vétérinaire, un carnet de
                        santé à jour, une puce électronique et une garantie écrite. Nous restons
                        également disponibles pour conseiller nos clients tout au long de la vie de
                        leur chien.
                    </p>
                </div>
            </div>
        </section>

        <!-- Section Nos Installations -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Nos Installations
            </h2>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <img :src="facility1Img" alt="Nos installations" class="rounded-lg shadow-lg" />
                <img :src="facility2Img" alt="Nos installations" class="rounded-lg shadow-lg" />
                <img :src="facility3Img" alt="Nos installations" class="rounded-lg shadow-lg" />
                <img :src="facility4Img" alt="Nos installations" class="rounded-lg shadow-lg" />
                <img :src="facility5Img" alt="Nos installations" class="rounded-lg shadow-lg" />
                <img :src="facility6Img" alt="Nos installations" class="rounded-lg shadow-lg" />
            </div>
        </section>

        <!-- Section FAQ -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Questions fréquentes
            </h2>
            <div class="space-y-4">
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" :checked="true" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        {{ $t('puppies.howToReserve.title') }}
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
                            pour la cession d'un chiot en France. Cela leur permet de rester
                            suffisamment longtemps avec leur mère et leurs frères et sœurs pour une
                            bonne socialisation.
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

        <!-- Section Contact -->
        <section class="bg-primary/10 rounded-lg p-8">
            <div class="text-center">
                <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                    {{ $t('contact.title') }}
                </h2>
                <p class="mb-8">
                    {{ $t('contact.description') }}
                </p>
                <RouterLink :to="{ name: ROUTE_NAMES.CONTACT }" class="btn btn-primary">
                    {{ $t('common.buttons.contact') }}
                </RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { getImageUrl } from '@/services/assetsService';
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const aboutHistoryImg = getImageUrl('about-history.jpg');
const team1Img = getImageUrl('team-1.jpg');
const team2Img = getImageUrl('team-2.jpg');
const team3Img = getImageUrl('team-3.jpg');
const facility1Img = getImageUrl('facility-1.jpg');
const facility2Img = getImageUrl('facility-2.jpg');
const facility3Img = getImageUrl('facility-3.jpg');
const facility4Img = getImageUrl('facility-4.jpg');
const facility5Img = getImageUrl('facility-5.jpg');
const facility6Img = getImageUrl('facility-6.jpg');
</script>
