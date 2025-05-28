import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { routes } from '@/core/constants/routes.constants';

@Component({
    selector: 'app-reservation-steps',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink],
    template: `
        <section class="section-content">
            <div class="flex-col-center gap-8">
                <h2 class="text-h2 text-center" i18n="@@reservation.process.title">
                    Comment ça marche ?
                </h2>

                <p
                    class="text-base-content/70 max-w-2xl text-center"
                    i18n="@@reservation.process.subtitle"
                >
                    Un processus simple en 4 étapes pour vous accompagner dans l'adoption de votre
                    chiot
                </p>

                <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    @for (step of steps; track step.number; let isLast = $last) {
                        <div class="card bg-base-100 group relative shadow-xl">
                            <div class="card-body items-center text-center">
                                <div
                                    class="text-primary bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl font-bold"
                                >
                                    {{ step.number }}
                                </div>
                                <h4 class="card-title font-serif">
                                    {{ step.title }}
                                </h4>
                                <p>{{ step.description }}</p>

                                @if (step.number === 1) {
                                    <div
                                        class="bg-primary/80 flex-center absolute inset-0 hidden group-hover:flex"
                                    >
                                        <a [routerLink]="routes.puppies.path" class="btn btn-ghost">
                                            <i class="icon-[carbon--arrow-up-right]"></i>
                                            <span i18n="@@reservation.process.button">
                                                Voir nos chiots
                                            </span>
                                        </a>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    `,
})
export class ReservationStepsComponent {
    routes = routes;
    steps = [
        {
            number: 1,
            title: $localize`:@@reservation.steps.select.title:Choisissez votre chiot`,
            description: $localize`:@@reservation.steps.select.description:Parcourez nos chiots disponibles et sélectionnez celui qui vous fait craquer`,
        },
        {
            number: 2,
            title: $localize`:@@reservation.steps.form.title:Remplissez le formulaire`,
            description: $localize`:@@reservation.steps.form.description:Complétez vos informations personnelles et vos préférences pour la remise`,
        },
        {
            number: 3,
            title: $localize`:@@reservation.steps.visit.title:Visite et sélection`,
            description: $localize`:@@reservation.steps.visit.description:Suite à un entretien téléphonique, vous visitez notre élevage pour rencontrer le chiot et ses parents.`,
        },
        {
            number: 4,
            title: $localize`:@@reservation.steps.payment.title:Confirmation et acompte`,
            description: $localize`:@@reservation.steps.payment.description:Vous confirmez votre réservation en versant un acompte de 30% du prix du chiot, le solde étant réglé à la remise du chiot.`,
        },
    ];
}
