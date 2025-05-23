import { Injectable, inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Puppy } from '@/core/models/puppy.model';
import { PuppyService, PuppyFilters, PuppySortOptions } from '@/core/services/puppy.service';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { switchMap, tap } from 'rxjs/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';

interface PuppyState {
    puppies: LoadingState<Puppy[]>;
    selectedPuppy: LoadingState<Puppy | null>;
    filters: PuppyFilters;
    sortOptions: PuppySortOptions;
    searchQuery: string;
    featuredPuppies: LoadingState<Puppy[]>;
}

const initialState: PuppyState = {
    puppies: { data: null, loading: false, error: null },
    selectedPuppy: { data: null, loading: false, error: null },
    filters: {},
    sortOptions: { field: 'name', direction: 'asc' },
    searchQuery: '',
    featuredPuppies: { data: null, loading: false, error: null },
};

export const PuppyStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withMethods((store, puppyService = inject(PuppyService)) => ({
        // Actions pour charger les données
        loadAllPuppies: rxMethod<void>(
            pipe(
                switchMap(() => puppyService.getAllPuppies()),
                tap((result) => patchState(store, { puppies: result }))
            )
        ),

        loadPuppyById: rxMethod<string>(
            pipe(
                switchMap((id) => puppyService.getPuppyById(id)),
                tap((result) => patchState(store, { selectedPuppy: result }))
            )
        ),

        loadFeaturedPuppies: rxMethod<number>(
            pipe(
                switchMap((limit) => puppyService.getFeaturedPuppies(limit)),
                tap((result) => patchState(store, { featuredPuppies: result }))
            )
        ),

        searchPuppies: rxMethod<string>(
            pipe(
                tap((query) => patchState(store, { searchQuery: query })),
                switchMap((query) =>
                    query ? puppyService.searchPuppies(query) : puppyService.getAllPuppies()
                ),
                tap((result) => patchState(store, { puppies: result }))
            )
        ),

        filterPuppies: rxMethod<PuppyFilters>(
            pipe(
                tap((filters) => patchState(store, { filters })),
                switchMap((filters) => puppyService.filterPuppies(filters)),
                tap((result) => patchState(store, { puppies: result }))
            )
        ),

        // Méthodes de mise à jour d'état
        updatePuppies: (puppies: LoadingState<Puppy[]>) => {
            patchState(store, { puppies });
        },

        updateSelectedPuppy: (puppy: LoadingState<Puppy | null>) => {
            patchState(store, { selectedPuppy: puppy });
        },

        updateFeaturedPuppies: (featuredPuppies: LoadingState<Puppy[]>) => {
            patchState(store, { featuredPuppies });
        },

        updateFilters: (filters: PuppyFilters) => {
            patchState(store, { filters });
        },

        updateSortOptions: (sortOptions: PuppySortOptions) => {
            patchState(store, { sortOptions });
        },

        updateSearchQuery: (searchQuery: string) => {
            patchState(store, { searchQuery });
        },

        clearFilters: () => {
            patchState(store, {
                filters: {},
                searchQuery: '',
            });
        },

        clearSelectedPuppy: () => {
            patchState(store, {
                selectedPuppy: { data: null, loading: false, error: null },
            });
        },
    })),

    withComputed((state) => ({
        // Computed selectors
        sortedPuppies: computed(() => {
            const puppies = state.puppies().data;
            const sortOptions = state.sortOptions();

            if (!puppies) return null;

            return [...puppies].sort((a, b) => {
                let valueA: any = a[sortOptions.field];
                let valueB: any = b[sortOptions.field];

                if (sortOptions.field === 'birthDate') {
                    valueA = new Date(valueA).getTime();
                    valueB = new Date(valueB).getTime();
                }

                if (typeof valueA === 'string') {
                    valueA = valueA.toLowerCase();
                    valueB = valueB.toLowerCase();
                }

                const comparison = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
                return sortOptions.direction === 'asc' ? comparison : -comparison;
            });
        }),

        availablePuppies: computed(() => {
            const puppies = state.puppies().data;
            return puppies?.filter((puppy) => puppy.status === 'available') || null;
        }),

        puppiesLoading: computed(() => state.puppies().loading),
        puppiesError: computed(() => state.puppies().error),
        selectedPuppyLoading: computed(() => state.selectedPuppy().loading),
        selectedPuppyError: computed(() => state.selectedPuppy().error),
        featuredPuppiesLoading: computed(() => state.featuredPuppies().loading),

        hasActiveFilters: computed(() => {
            const filters = state.filters();
            const searchQuery = state.searchQuery();
            return Object.keys(filters).length > 0 || searchQuery.length > 0;
        }),

        puppiesCount: computed(() => state.puppies().data?.length || 0),
        availablePuppiesCount: computed(() => {
            const puppies = state.puppies().data;
            const availablePuppies = puppies?.filter((puppy) => puppy.status === 'available');
            return availablePuppies?.length || 0;
        }),
    }))
);
