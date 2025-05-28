import { inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Puppy } from '@/core/models/puppy.model';
import { PuppyService, PuppyFilters, PuppySortOptions } from '@/core/services/puppy.service';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { switchMap, tap } from 'rxjs/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, of } from 'rxjs';

interface PuppyState {
    puppies: LoadingState<Puppy[]>;

    filters: PuppyFilters;
    searchQuery: string;
    sortOptions: PuppySortOptions;
}

const initialState: PuppyState = {
    puppies: { data: null, loading: false, error: null },

    filters: {},
    searchQuery: '',
    sortOptions: { field: 'name', direction: 'asc' },
};

export const PuppyStore = signalStore(
    { providedIn: 'root' },

    withState(initialState),

    withComputed((state, puppyService = inject(PuppyService)) => {
        const isPuppiesLoaded = computed(() => !state.puppies().loading && !state.puppies().error);
        const activeFiltersCount = computed(() => {
            const filters = state.filters();
            const searchQuery = state.searchQuery();
            return (
                Object.values(filters).filter(
                    (value) =>
                        value !== undefined &&
                        value !== '' &&
                        (Array.isArray(value) ? value.length > 0 : true)
                ).length + (searchQuery.length > 0 ? 1 : 0)
            );
        });

        return {
            isPuppiesLoaded,
            isPuppiesLoading: computed(() => state.puppies().loading),
            hasPuppiesError: computed(() => state.puppies().error),

            // featuredPuppies: computed(() => {
            //     const puppies = state.puppies().data;
            //     if (isPuppiesLoaded() && puppies) {
            //         return puppyService.getFeaturedPuppies(puppies);
            //     }
            //     return [];
            // }),
            filteredPuppies: computed(() => {
                const puppies = state.puppies().data;
                const filters = state.filters();
                const searchQuery = state.searchQuery();
                const sortOptions = state.sortOptions();

                if (isPuppiesLoaded() && puppies) {
                    const searchedPuppies = puppyService.searchPuppies(puppies, searchQuery);
                    const filteredPuppies = puppyService.filterPuppies(searchedPuppies, filters);
                    const sortedPuppies = puppyService.sortPuppies(filteredPuppies, sortOptions);
                    return sortedPuppies;
                }
                return [];
            }),

            activeFiltersCount,
            hasActiveFilters: computed(() => activeFiltersCount() > 0),

            allPuppiesCount: computed(() => state.puppies().data?.length || 0),
            availablePuppiesCount: computed(() => {
                const puppies = state.puppies().data;
                if (isPuppiesLoaded() && puppies) {
                    const availablePuppies = puppyService.getAvailablePuppies(puppies);
                    return availablePuppies.length;
                }
                return 0;
            }),
        };
    }),

    withMethods((store, puppyService = inject(PuppyService)) => ({
        loadAllPuppies: rxMethod<void>(
            pipe(
                switchMap(() => {
                    const currentPuppies = store.puppies();
                    if (currentPuppies.data && currentPuppies.data.length > 0) {
                        return of(currentPuppies);
                    }
                    return puppyService.getAllPuppies();
                }),
                tap((result) => patchState(store, { puppies: result }))
            )
        ),

        updatePuppies: (puppies: LoadingState<Puppy[]>) => {
            patchState(store, { puppies });
        },
        updateFilters: (filters: PuppyFilters) => {
            patchState(store, { filters });
        },
        updateSearchQuery: (searchQuery: string) => {
            patchState(store, { searchQuery });
        },
        updateSortOptions: (sortOptions: PuppySortOptions) => {
            patchState(store, { sortOptions });
        },

        clearFilters: () => {
            patchState(store, {
                filters: {},
                searchQuery: '',
            });
        },
        getFeaturedPuppies: () => {
            const puppies = store.puppies().data;
            if (store.isPuppiesLoaded() && puppies) {
                return puppyService.getFeaturedPuppies(puppies);
            }
            return [];
        },
    }))
);
