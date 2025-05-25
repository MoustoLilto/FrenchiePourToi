import {
    Component,
    Input,
    ChangeDetectionStrategy,
    signal,
    effect,
    inject,
    computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuppyFilters } from '@/core/services/puppy.service';
import { PuppyStore } from '@/core/stores/puppy.store';

@Component({
    selector: 'app-puppy-filters',
    standalone: true,
    imports: [CommonModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div
            class="bg-base-100 shadow-base-content/5 ring-base-content/5 rounded-box p-4 shadow-lg ring-1"
        >
            <div class="mb-4 flex items-center justify-between">
                <h3 class="text-lg font-semibold" i18n="@@puppy.filters.title">
                    Filtrer les chiots
                </h3>
                @if (puppyStore.hasActiveFilters()) {
                    <button
                        class="btn btn-ghost btn-sm"
                        (click)="puppyStore.clearFilters()"
                        i18n="@@puppy.filters.clear"
                    >
                        Effacer
                    </button>
                }
            </div>

            <div class="space-y-4">
                <div class="form-control">
                    <label for="search-input" class="label">
                        <span class="label-text" i18n="@@puppy.filters.search">Recherche</span>
                    </label>

                    <input
                        id="search-input"
                        type="text"
                        class="input input-sm"
                        i18n-placeholder="@@puppy.filters.search.placeholder"
                        placeholder="Nom, couleur, caractéristiques..."
                        [ngModel]="puppyStore.searchQuery()"
                        (ngModelChange)="puppyStore.updateSearchQuery($event)"
                    />
                </div>

                <!-- Sexe -->
                <div class="form-control">
                    <label for="gender-select" class="label">
                        <span class="label-text" i18n="@@puppy.filters.gender">Sexe</span>
                    </label>
                    <select
                        id="gender-select"
                        class="select select-bordered select-sm"
                        [(ngModel)]="gender"
                        (ngModelChange)="onFiltersChange()"
                    >
                        <option value="" i18n="@@puppy.filters.gender.all">Tous</option>
                        <option value="Male" i18n="@@puppy.filters.gender.male">Mâle</option>
                        <option value="Female" i18n="@@puppy.filters.gender.female">Femelle</option>
                    </select>
                </div>

                <!-- Couleur -->
                <div class="form-control">
                    <label for="color-select" class="label">
                        <span class="label-text" i18n="@@puppy.filters.color">Couleur</span>
                    </label>
                    <select
                        id="color-select"
                        class="select select-bordered select-sm"
                        [(ngModel)]="color"
                        (ngModelChange)="onFiltersChange()"
                    >
                        <option value="" i18n="@@puppy.filters.color.all">Toutes</option>
                        @for (color of availableColors; track color) {
                            <option [value]="color">{{ color }}</option>
                        }
                    </select>
                </div>

                <!-- Statut -->
                <div class="form-control">
                    <label for="status-select" class="label">
                        <span class="label-text" i18n="@@puppy.filters.status">Statut</span>
                    </label>
                    <select
                        id="status-select"
                        class="select select-bordered select-sm"
                        [(ngModel)]="status"
                        (ngModelChange)="onFiltersChange()"
                    >
                        <option value="" i18n="@@puppy.filters.status.all">Tous</option>
                        <option value="available" i18n="@@puppy.filters.status.available">
                            Disponible
                        </option>
                        <option value="reserved" i18n="@@puppy.filters.status.reserved">
                            Réservé
                        </option>
                        <option value="adopted" i18n="@@puppy.filters.status.adopted">
                            Adopté
                        </option>
                    </select>
                </div>

                <!-- Prix -->
                <div class="form-control">
                    <label class="label" for="min-price-input">
                        <span class="label-text" i18n="@@puppy.filters.price">Prix</span>
                    </label>
                    <div class="grid grid-cols-2 gap-2">
                        <input
                            id="min-price-input"
                            type="number"
                            class="input input-bordered input-sm"
                            placeholder="Min"
                            [(ngModel)]="minPrice"
                            (ngModelChange)="onFiltersChange()"
                            min="0"
                        />
                        <input
                            id="max-price-input"
                            type="number"
                            class="input input-bordered input-sm"
                            placeholder="Max"
                            [(ngModel)]="maxPrice"
                            (ngModelChange)="onFiltersChange()"
                            min="0"
                        />
                    </div>
                </div>

                <!-- Âge en semaines -->
                <div class="form-control">
                    <label class="label" for="min-age-input">
                        <span class="label-text" i18n="@@puppy.filters.age">Âge (semaines)</span>
                    </label>
                    <div class="grid grid-cols-2 gap-2">
                        <input
                            id="min-age-input"
                            type="number"
                            class="input input-bordered input-sm"
                            placeholder="Min"
                            [(ngModel)]="ageMinWeeks"
                            (ngModelChange)="onFiltersChange()"
                            min="0"
                        />
                        <input
                            id="max-age-input"
                            type="number"
                            class="input input-bordered input-sm"
                            placeholder="Max"
                            [(ngModel)]="ageMaxWeeks"
                            (ngModelChange)="onFiltersChange()"
                            min="0"
                        />
                    </div>
                </div>
            </div>

            <!-- Résumé des filtres actifs -->
            @if (puppyStore.hasActiveFilters()) {
                <div class="border-base-200 mt-4 border-t pt-4">
                    <div class="text-base-content/70 mb-2 text-sm">
                        <span i18n="@@puppy.filters.active">Filtres actifs</span>
                        ({{ puppyStore.activeFiltersCount() }})
                    </div>
                    <div class="flex flex-wrap gap-1">
                        @if (gender()) {
                            <span class="badge badge-primary badge-sm">
                                {{ gender() }}
                                <button class="ml-1" (click)="removeFilter('gender')" type="button">
                                    ×
                                </button>
                            </span>
                        }
                        @if (color()) {
                            <span class="badge badge-primary badge-sm">
                                {{ color() }}
                                <button class="ml-1" (click)="removeFilter('color')" type="button">
                                    ×
                                </button>
                            </span>
                        }
                        @if (status()) {
                            <span class="badge badge-primary badge-sm">
                                {{ status() }}
                                <button class="ml-1" (click)="removeFilter('status')" type="button">
                                    ×
                                </button>
                            </span>
                        }
                    </div>
                </div>
            }
        </div>
    `,
})
export class PuppyFiltersComponent {
    puppyStore = inject(PuppyStore);
    @Input() availableColors: string[] = ['Fauve', 'Bringé', 'Crème', 'Pied'];

    // Propriétés séparées pour les filtres
    gender = signal<string>('');
    color = signal<string>('');
    status = signal<string>('');
    minPrice = signal<number | undefined>(undefined);
    maxPrice = signal<number | undefined>(undefined);
    ageMinWeeks = signal<number | undefined>(undefined);
    ageMaxWeeks = signal<number | undefined>(undefined);

    currentFilters = computed(() => ({
        gender: this.gender() || undefined,
        color: this.color() || undefined,
        status: this.status() || undefined,
        minPrice: this.minPrice(),
        maxPrice: this.maxPrice(),
        ageMinWeeks: this.ageMinWeeks(),
        ageMaxWeeks: this.ageMaxWeeks(),
    }));

    constructor() {
        effect(() => {
            const storeFilters = this.puppyStore.filters();
            this.updateFiltersFromInput(storeFilters);
        });
    }

    onFiltersChange() {
        this.puppyStore.updateFilters(this.currentFilters());
    }

    removeFilter(filterKey: keyof PuppyFilters) {
        switch (filterKey) {
            case 'gender':
                this.gender.set('');
                break;
            case 'color':
                this.color.set('');
                break;
            case 'status':
                this.status.set('');
                break;
            case 'minPrice':
                this.minPrice.set(undefined);
                break;
            case 'maxPrice':
                this.maxPrice.set(undefined);
                break;
            case 'ageMinWeeks':
                this.ageMinWeeks.set(undefined);
                break;
            case 'ageMaxWeeks':
                this.ageMaxWeeks.set(undefined);
                break;
        }
        this.onFiltersChange();
    }

    private updateFiltersFromInput(filters: PuppyFilters) {
        if (filters.gender !== this.gender()) {
            this.gender.set(filters.gender || '');
        }
        if (filters.color !== this.color()) {
            this.color.set(filters.color || '');
        }
        if (filters.status !== this.status()) {
            this.status.set(filters.status || '');
        }
        if (filters.minPrice !== this.minPrice()) {
            this.minPrice.set(filters.minPrice);
        }
        if (filters.maxPrice !== this.maxPrice()) {
            this.maxPrice.set(filters.maxPrice);
        }
        if (filters.ageMinWeeks !== this.ageMinWeeks()) {
            this.ageMinWeeks.set(filters.ageMinWeeks);
        }
        if (filters.ageMaxWeeks !== this.ageMaxWeeks()) {
            this.ageMaxWeeks.set(filters.ageMaxWeeks);
        }
    }
}
