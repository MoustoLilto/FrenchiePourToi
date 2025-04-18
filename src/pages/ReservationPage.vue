<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-primary mb-8 text-center font-serif text-4xl font-bold">
            Réserver un Chiot
        </h1>

        <!-- Section Introduction -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        Comment réserver votre bouledogue français
                    </h2>
                    <p class="mb-4">
                        Réserver un chiot chez Frenchie Pour Toi est un processus simple et
                        transparent. Nous mettons tout en œuvre pour vous accompagner dans cette
                        démarche importante et vous aider à accueillir votre nouveau compagnon dans
                        les meilleures conditions.
                    </p>
                    <p class="mb-4">
                        Chaque chiot est unique et mérite une famille aimante. C'est pourquoi nous
                        prenons le temps de vous connaître et de comprendre vos attentes afin de
                        vous aider à choisir le chiot qui correspondra le mieux à votre mode de vie.
                    </p>
                    <p class="mb-6">
                        Découvrez ci-dessous les étapes de réservation et remplissez notre
                        formulaire pour démarrer le processus.
                    </p>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        :src="reservationHeroImg"
                        alt="Réservation d'un chiot"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>

        <!-- Section Étapes de réservation -->
        <section class="bg-base-200 mb-16 rounded-lg p-8">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Les étapes de réservation
            </h2>
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div
                            class="text-primary bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold"
                        >
                            1
                        </div>
                        <h3 class="card-title font-serif">Formulaire de contact</h3>
                        <p>
                            Remplissez notre formulaire de réservation en précisant vos préférences
                            (sexe, couleur, etc.) et vos coordonnées.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div
                            class="text-primary bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold"
                        >
                            2
                        </div>
                        <h3 class="card-title font-serif">Entretien téléphonique</h3>
                        <p>
                            Nous vous contactons pour discuter de vos attentes, répondre à vos
                            questions et vous présenter les chiots disponibles.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div
                            class="text-primary bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold"
                        >
                            3
                        </div>
                        <h3 class="card-title font-serif">Visite et sélection</h3>
                        <p>
                            Vous visitez notre élevage pour rencontrer les chiots et leurs parents,
                            et sélectionner votre futur compagnon.
                        </p>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body items-center text-center">
                        <div
                            class="text-primary bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold"
                        >
                            4
                        </div>
                        <h3 class="card-title font-serif">Confirmation et acompte</h3>
                        <p>
                            Vous confirmez votre réservation en versant un acompte de 30% du prix du
                            chiot, le solde étant réglé à la remise du chiot.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Formulaire de réservation -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Formulaire de réservation
            </h2>
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <form @submit.prevent="submitReservation">
                        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <!-- Informations personnelles -->
                            <div>
                                <h3 class="mb-4 font-serif text-xl font-bold">Vos informations</h3>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Nom complet*</span>
                                    </label>
                                    <input
                                        v-model="form.fullName"
                                        type="text"
                                        placeholder="Votre nom et prénom"
                                        class="input input-bordered"
                                        required
                                    />
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Email*</span>
                                    </label>
                                    <input
                                        v-model="form.email"
                                        type="email"
                                        placeholder="Votre adresse email"
                                        class="input input-bordered"
                                        required
                                    />
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Téléphone*</span>
                                    </label>
                                    <input
                                        v-model="form.phone"
                                        type="tel"
                                        placeholder="Votre numéro de téléphone"
                                        class="input input-bordered"
                                        required
                                    />
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Adresse</span>
                                    </label>
                                    <input
                                        v-model="form.address"
                                        type="text"
                                        placeholder="Votre adresse"
                                        class="input input-bordered"
                                    />
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Code postal</span>
                                    </label>
                                    <input
                                        v-model="form.postalCode"
                                        type="text"
                                        placeholder="Votre code postal"
                                        class="input input-bordered"
                                    />
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Ville</span>
                                    </label>
                                    <input
                                        v-model="form.city"
                                        type="text"
                                        placeholder="Votre ville"
                                        class="input input-bordered"
                                    />
                                </div>
                            </div>

                            <!-- Préférences de chiot -->
                            <div>
                                <h3 class="mb-4 font-serif text-xl font-bold">
                                    Préférences de chiot
                                </h3>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Sexe préféré*</span>
                                    </label>
                                    <select
                                        v-model="form.preferredGender"
                                        class="select select-bordered"
                                        required
                                    >
                                        <option value="">Sélectionnez une option</option>
                                        <option value="male">Mâle</option>
                                        <option value="female">Femelle</option>
                                        <option value="no-preference">Pas de préférence</option>
                                    </select>
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Couleur préférée*</span>
                                    </label>
                                    <select
                                        v-model="form.preferredColor"
                                        class="select select-bordered"
                                        required
                                    >
                                        <option value="">Sélectionnez une option</option>
                                        <option value="fauve">Fauve</option>
                                        <option value="bringé">Bringé</option>
                                        <option value="creme">Crème</option>
                                        <option value="bleu">Bleu</option>
                                        <option value="no-preference">Pas de préférence</option>
                                    </select>
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Période souhaitée*</span>
                                    </label>
                                    <select
                                        v-model="form.timeframe"
                                        class="select select-bordered"
                                        required
                                    >
                                        <option value="">Sélectionnez une option</option>
                                        <option value="asap">Dès que possible</option>
                                        <option value="1-3-months">Dans 1 à 3 mois</option>
                                        <option value="3-6-months">Dans 3 à 6 mois</option>
                                        <option value="6-12-months">Dans 6 à 12 mois</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">
                                            Avez-vous déjà eu un chien ?*
                                        </span>
                                    </label>
                                    <select
                                        v-model="form.previousDogOwnership"
                                        class="select select-bordered"
                                        required
                                    >
                                        <option value="">Sélectionnez une option</option>
                                        <option value="yes">Oui</option>
                                        <option value="no">Non</option>
                                    </select>
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">
                                            Avez-vous d'autres animaux ?*
                                        </span>
                                    </label>
                                    <select
                                        v-model="form.otherPets"
                                        class="select select-bordered"
                                        required
                                    >
                                        <option value="">Sélectionnez une option</option>
                                        <option value="yes">Oui</option>
                                        <option value="no">Non</option>
                                    </select>
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Message supplémentaire</span>
                                    </label>
                                    <textarea
                                        v-model="form.message"
                                        class="textarea textarea-bordered"
                                        placeholder="Informations complémentaires, questions, etc."
                                        rows="4"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="form-control mb-6 mt-4">
                            <label class="label cursor-pointer justify-start gap-2">
                                <input
                                    v-model="form.termsAccepted"
                                    type="checkbox"
                                    class="checkbox"
                                    required
                                />
                                <span class="label-text">
                                    J'accepte les conditions générales et la politique de
                                    confidentialité*
                                </span>
                            </label>
                        </div>

                        <div class="text-center">
                            <button type="submit" class="btn btn-primary">
                                Envoyer ma demande de réservation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>

        <!-- Section FAQ -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Questions fréquentes sur la réservation
            </h2>
            <div class="space-y-4">
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" :checked="true" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Quel est le montant de l'acompte ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            L'acompte demandé pour réserver un chiot est de 30% du prix total. Cet
                            acompte garantit votre réservation et n'est pas remboursable, sauf en
                            cas de problème avec le chiot (maladie, etc.).
                        </p>
                    </div>
                </div>
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Quand pourrai-je récupérer mon chiot ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Les chiots sont disponibles à partir de 8 semaines, âge légal minimum
                            pour la cession d'un chiot en France. Nous vous contacterons pour
                            organiser la remise du chiot dès qu'il aura atteint cet âge et reçu ses
                            premiers vaccins.
                        </p>
                    </div>
                </div>
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Quels moyens de paiement acceptez-vous ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Nous acceptons les paiements par virement bancaire, carte bancaire via
                            Stripe et espèces. Pour l'acompte, nous privilégions le virement
                            bancaire ou le paiement par carte.
                        </p>
                    </div>
                </div>
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Puis-je réserver un chiot d'une future portée ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Oui, il est possible de réserver un chiot d'une future portée. Dans ce
                            cas, vous serez placé sur une liste d'attente et contacté en priorité
                            dès la naissance des chiots. Un acompte sera demandé uniquement après la
                            naissance et la confirmation de votre choix.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Témoignages -->
        <section class="mb-16">
            <h2 class="text-primary mb-8 text-center font-serif text-3xl font-bold">
                Témoignages de nos clients
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
                            "Le processus de réservation a été simple et transparent. L'équipe de
                            Frenchie Pour Toi a été très professionnelle et nous a accompagnés tout
                            au long du processus. Notre bouledogue est en parfaite santé et fait
                            notre bonheur au quotidien !"
                        </p>
                        <div class="flex items-center gap-4">
                            <div class="avatar">
                                <div class="w-12 rounded-full">
                                    <img :src="getImageUrl(`client-${i}.jpg`)" alt="Client" />
                                </div>
                            </div>
                            <div>
                                <h3 class="font-bold">Famille Martin</h3>
                                <p class="text-sm">Propriétaire depuis 2022</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section CTA -->
        <section class="bg-primary/10 rounded-lg p-8 text-center">
            <h2 class="text-primary mb-4 font-serif text-3xl font-bold">
                Des questions sur la réservation ?
            </h2>
            <p class="mx-auto mb-6 max-w-2xl">
                N'hésitez pas à nous contacter directement si vous avez des questions spécifiques
                sur le processus de réservation ou si vous souhaitez obtenir plus d'informations sur
                nos chiots disponibles.
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
import { ref } from 'vue';
import { getImageUrl } from '@/services/assetsService';

const reservationHeroImg = getImageUrl('reservation-hero.jpg');

const form = ref({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    preferredGender: '',
    preferredColor: '',
    timeframe: '',
    previousDogOwnership: '',
    otherPets: '',
    message: '',
    termsAccepted: false,
});

const submitReservation = () => {
    // Ici, vous pourriez implémenter la logique d'envoi du formulaire
    // Par exemple, envoyer les données à une API
    console.log('Formulaire soumis:', form.value);
    alert(
        'Votre demande de réservation a été envoyée avec succès ! Nous vous contacterons prochainement.'
    );

    // Réinitialiser le formulaire
    form.value = {
        fullName: '',
        email: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        preferredGender: '',
        preferredColor: '',
        timeframe: '',
        previousDogOwnership: '',
        otherPets: '',
        message: '',
        termsAccepted: false,
    };
};
</script>
