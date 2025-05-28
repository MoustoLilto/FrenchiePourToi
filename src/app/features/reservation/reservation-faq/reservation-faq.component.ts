import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-reservation-faq',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="w-full max-w-4xl">
            <div class="space-y-4">
                @for (faq of faqs; track faq.id) {
                    <div class="collapse-plus bg-base-100 collapse shadow-lg">
                        <input type="radio" name="faq-accordion" [id]="'faq-' + faq.id" />
                        <div class="collapse-title text-lg font-medium">
                            <label [for]="'faq-' + faq.id" class="cursor-pointer">
                                {{ faq.question }}
                            </label>
                        </div>
                        <div class="collapse-content">
                            <p class="text-base-content/80">{{ faq.answer }}</p>
                        </div>
                    </div>
                }
            </div>

            <!-- Contact pour plus d'informations -->
            <div class="mt-8 text-center">
                <div class="card bg-primary/5 border-primary/20 border">
                    <div class="card-body">
                        <h3
                            class="card-title text-primary justify-center"
                            i18n="@@reservation.faq.contact.title"
                        >
                            Vous avez d'autres questions ?
                        </h3>
                        <p
                            class="text-base-content/70 text-center"
                            i18n="@@reservation.faq.contact.description"
                        >
                            Notre équipe est là pour vous aider et répondre à toutes vos
                            interrogations
                        </p>
                        <div class="card-actions mt-4 justify-center">
                            <a href="tel:+33123456789" class="btn btn-primary btn-sm">
                                <i class="icon-[carbon--phone] mr-2"></i>
                                <span i18n="@@reservation.faq.contact.phone">Nous appeler</span>
                            </a>
                            <a
                                href="mailto:contact@frenchiepourtooi.fr"
                                class="btn btn-outline btn-sm"
                            >
                                <i class="icon-[carbon--email] mr-2"></i>
                                <span i18n="@@reservation.faq.contact.email">Nous écrire</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})
export class ReservationFaqComponent {
    faqs = [
        {
            id: 1,
            question: $localize`:@@reservation.faq.process.question:Comment se déroule le processus de réservation ?`,
            answer: $localize`:@@reservation.faq.process.answer:Le processus est simple : sélectionnez votre chiot, remplissez le formulaire de réservation, versez l'acompte de 30% pour confirmer votre réservation, puis récupérez votre chiot à partir de 8 semaines avec tous les documents officiels.`,
        },
        {
            id: 2,
            question: $localize`:@@reservation.faq.deposit.question:Quel est le montant de l'acompte et quand le verser ?`,
            answer: $localize`:@@reservation.faq.deposit.answer:L'acompte représente 30% du prix total du chiot. Il doit être versé dans les 48h suivant la validation de votre demande de réservation pour confirmer celle-ci. Le solde est à régler lors de la remise du chiot.`,
        },
        {
            id: 3,
            question: $localize`:@@reservation.faq.age.question:À quel âge puis-je récupérer mon chiot ?`,
            answer: $localize`:@@reservation.faq.age.answer:Conformément à la législation française, nos chiots sont disponibles à partir de 8 semaines minimum. Cet âge permet au chiot d'être sevré et d'avoir reçu ses premiers vaccins. Nous vous contacterons pour organiser la remise.`,
        },
        {
            id: 4,
            question: $localize`:@@reservation.faq.documents.question:Quels documents recevrai-je avec mon chiot ?`,
            answer: $localize`:@@reservation.faq.documents.answer:Votre chiot sera remis avec un certificat de bonne santé vétérinaire, un carnet de santé à jour des vaccinations, une puce électronique d'identification, un certificat de naissance LOF (si applicable), un contrat de vente et une garantie écrite.`,
        },
        {
            id: 5,
            question: $localize`:@@reservation.faq.health.question:Quelle garantie santé proposez-vous ?`,
            answer: $localize`:@@reservation.faq.health.answer:Nous offrons une garantie santé de 7 jours contre les maladies infectieuses et de 1 an contre les vices rédhibitoires. Tous nos chiots sont examinés par notre vétérinaire avant la remise et sont vendus en parfaite santé.`,
        },
        {
            id: 6,
            question: $localize`:@@reservation.faq.payment.question:Quels moyens de paiement acceptez-vous ?`,
            answer: $localize`:@@reservation.faq.payment.answer:Nous acceptons les virements bancaires, les chèques et les espèces. Pour l'acompte, nous privilégions le virement bancaire pour sa sécurité. Les coordonnées bancaires vous seront communiquées après validation de votre réservation.`,
        },
        {
            id: 7,
            question: $localize`:@@reservation.faq.cancel.question:Puis-je annuler ma réservation ?`,
            answer: $localize`:@@reservation.faq.cancel.answer:Une annulation est possible jusqu'à 15 jours avant la date prévue de remise. L'acompte sera remboursé à 50% pour couvrir les frais engagés. Passé ce délai, l'acompte ne sera pas remboursé sauf cas de force majeure.`,
        },
        {
            id: 8,
            question: $localize`:@@reservation.faq.visit.question:Puis-je venir voir le chiot avant la réservation ?`,
            answer: $localize`:@@reservation.faq.visit.answer:Bien sûr ! Nous encourageons les visites pour que vous puissiez rencontrer votre futur compagnon et ses parents. Contactez-nous pour convenir d'un rendez-vous. Les visites se font sur rendez-vous uniquement pour le bien-être de nos animaux.`,
        },
        {
            id: 9,
            question: $localize`:@@reservation.faq.delivery.question:Proposez-vous la livraison ?`,
            answer: $localize`:@@reservation.faq.delivery.answer:Nous privilégions la remise en main propre dans notre élevage pour que vous puissiez voir l'environnement du chiot. Cependant, nous pouvons étudier des solutions de transport pour les longues distances. Des frais supplémentaires s'appliquent selon la destination.`,
        },
        {
            id: 10,
            question: $localize`:@@reservation.faq.preparation.question:Comment préparer l'arrivée de mon chiot ?`,
            answer: $localize`:@@reservation.faq.preparation.answer:Nous vous fournirons un guide complet pour préparer l'arrivée de votre chiot : équipements nécessaires, alimentation, vétérinaire, éducation de base. Nous restons disponibles pour vous conseiller même après l'adoption.`,
        },
    ];
}
