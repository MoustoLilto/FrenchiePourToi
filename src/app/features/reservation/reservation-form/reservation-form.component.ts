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
        <div class="w-full max-w-4xl">
            @if (selectedPuppy()) {
                <!-- Récapitulatif du chiot sélectionné -->
                <div class="card bg-base-100 mb-8 shadow-lg">
                    <div class="card-body">
                        <h3
                            class="card-title mb-6 text-center"
                            i18n="@@reservation.form.selected.title"
                        >
                            Chiot sélectionné
                        </h3>

                        <div class="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                            <div class="flex-center">
                                <app-cloudinary-image
                                    [publicId]="
                                        selectedPuppy()!.images[0]?.publicId || 'placeholder'
                                    "
                                    [alt]="selectedPuppy()!.name"
                                    inputClass="aspect-1/1 size-48 rounded-lg object-cover"
                                    [width]="192"
                                    [height]="192"
                                />
                            </div>

                            <div class="space-y-4">
                                <h4 class="font-serif text-2xl font-bold">
                                    {{ selectedPuppy()!.name }}
                                </h4>

                                <div class="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span
                                            class="font-semibold"
                                            i18n="@@reservation.form.selected.gender"
                                        >
                                            Sexe :
                                        </span>
                                        <span class="ml-2">{{ selectedPuppy()!.gender }}</span>
                                    </div>
                                    <div>
                                        <span
                                            class="font-semibold"
                                            i18n="@@reservation.form.selected.color"
                                        >
                                            Couleur :
                                        </span>
                                        <span class="ml-2">{{ selectedPuppy()!.color }}</span>
                                    </div>
                                    <div>
                                        <span
                                            class="font-semibold"
                                            i18n="@@reservation.form.selected.birth"
                                        >
                                            Naissance :
                                        </span>
                                        <span class="ml-2">
                                            {{ formatDate(selectedPuppy()!.birthDate) }}
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            class="font-semibold"
                                            i18n="@@reservation.form.selected.age"
                                        >
                                            Âge :
                                        </span>
                                        <span class="ml-2">
                                            {{ calculateAge(selectedPuppy()!.birthDate) }}
                                        </span>
                                    </div>
                                </div>

                                <div class="divider"></div>

                                <div class="flex items-center justify-between">
                                    <span
                                        class="text-lg font-semibold"
                                        i18n="@@reservation.form.selected.price"
                                    >
                                        Prix total :
                                    </span>
                                    <span class="text-primary text-2xl font-bold">
                                        {{ selectedPuppy()!.price }}€
                                    </span>
                                </div>

                                <div class="flex items-center justify-between text-sm">
                                    <span i18n="@@reservation.form.selected.deposit">
                                        Acompte (30%) :
                                    </span>
                                    <span class="font-semibold">
                                        {{ calculateDeposit(selectedPuppy()!.price) }}€
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Formulaire de réservation -->
                <form [formGroup]="reservationForm" (ngSubmit)="onSubmit()" class="space-y-8">
                    <!-- Informations personnelles -->
                    <div class="card bg-base-100 shadow-lg">
                        <div class="card-body">
                            <h3 class="card-title mb-6" i18n="@@reservation.form.personal.title">
                                Vos informations personnelles
                            </h3>

                            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div class="form-control">
                                    <label class="label">
                                        <span
                                            class="label-text"
                                            i18n="@@reservation.form.personal.firstName"
                                        >
                                            Prénom *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        formControlName="firstName"
                                        class="input input-bordered"
                                        [class.input-error]="isFieldInvalid('firstName')"
                                        i18n-placeholder="
                                            @@reservation.form.personal.firstName.placeholder"
                                        placeholder="Votre prénom"
                                    />
                                    @if (isFieldInvalid('firstName')) {
                                        <label class="label">
                                            <span
                                                class="label-text-alt text-error"
                                                i18n="
                                                    @@reservation.form.personal.firstName.required"
                                            >
                                                Le prénom est requis
                                            </span>
                                        </label>
                                    }
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span
                                            class="label-text"
                                            i18n="@@reservation.form.personal.lastName"
                                        >
                                            Nom *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        formControlName="lastName"
                                        class="input input-bordered"
                                        [class.input-error]="isFieldInvalid('lastName')"
                                        i18n-placeholder="
                                            @@reservation.form.personal.lastName.placeholder"
                                        placeholder="Votre nom"
                                    />
                                    @if (isFieldInvalid('lastName')) {
                                        <label class="label">
                                            <span
                                                class="label-text-alt text-error"
                                                i18n="@@reservation.form.personal.lastName.required"
                                            >
                                                Le nom est requis
                                            </span>
                                        </label>
                                    }
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span
                                            class="label-text"
                                            i18n="@@reservation.form.personal.email"
                                        >
                                            Email *
                                        </span>
                                    </label>
                                    <input
                                        type="email"
                                        formControlName="email"
                                        class="input input-bordered"
                                        [class.input-error]="isFieldInvalid('email')"
                                        i18n-placeholder="
                                            @@reservation.form.personal.email.placeholder"
                                        placeholder="votre.email@exemple.com"
                                    />
                                    @if (isFieldInvalid('email')) {
                                        <label class="label">
                                            <span class="label-text-alt text-error">
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
                                            </span>
                                        </label>
                                    }
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span
                                            class="label-text"
                                            i18n="@@reservation.form.personal.phone"
                                        >
                                            Téléphone *
                                        </span>
                                    </label>
                                    <input
                                        type="tel"
                                        formControlName="phone"
                                        class="input input-bordered"
                                        [class.input-error]="isFieldInvalid('phone')"
                                        i18n-placeholder="
                                            @@reservation.form.personal.phone.placeholder"
                                        placeholder="06 12 34 56 78"
                                    />
                                    @if (isFieldInvalid('phone')) {
                                        <label class="label">
                                            <span
                                                class="label-text-alt text-error"
                                                i18n="@@reservation.form.personal.phone.required"
                                            >
                                                Le téléphone est requis
                                            </span>
                                        </label>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Adresse -->
                    <div class="card bg-base-100 shadow-lg">
                        <div class="card-body">
                            <h3 class="card-title mb-6" i18n="@@reservation.form.address.title">
                                Votre adresse
                            </h3>

                            <div class="grid grid-cols-1 gap-6">
                                <div class="form-control">
                                    <label class="label">
                                        <span
                                            class="label-text"
                                            i18n="@@reservation.form.address.street"
                                        >
                                            Adresse *
                                        </span>
                                    </label>
                                    <input
                                        type="text"
                                        formControlName="street"
                                        class="input input-bordered"
                                        [class.input-error]="isFieldInvalid('street')"
                                        i18n-placeholder="
                                            @@reservation.form.address.street.placeholder"
                                        placeholder="123 rue de la Paix"
                                    />
                                    @if (isFieldInvalid('street')) {
                                        <label class="label">
                                            <span
                                                class="label-text-alt text-error"
                                                i18n="@@reservation.form.address.street.required"
                                            >
                                                L'adresse est requise
                                            </span>
                                        </label>
                                    }
                                </div>

                                <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div class="form-control">
                                        <label class="label">
                                            <span
                                                class="label-text"
                                                i18n="@@reservation.form.address.postalCode"
                                            >
                                                Code postal *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            formControlName="postalCode"
                                            class="input input-bordered"
                                            [class.input-error]="isFieldInvalid('postalCode')"
                                            i18n-placeholder="
                                                @@reservation.form.address.postalCode.placeholder"
                                            placeholder="75001"
                                        />
                                        @if (isFieldInvalid('postalCode')) {
                                            <label class="label">
                                                <span
                                                    class="label-text-alt text-error"
                                                    i18n="
                                                        @@reservation.form.address.postalCode.required"
                                                >
                                                    Le code postal est requis
                                                </span>
                                            </label>
                                        }
                                    </div>

                                    <div class="form-control md:col-span-2">
                                        <label class="label">
                                            <span
                                                class="label-text"
                                                i18n="@@reservation.form.address.city"
                                            >
                                                Ville *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            formControlName="city"
                                            class="input input-bordered"
                                            [class.input-error]="isFieldInvalid('city')"
                                            i18n-placeholder="
                                                @@reservation.form.address.city.placeholder"
                                            placeholder="Paris"
                                        />
                                        @if (isFieldInvalid('city')) {
                                            <label class="label">
                                                <span
                                                    class="label-text-alt text-error"
                                                    i18n="@@reservation.form.address.city.required"
                                                >
                                                    La ville est requise
                                                </span>
                                            </label>
                                        }
                                    </div>
                                </div>

                                <div class="form-control">
                                    <label class="label">
                                        <span
                                            class="label-text"
                                            i18n="@@reservation.form.address.country"
                                        >
                                            Pays *
                                        </span>
                                    </label>
                                    <select
                                        formControlName="country"
                                        class="select select-bordered"
                                        [class.select-error]="isFieldInvalid('country')"
                                    >
                                        <option
                                            value=""
                                            i18n="@@reservation.form.address.country.placeholder"
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
                                            i18n="@@reservation.form.address.country.belgium"
                                        >
                                            Belgique
                                        </option>
                                        <option
                                            value="Suisse"
                                            i18n="@@reservation.form.address.country.switzerland"
                                        >
                                            Suisse
                                        </option>
                                        <option
                                            value="Luxembourg"
                                            i18n="@@reservation.form.address.country.luxembourg"
                                        >
                                            Luxembourg
                                        </option>
                                    </select>
                                    @if (isFieldInvalid('country')) {
                                        <label class="label">
                                            <span
                                                class="label-text-alt text-error"
                                                i18n="@@reservation.form.address.country.required"
                                            >
                                                Le pays est requis
                                            </span>
                                        </label>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Message -->
                    <div class="card bg-base-100 shadow-lg">
                        <div class="card-body">
                            <h3 class="card-title mb-6" i18n="@@reservation.form.message.title">
                                Message (optionnel)
                            </h3>

                            <div class="form-control">
                                <label class="label">
                                    <span
                                        class="label-text"
                                        i18n="@@reservation.form.message.label"
                                    >
                                        Parlez-nous de vous et de vos attentes
                                    </span>
                                </label>
                                <textarea
                                    formControlName="message"
                                    class="textarea textarea-bordered h-32"
                                    i18n-placeholder="@@reservation.form.message.placeholder"
                                    placeholder="Dites-nous pourquoi vous souhaitez adopter ce chiot, votre expérience avec les chiens, votre mode de vie..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Conditions -->
                    <div class="card bg-base-100 shadow-lg">
                        <div class="card-body">
                            <div class="form-control">
                                <label class="label cursor-pointer justify-start gap-4">
                                    <input
                                        type="checkbox"
                                        formControlName="agreeToTerms"
                                        class="checkbox checkbox-primary"
                                        [class.checkbox-error]="isFieldInvalid('agreeToTerms')"
                                    />
                                    <span class="label-text">
                                        <span i18n="@@reservation.form.terms.text">
                                            J'accepte les conditions générales de vente et je
                                            confirme que toutes les informations fournies sont
                                            exactes
                                        </span>
                                        <span class="text-error">*</span>
                                    </span>
                                </label>
                                @if (isFieldInvalid('agreeToTerms')) {
                                    <label class="label">
                                        <span
                                            class="label-text-alt text-error"
                                            i18n="@@reservation.form.terms.required"
                                        >
                                            Vous devez accepter les conditions générales
                                        </span>
                                    </label>
                                }
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex flex-col justify-center gap-4 sm:flex-row">
                        <button
                            type="button"
                            class="btn btn-outline"
                            (click)="onCancel()"
                            i18n="@@reservation.form.actions.cancel"
                        >
                            Annuler
                        </button>

                        <button
                            type="submit"
                            class="btn btn-primary btn-lg"
                            [disabled]="reservationForm.invalid || isSubmitting()"
                            [class.loading]="isSubmitting()"
                        >
                            @if (isSubmitting()) {
                                <span i18n="@@reservation.form.actions.submitting">
                                    Envoi en cours...
                                </span>
                            } @else {
                                <span i18n="@@reservation.form.actions.submit">
                                    Confirmer la réservation
                                </span>
                            }
                        </button>
                    </div>
                </form>
            }
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
