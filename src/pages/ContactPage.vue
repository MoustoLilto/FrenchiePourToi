<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-primary mb-8 text-center font-serif text-4xl font-bold">Contactez-nous</h1>

        <!-- Section Introduction -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div class="flex flex-col justify-center">
                    <h2 class="text-primary mb-6 font-serif text-3xl font-bold">
                        Nous sommes à votre écoute
                    </h2>
                    <p class="mb-4">
                        Vous avez des questions sur nos bouledogues français, nos services ou vous
                        souhaitez planifier une visite ? N'hésitez pas à nous contacter. Notre
                        équipe se fera un plaisir de vous répondre dans les plus brefs délais.
                    </p>
                    <p class="mb-4">
                        Que ce soit pour une demande d'information, une réservation ou simplement
                        pour échanger sur votre passion pour les bouledogues français, nous sommes
                        là pour vous.
                    </p>
                    <p class="mb-6">
                        Vous pouvez nous contacter par téléphone, email ou en remplissant le
                        formulaire ci-dessous. Nous vous répondrons dans un délai de 24 à 48 heures.
                    </p>
                </div>
                <div class="flex items-center justify-center">
                    <img
                        src="@/assets/contact-hero.jpg"
                        alt="Contactez-nous"
                        class="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>

        <!-- Section Coordonnées et Formulaire -->
        <section class="mb-16">
            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                <!-- Coordonnées -->
                <div>
                    <h2 class="text-primary mb-6 font-serif text-2xl font-bold">Nos coordonnées</h2>

                    <div class="mb-6 flex items-start gap-4">
                        <div class="text-primary flex-shrink-0">
                            <i class="icon-[carbon--location] text-2xl" />
                        </div>
                        <div>
                            <h3 class="mb-1 font-bold">Adresse</h3>
                            <p>
                                123 Rue des Bouledogues
                                <br />
                                75000 Paris
                                <br />
                                France
                            </p>
                        </div>
                    </div>

                    <div class="mb-6 flex items-start gap-4">
                        <div class="text-primary flex-shrink-0">
                            <i class="icon-[carbon--phone] text-2xl" />
                        </div>
                        <div>
                            <h3 class="mb-1 font-bold">Téléphone</h3>
                            <p>+33 1 23 45 67 89</p>
                            <p class="text-neutral text-sm">Du lundi au vendredi, de 9h à 18h</p>
                        </div>
                    </div>

                    <div class="mb-6 flex items-start gap-4">
                        <div class="text-primary flex-shrink-0">
                            <i class="icon-[carbon--email] text-2xl" />
                        </div>
                        <div>
                            <h3 class="mb-1 font-bold">Email</h3>
                            <p>contact@frenchiepoutoi.fr</p>
                        </div>
                    </div>

                    <div class="mb-8">
                        <h3 class="mb-3 font-bold">Suivez-nous</h3>
                        <SocialLinks withLabel />
                    </div>

                    <div class="bg-base-200 rounded-lg p-6">
                        <h3 class="mb-3 font-bold">Horaires de visite</h3>
                        <p class="mb-2">
                            Les visites de notre élevage se font uniquement sur rendez-vous.
                        </p>
                        <p>
                            Nous vous accueillons du lundi au samedi, de 10h à 17h. Merci de prendre
                            rendez-vous au moins 48h à l'avance.
                        </p>
                    </div>
                </div>

                <!-- Formulaire de contact -->
                <div>
                    <h2 class="text-primary mb-6 font-serif text-2xl font-bold">
                        Formulaire de contact
                    </h2>
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <form @submit.prevent="submitContactForm">
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
                                        <span class="label-text">Téléphone</span>
                                    </label>
                                    <input
                                        v-model="form.phone"
                                        type="tel"
                                        placeholder="Votre numéro de téléphone"
                                        class="input input-bordered"
                                    />
                                </div>

                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Sujet*</span>
                                    </label>
                                    <select
                                        v-model="form.subject"
                                        class="select select-bordered"
                                        required
                                    >
                                        <option value="">Sélectionnez un sujet</option>
                                        <option value="information">Demande d'information</option>
                                        <option value="reservation">Réservation d'un chiot</option>
                                        <option value="visit">Planification d'une visite</option>
                                        <option value="other">Autre</option>
                                    </select>
                                </div>

                                <div class="form-control mb-6">
                                    <label class="label">
                                        <span class="label-text">Message*</span>
                                    </label>
                                    <textarea
                                        v-model="form.message"
                                        class="textarea textarea-bordered"
                                        placeholder="Votre message"
                                        rows="6"
                                        required
                                    />
                                </div>

                                <div class="form-control mb-6">
                                    <label class="label cursor-pointer justify-start gap-2">
                                        <input
                                            v-model="form.termsAccepted"
                                            type="checkbox"
                                            class="checkbox"
                                            required
                                        />
                                        <span class="label-text">
                                            J'accepte que mes données soient traitées conformément à
                                            la politique de confidentialité*
                                        </span>
                                    </label>
                                </div>

                                <div class="text-center">
                                    <button type="submit" class="btn btn-primary">
                                        Envoyer mon message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Carte -->
        <section class="mb-16">
            <h2 class="text-primary mb-6 text-center font-serif text-3xl font-bold">
                Nous trouver
            </h2>
            <div class="overflow-hidden rounded-lg shadow-lg">
                <!-- Ici, vous pourriez intégrer une carte MapBox -->
                <div class="bg-base-200 flex h-96 items-center justify-center">
                    <p class="text-center">
                        Carte MapBox à intégrer ici
                        <br />
                        <span class="text-sm">123 Rue des Bouledogues, 75000 Paris</span>
                    </p>
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
                    <input type="radio" name="faq-accordion" :checked="true" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Comment planifier une visite de votre élevage ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Pour planifier une visite, vous pouvez nous contacter par téléphone,
                            email ou via notre formulaire de contact. Les visites se font uniquement
                            sur rendez-vous, du lundi au samedi, de 10h à 17h. Nous vous demandons
                            de prendre rendez-vous au moins 48h à l'avance.
                        </p>
                    </div>
                </div>
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Quel est le délai de réponse à mes messages ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Nous nous efforçons de répondre à toutes les demandes dans un délai de
                            24 à 48 heures ouvrées. Si vous n'avez pas reçu de réponse après ce
                            délai, n'hésitez pas à nous relancer par téléphone.
                        </p>
                    </div>
                </div>
                <div class="collapse-arrow bg-base-100 collapse">
                    <input type="radio" name="faq-accordion" />
                    <div class="collapse-title font-serif text-xl font-medium">
                        Puis-je vous contacter par messagerie instantanée ?
                    </div>
                    <div class="collapse-content">
                        <p>
                            Oui, nous proposons un service de messagerie instantanée pour nos
                            clients. Une fois votre compte créé sur notre site, vous pourrez nous
                            contacter directement via notre système de messagerie intégré.
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
                N'attendez plus pour réserver votre chiot ou planifier une visite de notre élevage.
                Nous serons ravis de vous accueillir et de vous présenter nos adorables bouledogues
                français.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <RouterLink :to="{ name: ROUTE_NAMES.PUPPIES }" class="btn btn-primary">
                    Voir nos chiots
                </RouterLink>
                <RouterLink :to="{ name: ROUTE_NAMES.RESERVATION }" class="btn btn-outline">
                    Réserver un chiot
                </RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { ref } from 'vue';
import SocialLinks from '@/components/SocialLinks.vue';

const form = ref({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    termsAccepted: false,
});

const submitContactForm = () => {
    // Ici, vous pourriez implémenter la logique d'envoi du formulaire
    // Par exemple, envoyer les données à une API
    console.log('Formulaire soumis:', form.value);
    alert(
        'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
    );

    // Réinitialiser le formulaire
    form.value = {
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        termsAccepted: false,
    };
};
</script>
