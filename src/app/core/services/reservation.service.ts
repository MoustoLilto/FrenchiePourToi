import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { Reservation, ReservationForm, ReservationResponse } from '@/core/models/reservation.model';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { withLoadingState } from '@/shared/rxjs/with-loading-state.operator';

@Injectable({
    providedIn: 'root',
})
export class ReservationService {
    private http = inject(HttpClient);

    createReservation(
        reservationForm: ReservationForm
    ): Observable<LoadingState<ReservationResponse>> {
        // Simulation d'un appel API pour créer une réservation
        const newReservation: Reservation = {
            id: this.generateReservationId(),
            puppyId: reservationForm.puppyId,
            customer: reservationForm.customerInfo,
            status: 'pending',
            payment: {
                depositAmount: 500, // Acompte fixe pour l'exemple
                totalAmount: 2500, // Prix fixe pour l'exemple
                paidAmount: 0,
                paymentMethod: 'pending',
                dueDate: this.calculateDueDate(),
            },
            dates: {
                reservationDate: new Date().toISOString(),
                expectedDeliveryDate: this.calculateExpectedDeliveryDate(),
            },
            notes: reservationForm.message,
            documents: [],
        };

        const response: ReservationResponse = {
            reservation: newReservation,
            success: true,
            message: 'Réservation créée avec succès',
        };

        return of(response).pipe(
            delay(1500), // Simulation du délai réseau
            withLoadingState()
        );
    }

    getReservationById(id: string): Observable<LoadingState<Reservation | null>> {
        // Simulation d'un appel API pour récupérer une réservation
        // En production, ceci ferait un appel HTTP réel
        return of(null).pipe(delay(1000), withLoadingState());
    }

    updateReservationStatus(
        id: string,
        status: Reservation['status']
    ): Observable<LoadingState<ReservationResponse>> {
        const response: ReservationResponse = {
            reservation: {} as Reservation, // En production, retourner la réservation mise à jour
            success: true,
            message: `Statut de la réservation mis à jour: ${status}`,
        };

        return of(response).pipe(delay(1000), withLoadingState());
    }

    processPayment(
        reservationId: string,
        paymentDetails: {
            amount: number;
            paymentMethod: string;
            token: string;
        }
    ): Observable<
        LoadingState<{
            success: boolean;
            transactionId: string;
            message: string;
        }>
    > {
        // Simulation du traitement de paiement
        const paymentResult = {
            success: true,
            transactionId: this.generateTransactionId(),
            message: 'Paiement traité avec succès',
        };

        return of(paymentResult).pipe(
            delay(2000), // Simulation du délai de traitement de paiement
            withLoadingState()
        );
    }

    sendReservationConfirmation(
        reservationId: string
    ): Observable<LoadingState<{ success: boolean; message: string }>> {
        const result = {
            success: true,
            message: 'Email de confirmation envoyé',
        };

        return of(result).pipe(delay(500), withLoadingState());
    }

    calculateDepositAmount(puppyPrice: number): number {
        // Calcul de l'acompte (20% du prix ou minimum 500€)
        return Math.max(puppyPrice * 0.2, 500);
    }

    validateReservationForm(form: ReservationForm): {
        isValid: boolean;
        errors: Record<string, string>;
    } {
        const errors: Record<string, string> = {};

        // Validation des champs obligatoires
        if (!form.customerInfo.firstName?.trim()) {
            errors['firstName'] = 'Le prénom est obligatoire';
        }

        if (!form.customerInfo.lastName?.trim()) {
            errors['lastName'] = 'Le nom est obligatoire';
        }

        if (!form.customerInfo.email?.trim()) {
            errors['email'] = "L'email est obligatoire";
        } else if (!this.isValidEmail(form.customerInfo.email)) {
            errors['email'] = "L'email n'est pas valide";
        }

        if (!form.customerInfo.phone?.trim()) {
            errors['phone'] = 'Le téléphone est obligatoire';
        }

        if (!form.customerInfo.address.city?.trim()) {
            errors['city'] = 'La ville est obligatoire';
        }

        if (!form.customerInfo.address.postalCode?.trim()) {
            errors['postalCode'] = 'Le code postal est obligatoire';
        }

        if (!form.agreeToTerms) {
            errors['terms'] = 'Vous devez accepter les conditions générales';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }

    private generateReservationId(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `RES-${timestamp}-${random}`;
    }

    private generateTransactionId(): string {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        return `TXN-${timestamp}-${random}`;
    }

    private calculateDueDate(): string {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7); // 7 jours pour payer l'acompte
        return dueDate.toISOString();
    }

    private calculateExpectedDeliveryDate(): string {
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 21); // 3 semaines pour la livraison
        return deliveryDate.toISOString();
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
