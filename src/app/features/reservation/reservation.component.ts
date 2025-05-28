import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { PuppyStore } from '@/core/stores/puppy.store';
import { routes } from '@/core/constants/routes.constants';
import { ReservationStepsComponent } from './reservation-steps/reservation-steps.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ReservationFaqComponent } from './reservation-faq/reservation-faq.component';
import { address } from '@/core/constants/address.constants';

@Component({
    selector: 'app-reservation',
    imports: [
        RouterLink,
        CloudinaryImageComponent,
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

            <!-- Section Formulaire de réservation -->
            @if (selectedPuppyId()) {
                <section class="section">
                    <div class="flex-col-center gap-8">
                        <h2 class="text-h2 text-center" i18n="@@reservation.form.title">
                            Formulaire de réservation
                        </h2>

                        <app-reservation-form
                            id="app-reservation-form"
                            [selectedPuppyId]="selectedPuppyId()!"
                            (formSubmitted)="onReservationSubmitted($event)"
                            (cancelled)="onReservationCancelled()"
                        />
                    </div>
                </section>
            } @else {
                <section class="section bg-base-100 border-info rounded-lg border">
                    <div class="flex-col-center gap-6 text-center">
                        <i class="icon-[carbon--information] text-info text-6xl"></i>
                        <h3 class="text-h3 text-base-content" i18n="@@reservation.no-puppy.title">
                            Aucun chiot sélectionné
                        </h3>
                        <p
                            class="text-base-content/70 max-w-2xl"
                            i18n="@@reservation.no-puppy.description"
                        >
                            Pour réserver un chiot, veuillez d'abord en sélectionner un depuis notre
                            page dédiée aux chiots disponibles.
                        </p>
                        <a [routerLink]="routes.puppies.path" class="btn btn-primary">
                            <span i18n="@@reservation.no-puppy.browse">Voir nos chiots</span>
                            <i class="icon-[carbon--arrow-right]"></i>
                        </a>
                    </div>
                </section>
            }

            <!-- Section Informations importantes -->
            <section class="section-content bg-base-100 rounded-lg">
                <h3 class="text-h3 text-center" i18n="@@reservation.info.title">
                    Informations importantes
                </h3>

                <div class="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    @for (info of importantInfo; track info.title) {
                        <div class="card bg-base-200">
                            <div class="card-body items-center text-center">
                                <i [class]="info.icon" class="text-primary text-4xl"></i>

                                <h3 class="card-title font-serif">
                                    {{ info.title }}
                                </h3>

                                <p class="text-sm">
                                    {{ info.description }}
                                </p>
                            </div>
                        </div>
                    }
                </div>
            </section>

            <!-- Section FAQ -->
            <app-reservation-faq />

            <!-- Section Contact -->
            <section class="section-content bg-primary/10 rounded-lg">
                <h3 class="text-h3 text-center" i18n="@@reservation.contact.title">
                    Une question ? Nous sommes là pour vous aider
                </h3>

                <p class="text-base-content/70 max-w-2xl" i18n="@@reservation.contact.description">
                    Notre équipe est disponible pour répondre à toutes vos questions et vous
                    accompagner dans votre démarche d'adoption. N'hésitez pas à nous contacter !
                </p>

                <div class="flex flex-wrap justify-center gap-4">
                    <a [href]="'tel:' + address.phone" class="btn btn-primary flex-center gap-2">
                        <i class="icon-[carbon--phone]"></i>
                        <span i18n="@@reservation.contact.phone">Nous appeler</span>
                    </a>

                    <a [href]="'mailto:' + address.email" class="btn btn-outline flex-center gap-2">
                        <i class="icon-[carbon--email]"></i>
                        <span i18n="@@reservation.contact.email">Nous écrire</span>
                    </a>
                </div>
            </section>
        </div>
    `,
})
export class ReservationComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    puppyStore = inject(PuppyStore);
    routes = routes;
    address = address;

    selectedPuppyId = signal<string | null>(null);

    importantInfo = [
        {
            icon: 'icon-[carbon--money]',
            title: $localize`:@@reservation.info.deposit.title:Acompte de réservation`,
            description: $localize`:@@reservation.info.deposit.description:Un acompte de 30% du prix du chiot est demandé pour confirmer votre réservation. Le solde est à régler lors de la remise du chiot.`,
        },
        {
            icon: 'icon-[carbon--calendar]',
            title: $localize`:@@reservation.info.delivery.title:Remise du chiot`,
            description: $localize`:@@reservation.info.delivery.description:Les chiots sont disponibles à partir de 8 semaines. Nous vous contacterons pour organiser la remise selon vos disponibilités.`,
        },
        {
            icon: 'icon-[carbon--document]',
            title: $localize`:@@reservation.info.documents.title:Documents fournis`,
            description: $localize`:@@reservation.info.documents.description:Certificat de santé, carnet de vaccination, puce électronique, certificat LOF et contrat de vente inclus.`,
        },
    ];

    ngOnInit() {
        // Récupérer l'ID du chiot depuis les paramètres de requête
        this.route.queryParams.subscribe((params) => {
            const puppyId = params['puppyId'];
            if (puppyId) {
                this.selectedPuppyId.set(puppyId);
            }

            // Faire défiler jusqu'au formulaire de réservation
            setTimeout(() => {
                const reservationForm = document.getElementById('app-reservation-form');
                if (reservationForm) {
                    reservationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500);
        });

        this.puppyStore.loadAllPuppies();
    }

    onReservationSubmitted(reservationData: any) {
        // Ici on pourrait traiter la soumission de la réservation
        console.log('Réservation soumise:', reservationData);
        // Rediriger vers une page de confirmation ou afficher un message de succès
    }

    onReservationCancelled() {
        this.selectedPuppyId.set(null);

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { puppyId: null },
            queryParamsHandling: 'replace',
            replaceUrl: true,
        });
    }
}
