<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-primary mb-8 text-center font-serif text-4xl font-bold">
            Mon Espace Client
        </h1>

        <!-- Section Bienvenue -->
        <section class="mb-8">
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 class="card-title font-serif text-2xl">
                                Bienvenue, {{ user.firstName }} !
                            </h2>
                            <p class="text-neutral">
                                Voici votre espace personnel pour suivre vos demandes et
                                réservations.
                            </p>
                        </div>
                        <div class="flex flex-wrap gap-2">
                            <button class="btn btn-outline btn-sm" @click="editProfile">
                                <i class="icon-[carbon--edit] mr-2" />
                                Modifier mon profil
                            </button>
                            <button class="btn btn-outline btn-sm" @click="logout">
                                <i class="icon-[carbon--logout] mr-2" />
                                Déconnexion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Résumé -->
        <section class="mb-8">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex items-center gap-4">
                            <div class="bg-primary/20 rounded-full p-3">
                                <i class="icon-[carbon--dog-walker] text-primary text-2xl" />
                            </div>
                            <div>
                                <div class="text-sm">Réservations</div>
                                <div class="text-2xl font-bold">{{ reservations.length }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex items-center gap-4">
                            <div class="bg-secondary/20 rounded-full p-3">
                                <i class="icon-[carbon--message] text-secondary text-2xl" />
                            </div>
                            <div>
                                <div class="text-sm">Messages</div>
                                <div class="text-2xl font-bold">{{ messages.length }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex items-center gap-4">
                            <div class="bg-accent/20 rounded-full p-3">
                                <i class="icon-[carbon--calendar] text-accent text-2xl" />
                            </div>
                            <div>
                                <div class="text-sm">Rendez-vous</div>
                                <div class="text-2xl font-bold">{{ appointments.length }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex items-center gap-4">
                            <div class="bg-success/20 rounded-full p-3">
                                <i class="icon-[carbon--document] text-success text-2xl" />
                            </div>
                            <div>
                                <div class="text-sm">Documents</div>
                                <div class="text-2xl font-bold">{{ documents.length }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Onglets -->
        <section class="mb-8">
            <div class="tabs tabs-boxed mb-4 flex justify-center">
                <button
                    class="tab"
                    :class="{ 'tab-active': activeTab === 'reservations' }"
                    @click="activeTab = 'reservations'"
                >
                    Mes réservations
                </button>
                <button
                    class="tab"
                    :class="{ 'tab-active': activeTab === 'messages' }"
                    @click="activeTab = 'messages'"
                >
                    Mes messages
                </button>
                <button
                    class="tab"
                    :class="{ 'tab-active': activeTab === 'appointments' }"
                    @click="activeTab = 'appointments'"
                >
                    Mes rendez-vous
                </button>
                <button
                    class="tab"
                    :class="{ 'tab-active': activeTab === 'documents' }"
                    @click="activeTab = 'documents'"
                >
                    Mes documents
                </button>
            </div>

            <!-- Contenu des onglets -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <!-- Onglet Réservations -->
                    <div v-if="activeTab === 'reservations'">
                        <h3 class="mb-4 font-serif text-xl font-bold">Mes réservations</h3>
                        <div v-if="reservations.length === 0" class="py-8 text-center">
                            <i class="icon-[carbon--search] text-neutral mb-2 text-4xl" />
                            <p>Vous n'avez pas encore de réservation.</p>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.PUPPIES }"
                                class="btn btn-primary mt-4"
                            >
                                Voir nos chiots disponibles
                            </RouterLink>
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="table-zebra table w-full">
                                <thead>
                                    <tr>
                                        <th>Référence</th>
                                        <th>Date</th>
                                        <th>Chiot</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="reservation in reservations" :key="reservation.id">
                                        <td>{{ reservation.reference }}</td>
                                        <td>{{ formatDate(reservation.date) }}</td>
                                        <td>{{ reservation.puppy }}</td>
                                        <td>
                                            <span
                                                class="badge"
                                                :class="{
                                                    'badge-primary':
                                                        reservation.status === 'confirmed',
                                                    'badge-warning':
                                                        reservation.status === 'pending',
                                                    'badge-error':
                                                        reservation.status === 'cancelled',
                                                }"
                                            >
                                                {{ getStatusLabel(reservation.status) }}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                class="btn btn-ghost btn-xs"
                                                @click="viewReservation(reservation)"
                                            >
                                                Voir
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Onglet Messages -->
                    <div v-if="activeTab === 'messages'">
                        <h3 class="mb-4 font-serif text-xl font-bold">Mes messages</h3>
                        <div v-if="messages.length === 0" class="py-8 text-center">
                            <i class="icon-[carbon--email] text-neutral mb-2 text-4xl" />
                            <p>Vous n'avez pas encore de messages.</p>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.CONTACT }"
                                class="btn btn-primary mt-4"
                            >
                                Nous contacter
                            </RouterLink>
                        </div>
                        <div v-else>
                            <div
                                v-for="message in messages"
                                :key="message.id"
                                class="mb-4 border-b pb-4 last:border-b-0 last:pb-0"
                            >
                                <div class="flex justify-between">
                                    <h4 class="font-bold">{{ message.subject }}</h4>
                                    <span class="text-neutral text-sm">
                                        {{ formatDate(message.date) }}
                                    </span>
                                </div>
                                <p class="mb-2 text-sm">{{ message.preview }}</p>
                                <div class="flex justify-end">
                                    <button
                                        class="btn btn-ghost btn-xs"
                                        @click="viewMessage(message)"
                                    >
                                        Lire la suite
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Onglet Rendez-vous -->
                    <div v-if="activeTab === 'appointments'">
                        <h3 class="mb-4 font-serif text-xl font-bold">Mes rendez-vous</h3>
                        <div v-if="appointments.length === 0" class="py-8 text-center">
                            <i class="icon-[carbon--calendar] text-neutral mb-2 text-4xl" />
                            <p>Vous n'avez pas encore de rendez-vous planifiés.</p>
                            <RouterLink
                                :to="{ name: ROUTE_NAMES.CONTACT }"
                                class="btn btn-primary mt-4"
                            >
                                Prendre rendez-vous
                            </RouterLink>
                        </div>
                        <div v-else class="overflow-x-auto">
                            <table class="table-zebra table w-full">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Heure</th>
                                        <th>Type</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="appointment in appointments" :key="appointment.id">
                                        <td>{{ formatDate(appointment.date) }}</td>
                                        <td>{{ appointment.time }}</td>
                                        <td>{{ appointment.type }}</td>
                                        <td>
                                            <span
                                                class="badge"
                                                :class="{
                                                    'badge-primary':
                                                        appointment.status === 'confirmed',
                                                    'badge-warning':
                                                        appointment.status === 'pending',
                                                    'badge-error':
                                                        appointment.status === 'cancelled',
                                                }"
                                            >
                                                {{ getStatusLabel(appointment.status) }}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                class="btn btn-ghost btn-xs"
                                                @click="viewAppointment(appointment)"
                                            >
                                                Voir
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Onglet Documents -->
                    <div v-if="activeTab === 'documents'">
                        <h3 class="mb-4 font-serif text-xl font-bold">Mes documents</h3>
                        <div v-if="documents.length === 0" class="py-8 text-center">
                            <i class="icon-[carbon--document] text-neutral mb-2 text-4xl" />
                            <p>Vous n'avez pas encore de documents.</p>
                        </div>
                        <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                            <div
                                v-for="document in documents"
                                :key="document.id"
                                class="card bg-base-200"
                            >
                                <div class="card-body">
                                    <h4 class="card-title text-base">{{ document.name }}</h4>
                                    <p class="text-neutral text-sm">
                                        {{ formatDate(document.date) }}
                                    </p>
                                    <div class="card-actions justify-end">
                                        <button
                                            class="btn btn-primary btn-sm"
                                            @click="downloadDocument(document)"
                                        >
                                            <i class="icon-[carbon--download] mr-2" />
                                            Télécharger
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Section Aide -->
        <section class="mb-8">
            <div class="card bg-primary/10 shadow-xl">
                <div class="card-body">
                    <h3 class="card-title font-serif">Besoin d'aide ?</h3>
                    <p>Notre équipe est disponible pour répondre à toutes vos questions.</p>
                    <div class="card-actions justify-end">
                        <RouterLink :to="{ name: ROUTE_NAMES.CONTACT }" class="btn btn-primary">
                            Nous contacter
                        </RouterLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/constants/routesConstants';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('reservations');

// Données fictives pour la démo
const user = ref({
    id: 1,
    firstName: 'Sophie',
    lastName: 'Martin',
    email: 'sophie.martin@example.com',
    phone: '+33 6 12 34 56 78',
});

const reservations = ref([
    {
        id: 1,
        reference: 'RES-2023-001',
        date: '2023-05-15',
        puppy: 'Bouledogue Français Mâle Fauve',
        status: 'confirmed',
    },
    {
        id: 2,
        reference: 'RES-2023-002',
        date: '2023-06-20',
        puppy: 'Bouledogue Français Femelle Bringée',
        status: 'pending',
    },
]);

const messages = ref([
    {
        id: 1,
        subject: 'Confirmation de votre réservation',
        date: '2023-05-15',
        preview: 'Nous avons bien reçu votre réservation pour un chiot bouledogue français...',
        content:
            'Nous avons bien reçu votre réservation pour un chiot bouledogue français. Nous vous confirmons que votre demande a été acceptée. Vous recevrez prochainement un email avec les détails de votre réservation.',
    },
    {
        id: 2,
        subject: 'Informations sur votre visite',
        date: '2023-06-01',
        preview:
            'Nous avons le plaisir de vous confirmer votre rendez-vous pour visiter notre élevage...',
        content:
            "Nous avons le plaisir de vous confirmer votre rendez-vous pour visiter notre élevage le 10 juin 2023 à 14h00. Nous vous attendons à l'adresse suivante : 123 Rue des Bouledogues, 75000 Paris. N'hésitez pas à nous contacter si vous avez des questions.",
    },
]);

const appointments = ref([
    {
        id: 1,
        date: '2023-06-10',
        time: '14:00',
        type: "Visite de l'élevage",
        status: 'confirmed',
    },
    {
        id: 2,
        date: '2023-07-05',
        time: '10:30',
        type: 'Rencontre avec le chiot',
        status: 'pending',
    },
]);

const documents = ref([
    {
        id: 1,
        name: 'Contrat de réservation',
        date: '2023-05-15',
        url: '#',
    },
    {
        id: 2,
        name: 'Certificat de naissance LOF',
        date: '2023-06-20',
        url: '#',
    },
    {
        id: 3,
        name: 'Carnet de santé',
        date: '2023-06-20',
        url: '#',
    },
]);

// Fonctions utilitaires
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case 'confirmed':
            return 'Confirmé';
        case 'pending':
            return 'En attente';
        case 'cancelled':
            return 'Annulé';
        default:
            return status;
    }
};

// Fonctions d'action
const editProfile = () => {
    alert('Fonctionnalité de modification de profil à implémenter');
};

const logout = () => {
    // Ici, vous implémenteriez la logique de déconnexion
    router.push({ name: ROUTE_NAMES.HOME });
};

const viewReservation = (reservation: any) => {
    alert(`Détails de la réservation ${reservation.reference}`);
};

const viewMessage = (message: any) => {
    alert(`Message: ${message.content}`);
};

const viewAppointment = (appointment: any) => {
    alert(`Détails du rendez-vous du ${appointment.date} à ${appointment.time}`);
};

const downloadDocument = (document: any) => {
    alert(`Téléchargement du document "${document.name}"`);
};
</script>
