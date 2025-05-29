import {
    Component,
    Input,
    Output,
    EventEmitter,
    inject,
    signal,
    computed,
    ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PuppyStore } from '@/core/stores/puppy.store';
import { CloudinaryImageComponent } from '@/shared/components/cloudinary-image/cloudinary-image.component';
import { ReservationForm } from '@/core/models/reservation.model';

@Component({
    selector: 'app-reservation-form',
    standalone: true,
    imports: [ReactiveFormsModule, CloudinaryImageComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="bg-base-200 min-h-screen">
            <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 class="sr-only" i18n="@@reservation.form.title">Réservation</h2>

                @if (selectedPuppy()) {
                    <form
                        [formGroup]="reservationForm"
                        (ngSubmit)="onSubmit()"
                        class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
                    >
                        <!-- Formulaire principal -->
                        <div>
                            <!-- Informations de contact -->
                            <div>
                                <h2
                                    class="text-base-content text-lg font-medium"
                                    i18n="@@reservation.form.contact.title"
                                >
                                    Informations de contact
                                </h2>

                                <div class="mt-4">
                                    <label
                                        for="email-address"
                                        class="text-base-content block text-sm/6 font-medium"
                                        i18n="@@reservation.form.personal.email"
                                    >
                                        Adresse email
                                    </label>
                                    <div class="mt-2">
                                        <input
                                            type="email"
                                            id="email-address"
                                            formControlName="email"
                                            autocomplete="email"
                                            class="input input-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-full"
                                            [class.input-error]="isFieldInvalid('email')"
                                            i18n-placeholder="
                                                @@reservation.form.personal.email.placeholder"
                                            placeholder="votre.email@exemple.com"
                                        />
                                        @if (isFieldInvalid('email')) {
                                            <p class="text-error mt-2 text-sm">
                                                @if (
                                                    reservationForm.get('email')?.errors?.[
                                                        'required'
                                                    ]
                                                ) {
                                                    <span
                                                        i18n="
                                                            @@reservation.form.personal.email.required"
                                                    >
                                                        L'email est requis
                                                    </span>
                                                } @else if (
                                                    reservationForm.get('email')?.errors?.['email']
                                                ) {
                                                    <span
                                                        i18n="
                                                            @@reservation.form.personal.email.invalid"
                                                    >
                                                        L'email n'est pas valide
                                                    </span>
                                                }
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <!-- Informations personnelles -->
                            <div class="border-base-300 mt-10 border-t pt-10">
                                <h2
                                    class="text-base-content text-lg font-medium"
                                    i18n="@@reservation.form.personal.title"
                                >
                                    Informations personnelles
                                </h2>

                                <div
                                    class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
                                >
                                    <div>
                                        <label
                                            for="first-name"
                                            class="text-base-content block text-sm/6 font-medium"
                                            i18n="@@reservation.form.personal.firstName"
                                        >
                                            Prénom
                                        </label>
                                        <div class="mt-2">
                                            <input
                                                type="text"
                                                id="first-name"
                                                formControlName="firstName"
                                                autocomplete="given-name"
                                                class="input input-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-full"
                                                [class.input-error]="isFieldInvalid('firstName')"
                                                i18n-placeholder="
                                                    @@reservation.form.personal.firstName.placeholder"
                                                placeholder="Votre prénom"
                                            />
                                            @if (isFieldInvalid('firstName')) {
                                                <p
                                                    class="text-error mt-2 text-sm"
                                                    i18n="
                                                        @@reservation.form.personal.firstName.required"
                                                >
                                                    Le prénom est requis
                                                </p>
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            for="last-name"
                                            class="text-base-content block text-sm/6 font-medium"
                                            i18n="@@reservation.form.personal.lastName"
                                        >
                                            Nom
                                        </label>
                                        <div class="mt-2">
                                            <input
                                                type="text"
                                                id="last-name"
                                                formControlName="lastName"
                                                autocomplete="family-name"
                                                class="input input-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-full"
                                                [class.input-error]="isFieldInvalid('lastName')"
                                                i18n-placeholder="
                                                    @@reservation.form.personal.lastName.placeholder"
                                                placeholder="Votre nom"
                                            />
                                            @if (isFieldInvalid('lastName')) {
                                                <p
                                                    class="text-error mt-2 text-sm"
                                                    i18n="
                                                        @@reservation.form.personal.lastName.required"
                                                >
                                                    Le nom est requis
                                                </p>
                                            }
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label
                                            for="phone"
                                            class="text-base-content block text-sm/6 font-medium"
                                            i18n="@@reservation.form.personal.phone"
                                        >
                                            Téléphone
                                        </label>
                                        <div class="mt-2">
                                            <input
                                                type="tel"
                                                id="phone"
                                                formControlName="phone"
                                                autocomplete="tel"
                                                class="input input-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-full"
                                                [class.input-error]="isFieldInvalid('phone')"
                                                i18n-placeholder="
                                                    @@reservation.form.personal.phone.placeholder"
                                                placeholder="06 12 34 56 78"
                                            />
                                            @if (isFieldInvalid('phone')) {
                                                <p
                                                    class="text-error mt-2 text-sm"
                                                    i18n="
                                                        @@reservation.form.personal.phone.required"
                                                >
                                                    Le téléphone est requis
                                                </p>
                                            }
                                        </div>
                                    </div>

                                    <div class="sm:col-span-2">
                                        <label
                                            for="address"
                                            class="text-base-content block text-sm/6 font-medium"
                                            i18n="@@reservation.form.address.street"
                                        >
                                            Adresse
                                        </label>
                                        <div class="mt-2">
                                            <input
                                                type="text"
                                                id="address"
                                                formControlName="street"
                                                autocomplete="street-address"
                                                class="input input-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-full"
                                                [class.input-error]="isFieldInvalid('street')"
                                                i18n-placeholder="
                                                    @@reservation.form.address.street.placeholder"
                                                placeholder="123 rue de la Paix"
                                            />
                                            @if (isFieldInvalid('street')) {
                                                <p
                                                    class="text-error mt-2 text-sm"
                                                    i18n="
                                                        @@reservation.form.address.street.required"
                                                >
                                                    L'adresse est requise
                                                </p>
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            for="city"
                                            class="text-base-content block text-sm/6 font-medium"
                                            i18n="@@reservation.form.address.city"
                                        >
                                            Ville
                                        </label>
                                        <div class="mt-2">
                                            <input
                                                type="text"
                                                id="city"
                                                formControlName="city"
                                                autocomplete="address-level2"
                                                class="input input-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-full"
                                                [class.input-error]="isFieldInvalid('city')"
                                                i18n-placeholder="
                                                    @@reservation.form.address.city.placeholder"
                                                placeholder="Paris"
                                            />
                                            @if (isFieldInvalid('city')) {
                                                <p
                                                    class="text-error mt-2 text-sm"
                                                    i18n="@@reservation.form.address.city.required"
                                                >
                                                    La ville est requise
                                                </p>
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            for="country"
                                            class="text-base-content block text-sm/6 font-medium"
                                            i18n="@@reservation.form.address.country"
                                        >
                                            Pays
                                        </label>
                                        <div class="mt-2">
                                            <select
                                                id="country"
                                                formControlName="country"
                                                autocomplete="country-name"
                                                class="select select-bordered bg-base-100 text-base-content w-full"
                                                [class.select-error]="isFieldInvalid('country')"
                                            >
                                                <option
                                                    value=""
                                                    i18n="
                                                        @@reservation.form.address.country.placeholder"
                                                >
                                                    Sélectionnez un pays
                                                </option>
                                                <option
                                                    value="France"
                                                    i18n="@@reservation.form.address.country.france"
                                                >
                                                    France
                                                </option>
                                                <option
                                                    value="Belgique"
                                                    i18n="
                                                        @@reservation.form.address.country.belgium"
                                                >
                                                    Belgique
                                                </option>
                                                <option
                                                    value="Suisse"
                                                    i18n="
                                                        @@reservation.form.address.country.switzerland"
                                                >
                                                    Suisse
                                                </option>
                                                <option
                                                    value="Luxembourg"
                                                    i18n="
                                                        @@reservation.form.address.country.luxembourg"
                                                >
                                                    Luxembourg
                                                </option>
                                            </select>
                                            @if (isFieldInvalid('country')) {
                                                <p
                                                    class="text-error mt-2 text-sm"
                                                    i18n="
                                                        @@reservation.form.address.country.required"
                                                >
                                                    Le pays est requis
                                                </p>
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            for="postal-code"
                                            class="text-base-content block text-sm/6 font-medium"
                                            i18n="@@reservation.form.address.postalCode"
                                        >
                                            Code postal
                                        </label>
                                        <div class="mt-2">
                                            <input
                                                type="text"
                                                id="postal-code"
                                                formControlName="postalCode"
                                                autocomplete="postal-code"
                                                class="input input-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-full"
                                                [class.input-error]="isFieldInvalid('postalCode')"
                                                i18n-placeholder="
                                                    @@reservation.form.address.postalCode.placeholder"
                                                placeholder="75001"
                                            />
                                            @if (isFieldInvalid('postalCode')) {
                                                <p
                                                    class="text-error mt-2 text-sm"
                                                    i18n="
                                                        @@reservation.form.address.postalCode.required"
                                                >
                                                    Le code postal est requis
                                                </p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Message optionnel -->
                            <div class="border-base-300 mt-10 border-t pt-10">
                                <h2
                                    class="text-base-content text-lg font-medium"
                                    i18n="@@reservation.form.message.title"
                                >
                                    Message (optionnel)
                                </h2>

                                <div class="mt-4">
                                    <label
                                        for="message"
                                        class="text-base-content block text-sm/6 font-medium"
                                        i18n="@@reservation.form.message.label"
                                    >
                                        Parlez-nous de vous et de vos attentes
                                    </label>
                                    <div class="mt-2">
                                        <textarea
                                            id="message"
                                            formControlName="message"
                                            rows="4"
                                            class="textarea textarea-bordered bg-base-100 text-base-content placeholder:text-base-content/50 w-full"
                                            i18n-placeholder="
                                                @@reservation.form.message.placeholder"
                                            placeholder="Dites-nous pourquoi vous souhaitez adopter ce chiot, votre expérience avec les chiens, votre mode de vie..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <!-- Conditions -->
                            <div class="border-base-300 mt-10 border-t pt-10">
                                <div class="flex items-start">
                                    <div class="flex h-6 items-center">
                                        <input
                                            id="agree-to-terms"
                                            formControlName="agreeToTerms"
                                            type="checkbox"
                                            class="checkbox checkbox-primary"
                                            [class.checkbox-error]="isFieldInvalid('agreeToTerms')"
                                        />
                                    </div>
                                    <div class="ml-3 text-sm/6">
                                        <label
                                            for="agree-to-terms"
                                            class="text-base-content font-medium"
                                        >
                                            <span i18n="@@reservation.form.terms.text">
                                                J'accepte les conditions générales de vente et je
                                                confirme que toutes les informations fournies sont
                                                exactes
                                            </span>
                                            <span class="text-error">*</span>
                                        </label>
                                        @if (isFieldInvalid('agreeToTerms')) {
                                            <p
                                                class="text-error mt-2 text-sm"
                                                i18n="@@reservation.form.terms.required"
                                            >
                                                Vous devez accepter les conditions générales
                                            </p>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Récapitulatif de commande -->
                        <div class="mt-10 lg:mt-0">
                            <h2
                                class="text-base-content text-lg font-medium"
                                i18n="@@reservation.form.summary.title"
                            >
                                Récapitulatif de réservation
                            </h2>

                            <div
                                class="border-base-300 bg-base-100 mt-4 rounded-lg border shadow-sm"
                            >
                                <h3 class="sr-only" i18n="@@reservation.form.selected.title">
                                    Chiot sélectionné
                                </h3>

                                <!-- Chiot sélectionné -->
                                <div class="px-4 py-6 sm:px-6">
                                    <div class="flex items-center">
                                        <div class="shrink-0">
                                            <app-cloudinary-image
                                                [publicId]="
                                                    selectedPuppy()!.images[0]?.publicId ||
                                                    'placeholder'
                                                "
                                                [alt]="selectedPuppy()!.name"
                                                inputClass="w-20 h-20 rounded-md object-cover"
                                                [width]="80"
                                                [height]="80"
                                            />
                                        </div>

                                        <div class="ml-6 flex flex-1 flex-col">
                                            <div class="flex">
                                                <div class="min-w-0 flex-1">
                                                    <h4 class="text-sm">
                                                        <span class="text-base-content font-medium">
                                                            {{ selectedPuppy()!.name }}
                                                        </span>
                                                    </h4>
                                                    <p class="text-base-content/70 mt-1 text-sm">
                                                        <span
                                                            i18n="
                                                                @@reservation.form.selected.gender"
                                                        >
                                                            Sexe :
                                                        </span>
                                                        {{ selectedPuppy()!.gender }}
                                                    </p>
                                                    <p class="text-base-content/70 mt-1 text-sm">
                                                        <span
                                                            i18n="@@reservation.form.selected.color"
                                                        >
                                                            Couleur :
                                                        </span>
                                                        {{ selectedPuppy()!.color }}
                                                    </p>
                                                    <p class="text-base-content/70 mt-1 text-sm">
                                                        <span
                                                            i18n="@@reservation.form.selected.birth"
                                                        >
                                                            Naissance :
                                                        </span>
                                                        {{ formatDate(selectedPuppy()!.birthDate) }}
                                                    </p>
                                                    <p class="text-base-content/70 mt-1 text-sm">
                                                        <span
                                                            i18n="@@reservation.form.selected.age"
                                                        >
                                                            Âge :
                                                        </span>
                                                        {{
                                                            calculateAge(selectedPuppy()!.birthDate)
                                                        }}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Détails financiers -->
                                <dl class="border-base-300 space-y-6 border-t px-4 py-6 sm:px-6">
                                    <div class="flex items-center justify-between">
                                        <dt
                                            class="text-base-content text-sm"
                                            i18n="@@reservation.form.summary.price"
                                        >
                                            Prix du chiot
                                        </dt>
                                        <dd class="text-base-content text-sm font-medium">
                                            {{ selectedPuppy()!.price }}€
                                        </dd>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <dt
                                            class="text-base-content text-sm"
                                            i18n="@@reservation.form.summary.deposit"
                                        >
                                            Acompte (30%)
                                        </dt>
                                        <dd class="text-base-content text-sm font-medium">
                                            {{ calculateDeposit(selectedPuppy()!.price) }}€
                                        </dd>
                                    </div>
                                    <div
                                        class="border-base-300 flex items-center justify-between border-t pt-6"
                                    >
                                        <dt
                                            class="text-base-content text-base font-medium"
                                            i18n="@@reservation.form.summary.remaining"
                                        >
                                            Solde à régler
                                        </dt>
                                        <dd class="text-base-content text-base font-medium">
                                            {{
                                                selectedPuppy()!.price -
                                                    calculateDeposit(selectedPuppy()!.price)
                                            }}€
                                        </dd>
                                    </div>
                                </dl>

                                <!-- Actions -->
                                <div class="border-base-300 space-y-4 border-t px-4 py-6 sm:px-6">
                                    <button
                                        type="submit"
                                        class="btn btn-primary w-full"
                                        [disabled]="reservationForm.invalid || isSubmitting()"
                                    >
                                        @if (isSubmitting()) {
                                            <span class="loading loading-spinner loading-sm"></span>
                                            <span i18n="@@reservation.form.actions.submitting">
                                                Envoi en cours...
                                            </span>
                                        } @else {
                                            <span i18n="@@reservation.form.actions.submit">
                                                Confirmer la réservation
                                            </span>
                                        }
                                    </button>

                                    <button
                                        type="button"
                                        class="btn btn-outline w-full"
                                        (click)="onCancel()"
                                        i18n="@@reservation.form.actions.cancel"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>

                            <!-- Note informative -->
                            <div class="mt-6 text-center">
                                <p
                                    class="text-base-content/70 text-sm"
                                    i18n="@@reservation.form.info.note"
                                >
                                    Un acompte de 30% est requis pour confirmer la réservation. Le
                                    solde sera à régler lors de la récupération du chiot.
                                </p>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </div>
    `,
})
export class ReservationFormComponent {
    @Input() selectedPuppyId!: string;
    @Output() formSubmitted = new EventEmitter<ReservationForm>();
    @Output() cancelled = new EventEmitter<void>();

    private fb = inject(FormBuilder);
    private puppyStore = inject(PuppyStore);

    isSubmitting = signal(false);

    selectedPuppy = computed(() => {
        const puppies = this.puppyStore.puppies().data;
        return puppies?.find((puppy) => puppy.id === this.selectedPuppyId) || null;
    });

    reservationForm: FormGroup = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9\s\-+()]+$/)]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
        country: ['France', [Validators.required]],
        message: [''],
        agreeToTerms: [false, [Validators.requiredTrue]],
    });

    isFieldInvalid(fieldName: string): boolean {
        const field = this.reservationForm.get(fieldName);
        return !!(field && field.invalid && (field.dirty || field.touched));
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    }

    calculateAge(birthDate: string): string {
        const birth = new Date(birthDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - birth.getTime());
        const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));

        if (diffWeeks < 4) {
            return `${diffWeeks} semaine${diffWeeks > 1 ? 's' : ''}`;
        } else {
            const months = Math.floor(diffWeeks / 4);
            return `${months} mois`;
        }
    }

    calculateDeposit(price: number): number {
        return Math.round(price * 0.3);
    }

    onSubmit(): void {
        if (this.reservationForm.valid && !this.isSubmitting()) {
            this.isSubmitting.set(true);

            const formValue = this.reservationForm.value;
            const reservationData: ReservationForm = {
                puppyId: this.selectedPuppyId,
                customerInfo: {
                    firstName: formValue.firstName,
                    lastName: formValue.lastName,
                    email: formValue.email,
                    phone: formValue.phone,
                    address: {
                        street: formValue.street,
                        city: formValue.city,
                        postalCode: formValue.postalCode,
                        country: formValue.country,
                    },
                },
                message: formValue.message || '',
                agreeToTerms: formValue.agreeToTerms,
            };

            // Simuler un délai d'envoi
            setTimeout(() => {
                this.isSubmitting.set(false);
                this.formSubmitted.emit(reservationData);
            }, 2000);
        } else {
            // Marquer tous les champs comme touchés pour afficher les erreurs
            Object.keys(this.reservationForm.controls).forEach((key) => {
                this.reservationForm.get(key)?.markAsTouched();
            });
        }
    }

    onCancel(): void {
        this.cancelled.emit();
    }
}
