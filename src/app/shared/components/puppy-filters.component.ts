import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    signal,
    computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PuppyFilters } from '@/core/services/puppy.service';

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
                @if (hasActiveFilters()) {
                    <button
                        class="btn btn-ghost btn-sm"
                        (click)="clearAllFilters()"
                        i18n="@@puppy.filters.clear"
                    >
                        Effacer
                    </button>
                }
            </div>

            <div class="space-y-4">
                <!-- Recherche textuelle -->
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
                        [(ngModel)]="searchQuery"
                        (ngModelChange)="onSearchChange($event)"
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
                        [(ngModel)]="currentFilters().gender"
                        (ngModelChange)="onFiltersChange()"
                    >
                        <option value="" i18n="@@puppy.filters.gender.all">Tous</option>
                        <option value="male" i18n="@@puppy.filters.gender.male">Mâle</option>
                        <option value="female" i18n="@@puppy.filters.gender.female">Femelle</option>
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
                        [(ngModel)]="currentFilters().color"
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
                        [(ngModel)]="currentFilters().status"
                        (ngModelChange)="onFiltersChange()"
                    >
                        <option value="" i18n="@@puppy.filters.status.all">Tous</option>
                        <option value="available" i18n="@@puppy.filters.status.available">
                            Disponible
                        </option>
                        <option value="reserved" i18n="@@puppy.filters.status.reserved">
                            Réservé
                        </option>
                        <option value="sold" i18n="@@puppy.filters.status.sold">Vendu</option>
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
                            [placeholder]="minPricePlaceholder"
                            [(ngModel)]="currentFilters().minPrice"
                            (ngModelChange)="onFiltersChange()"
                            min="0"
                        />
                        <input
                            id="max-price-input"
                            type="number"
                            class="input input-bordered input-sm"
                            [placeholder]="maxPricePlaceholder"
                            [(ngModel)]="currentFilters().maxPrice"
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
                            [placeholder]="minAgePlaceholder"
                            [(ngModel)]="currentFilters().ageMinWeeks"
                            (ngModelChange)="onFiltersChange()"
                            min="0"
                        />
                        <input
                            id="max-age-input"
                            type="number"
                            class="input input-bordered input-sm"
                            [placeholder]="maxAgePlaceholder"
                            [(ngModel)]="currentFilters().ageMaxWeeks"
                            (ngModelChange)="onFiltersChange()"
                            min="0"
                        />
                    </div>
                </div>

                <!-- Caractéristiques spéciales -->
                <div class="form-control">
                    <span class="label">
                        <span class="label-text" i18n="@@puppy.filters.features">
                            Caractéristiques
                        </span>
                    </span>
                    <div class="flex flex-wrap gap-2">
                        @for (feature of availableFeatures; track feature) {
                            <label class="label flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    class="checkbox checkbox-sm"
                                    [checked]="isFeatureSelected(feature)"
                                    (change)="toggleFeature(feature)"
                                />
                                <span class="label-text text-sm">{{ feature }}</span>
                            </label>
                        }
                    </div>
                </div>
            </div>

            <!-- Résumé des filtres actifs -->
            @if (activeFiltersCount() > 0) {
                <div class="border-base-200 mt-4 border-t pt-4">
                    <div class="text-base-content/70 mb-2 text-sm">
                        <span i18n="@@puppy.filters.active">Filtres actifs</span>
                        ({{ activeFiltersCount() }})
                    </div>
                    <div class="flex flex-wrap gap-1">
                        @if (currentFilters().gender) {
                            <span class="badge badge-primary badge-sm">
                                {{ currentFilters().gender }}
                                <button class="ml-1" (click)="removeFilter('gender')" type="button">
                                    ×
                                </button>
                            </span>
                        }
                        @if (currentFilters().color) {
                            <span class="badge badge-primary badge-sm">
                                {{ currentFilters().color }}
                                <button class="ml-1" (click)="removeFilter('color')" type="button">
                                    ×
                                </button>
                            </span>
                        }
                        @if (currentFilters().status) {
                            <span class="badge badge-primary badge-sm">
                                {{ currentFilters().status }}
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
    @Input() availableColors: string[] = ['Fauve', 'Bringé', 'Crème', 'Pied'];
    @Input() availableFeatures: string[] = ['LOF', 'Yeux bleus', 'Petite taille', 'Pelage rare'];

    @Output() filtersChange = new EventEmitter<PuppyFilters>();
    @Output() searchChange = new EventEmitter<string>();

    currentFilters = signal<PuppyFilters>({});
    searchQuery = signal<string>('');

    // Variables pour les placeholders
    searchPlaceholder = $localize`:@@puppy.filters.search.placeholder:Nom, couleur, caractéristiques...`;
    minPricePlaceholder = $localize`:@@puppy.filters.price.min:Min`;
    maxPricePlaceholder = $localize`:@@puppy.filters.price.max:Max`;
    minAgePlaceholder = $localize`:@@puppy.filters.age.min:Min`;
    maxAgePlaceholder = $localize`:@@puppy.filters.age.max:Max`;

    hasActiveFilters = computed(() => {
        const filters = this.currentFilters();
        const search = this.searchQuery();
        return (
            Object.keys(filters).some(
                (key) =>
                    filters[key as keyof PuppyFilters] !== undefined &&
                    filters[key as keyof PuppyFilters] !== ''
            ) || search.length > 0
        );
    });

    activeFiltersCount = computed(() => {
        const filters = this.currentFilters();
        return Object.keys(filters).filter((key) => {
            const value = filters[key as keyof PuppyFilters];
            return (
                value !== undefined &&
                value !== '' &&
                (Array.isArray(value) ? value.length > 0 : true)
            );
        }).length;
    });

    onFiltersChange() {
        this.filtersChange.emit(this.currentFilters());
    }

    onSearchChange(query: string) {
        this.searchQuery.set(query);
        this.searchChange.emit(query);
    }

    toggleFeature(feature: string) {
        const current = this.currentFilters();
        const features = current.features || [];
        const index = features.indexOf(feature);

        if (index > -1) {
            features.splice(index, 1);
        } else {
            features.push(feature);
        }

        this.currentFilters.set({
            ...current,
            features: features.length > 0 ? features : undefined,
        });
        this.onFiltersChange();
    }

    isFeatureSelected(feature: string): boolean {
        const features = this.currentFilters().features || [];
        return features.includes(feature);
    }

    removeFilter(filterKey: keyof PuppyFilters) {
        const current = this.currentFilters();
        const updated = { ...current };
        delete updated[filterKey];
        this.currentFilters.set(updated);
        this.onFiltersChange();
    }

    clearAllFilters() {
        this.currentFilters.set({});
        this.searchQuery.set('');
        this.onFiltersChange();
        this.onSearchChange('');
    }
}
