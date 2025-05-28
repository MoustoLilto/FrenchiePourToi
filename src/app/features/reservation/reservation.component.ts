import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { LoadingStateComponent } from '@/shared/components/loading-state.component';
import { PuppyStore } from '@/core/stores/puppy.store';
import { routes } from '@/core/constants/routes.constants';
import { ReservationStepsComponent } from './reservation-steps/reservation-steps.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationFaqComponent } from './reservation-faq/reservation-faq.component';

@Component({
    selector: 'app-reservation',
    imports: [
        RouterLink,
        CloudinaryImageComponent,
        LoadingStateComponent,
        ReservationStepsComponent,
        ReservationFormComponent,
        ReservationFaqComponent,
    ],
    template: `
        <div class="container flex flex-col gap-y-20">
            <header class="section-header">
                <h2 class="text-h2 text-center">
                    <span i18n="@@reservation.title">Réserver un Chiot</span>
                </h2>

                <div class="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
                    <div class="flex-col-start gap-4">
                        <h3 class="text-h3 mb-4" i18n="@@reservation.header.title">
                            Votre futur compagnon
                        </h3>
                        <p i18n="@@reservation.header.description">
                            Nous sommes ravis que vous souhaitiez adopter l'un de nos précieux
                            chiots ! Nous mettons tout en œuvre pour vous accompagner dans cette
                            démarche importante et vous aider à accueillir votre nouveau compagnon
                            dans les meilleures conditions.
                        </p>
                        <p i18n="@@reservation.header.description2">
                            Chaque chiot est unique et mérite une famille aimante. C'est pourquoi
                            nous prenons le temps de vous connaître et de comprendre vos attentes
                            afin de vous aider à choisir le chiot qui correspondra le mieux à votre
                            mode de vie.
                        </p>
                        <p i18n="@@reservation.header.description3" class="md:pb-20">
                            Découvrez ci-dessous les étapes de réservation et remplissez notre
                            formulaire pour démarrer le processus.
                        </p>
                    </div>

                    <div class="flex-center min-w-sm relative h-full w-full">
                        <app-cloudinary-image
                            class="relative size-full"
                            [sizes]="'(max-width: 768px) 100vw, 50vw'"
                            inputClass="mask mask-decagon object-cover object-top"
                            publicId="frenchie-hero_mtujt9"
                            [isPriority]="true"
                            alt="Frenchie picture"
                            [isFilled]="true"
                        />
                    </div>
                </div>
            </header>

            <app-reservation-steps />

            <!-- <div class="flex flex-wrap justify-center gap-4">
                <div class="badge badge-primary badge-lg">
                    <i class="icon-[carbon--certificate] mr-2"></i>
                    <span i18n="@@reservation.hero.guarantee">Garantie santé</span>
                </div>
                <div class="badge badge-secondary badge-lg">
                    <i class="icon-[carbon--security] mr-2"></i>
                    <span i18n="@@reservation.hero.secure">Paiement sécurisé</span>
                </div>
                <div class="badge badge-accent badge-lg">
                    <i class="icon-[carbon--favorite] mr-2"></i>
                    <span i18n="@@reservation.hero.support">Suivi personnalisé</span>
                </div>
            </div> -->

            <!-- Section Chiots disponibles -->
            <section class="section bg-base-100 rounded-lg">
                <div class="flex-col-center gap-8">
                    <h2 class="text-h2 text-center" i18n="@@reservation.available.title">
                        Nos chiots disponibles
                    </h2>

                    <app-loading-state [state]="puppyStore.puppies()">
                        <ng-template let-state>
                            @if (availablePuppies().length > 0) {
                                <div
                                    class="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                                >
                                    @for (puppy of availablePuppies(); track puppy.id) {
                                        <div
                                            class="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl"
                                        >
                                            <figure class="relative">
                                                <app-cloudinary-image
                                                    [publicId]="
                                                        puppy.images[0]?.publicId || 'placeholder'
                                                    "
                                                    [alt]="puppy.name"
                                                    inputClass="aspect-4/3 w-full object-cover"
                                                    [width]="400"
                                                    [height]="300"
                                                />
                                                <div class="absolute right-4 top-4">
                                                    <div class="badge badge-success">
                                                        <span i18n="@@reservation.available.status">
                                                            Disponible
                                                        </span>
                                                    </div>
                                                </div>
                                            </figure>

                                            <div class="card-body">
                                                <h3 class="card-title font-serif">
                                                    {{ puppy.name }}
                                                </h3>

                                                <div class="flex flex-wrap gap-2 text-sm">
                                                    <span class="badge badge-outline">
                                                        {{ puppy.gender }}
                                                    </span>
                                                    <span class="badge badge-outline">
                                                        {{ puppy.color }}
                                                    </span>
                                                </div>

                                                <p
                                                    class="text-base-content/70 line-clamp-2 text-sm"
                                                >
                                                    {{ puppy.description }}
                                                </p>

                                                <div
                                                    class="card-actions mt-4 items-center justify-between"
                                                >
                                                    <span class="text-primary text-2xl font-bold">
                                                        {{ puppy.price }}€
                                                    </span>

                                                    <button
                                                        class="btn btn-primary btn-sm"
                                                        (click)="selectPuppy(puppy.id)"
                                                        i18n="@@reservation.available.select"
                                                    >
                                                        Réserver
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            } @else {
                                <div class="flex-center flex-col gap-6 py-12">
                                    <i
                                        class="icon-[carbon--information] text-base-content/30 text-6xl"
                                    ></i>
                                    <div class="text-center">
                                        <h3
                                            class="mb-2 text-xl font-semibold"
                                            i18n="@@reservation.available.none.title"
                                        >
                                            Aucun chiot disponible actuellement
                                        </h3>
                                        <p
                                            class="text-base-content/70"
                                            i18n="@@reservation.available.none.description"
                                        >
                                            Nos chiots trouvent rapidement leur famille !
                                            Contactez-nous pour être informé des prochaines portées.
                                        </p>
                                    </div>
                                    <a [routerLink]="routes.puppies.path" class="btn btn-outline">
                                        <span i18n="@@reservation.available.none.viewAll">
                                            Voir tous nos chiots
                                        </span>
                                    </a>
                                </div>
                            }
                        </ng-template>
                    </app-loading-state>
                </div>
            </section>

            <!-- Section Formulaire de réservation -->
            @if (selectedPuppyId()) {
                <section class="section">
                    <div class="flex-col-center gap-8">
                        <h2 class="text-h2 text-center" i18n="@@reservation.form.title">
                            Formulaire de réservation
                        </h2>

                        <app-reservation-form
                            [selectedPuppyId]="selectedPuppyId()!"
                            (formSubmitted)="onReservationSubmitted($event)"
                            (cancelled)="onReservationCancelled()"
                        />
                    </div>
                </section>
            }

            <!-- Section Informations importantes -->
            <section class="section bg-warning/10 rounded-lg">
                <div class="flex-col-center gap-6">
                    <h2 class="text-h2 text-center" i18n="@@reservation.info.title">
                        Informations importantes
                    </h2>

                    <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div class="card bg-base-100">
                            <div class="card-body items-center text-center">
                                <i class="icon-[carbon--money] text-primary text-4xl"></i>
                                <h3
                                    class="card-title font-serif"
                                    i18n="@@reservation.info.deposit.title"
                                >
                                    Acompte de réservation
                                </h3>
                                <p class="text-sm" i18n="@@reservation.info.deposit.description">
                                    Un acompte de 30% du prix du chiot est demandé pour confirmer
                                    votre réservation. Le solde est à régler lors de la remise du
                                    chiot.
                                </p>
                            </div>
                        </div>

                        <div class="card bg-base-100">
                            <div class="card-body items-center text-center">
                                <i class="icon-[carbon--calendar] text-primary text-4xl"></i>
                                <h3
                                    class="card-title font-serif"
                                    i18n="@@reservation.info.delivery.title"
                                >
                                    Remise du chiot
                                </h3>
                                <p class="text-sm" i18n="@@reservation.info.delivery.description">
                                    Les chiots sont disponibles à partir de 8 semaines. Nous vous
                                    contacterons pour organiser la remise selon vos disponibilités.
                                </p>
                            </div>
                        </div>

                        <div class="card bg-base-100">
                            <div class="card-body items-center text-center">
                                <i class="icon-[carbon--document] text-primary text-4xl"></i>
                                <h3
                                    class="card-title font-serif"
                                    i18n="@@reservation.info.documents.title"
                                >
                                    Documents fournis
                                </h3>
                                <p class="text-sm" i18n="@@reservation.info.documents.description">
                                    Certificat de santé, carnet de vaccination, puce électronique,
                                    certificat LOF et contrat de vente inclus.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Section FAQ -->
            <section class="section">
                <div class="flex-col-center gap-8">
                    <h2 class="text-h2 text-center" i18n="@@reservation.faq.title">
                        Questions fréquentes
                    </h2>

                    <app-reservation-faq />
                </div>
            </section>

            <!-- Section Contact -->
            <section class="section bg-primary/10 rounded-lg">
                <div class="flex-col-center gap-6 text-center">
                    <h2 class="text-h2" i18n="@@reservation.contact.title">
                        Une question ? Nous sommes là pour vous aider
                    </h2>

                    <p
                        class="text-base-content/70 max-w-2xl"
                        i18n="@@reservation.contact.description"
                    >
                        Notre équipe est disponible pour répondre à toutes vos questions et vous
                        accompagner dans votre démarche d'adoption. N'hésitez pas à nous contacter !
                    </p>

                    <div class="flex flex-wrap justify-center gap-4">
                        <a href="tel:+33123456789" class="btn btn-primary">
                            <i class="icon-[carbon--phone] mr-2"></i>
                            <span i18n="@@reservation.contact.phone">Nous appeler</span>
                        </a>

                        <a href="mailto:contact@frenchiepourtooi.fr" class="btn btn-outline">
                            <i class="icon-[carbon--email] mr-2"></i>
                            <span i18n="@@reservation.contact.email">Nous écrire</span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    `,
})
export class ReservationComponent {
    puppyStore = inject(PuppyStore);
    routes = routes;

    selectedPuppyId = signal<string | null>(null);

    availablePuppies = computed(() => {
        const puppies = this.puppyStore.puppies().data;
        return puppies?.filter((puppy) => puppy.status === 'available') || [];
    });

    constructor() {
        this.puppyStore.loadAllPuppies();
    }

    selectPuppy(puppyId: string) {
        this.selectedPuppyId.set(puppyId);
        // Scroll vers le formulaire
        setTimeout(() => {
            const formSection = document.querySelector('app-reservation-form');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
    }

    onReservationSubmitted(reservationData: any) {
        // Ici on pourrait traiter la soumission de la réservation
        console.log('Réservation soumise:', reservationData);
        // Rediriger vers une page de confirmation ou afficher un message de succès
    }

    onReservationCancelled() {
        this.selectedPuppyId.set(null);
    }
}
