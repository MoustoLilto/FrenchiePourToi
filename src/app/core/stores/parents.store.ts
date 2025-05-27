import { inject } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';
import { Parent } from '@/core/models/parent.model';
import { ParentService, ParentSortOptions } from '@/core/services/parent.service';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { switchMap, tap } from 'rxjs/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';

interface ParentState {
    parents: LoadingState<Parent[]>;
    sortOptions: ParentSortOptions;
    searchQuery: string;
}

const initialState: ParentState = {
    parents: { data: null, loading: false, error: null },
    sortOptions: { field: 'name', direction: 'asc' },
    searchQuery: '',
};

export const ParentStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed((state, parentService = inject(ParentService)) => {
        const isParentsLoaded = computed(() => !state.parents().loading && !state.parents().error);
        const filteredParents = computed(() => {
            const parents = state.parents().data;
            const sortOptions = state.sortOptions();
            const searchQuery = state.searchQuery();

            if (isParentsLoaded() && parents) {
                const searchedParents = parentService.searchParents(parents, searchQuery);
                const sortedParents = parentService.sortParents(searchedParents, sortOptions);
                return sortedParents;
            }
            return [];
        });
        return {
            isParentsLoaded,
            isParentsLoading: computed(() => state.parents().loading),
            hasParentsError: computed(() => state.parents().error !== null),

            filteredParents,
            maleParents: computed(() => parentService.getMaleParents(filteredParents())),

            femaleParents: computed(() => parentService.getFemaleParents(filteredParents())),

            // activeParents: computed(() => {
            //     const parents = state.parents().data;
            //     if (!parents) return [];

            //     // Appliquer la recherche si nécessaire
            //     const searchQuery = state.searchQuery().trim();
            //     const filteredParents = searchQuery
            //         ? parentService.searchParents(parents, searchQuery)
            //         : parents;

            //     const actives = parentService.getActiveParents(filteredParents);
            //     return parentService.sortParents(actives, state.sortOptions());
            // }),

            hasActiveSearch: computed(() => {
                return state.searchQuery().trim().length > 0;
            }),
        };
    }),
    withMethods((store, parentService = inject(ParentService)) => ({
        loadAllParents: rxMethod<void>(
            pipe(
                tap(() =>
                    patchState(store, { parents: { data: null, loading: true, error: null } })
                ),
                switchMap(() => parentService.getAllParents()),
                tap((loadingState) => patchState(store, { parents: loadingState }))
            )
        ),

        updateSortOptions: (sortOptions: ParentSortOptions) => {
            patchState(store, { sortOptions });
        },
        updateSearchQuery: (query: string) => {
            patchState(store, { searchQuery: query });
        },

        clearSearch: () => {
            patchState(store, { searchQuery: '' });
        },
        getParentById: (id: string) => {
            const parents = store.parents().data;
            return parents ? parentService.getParentById(parents, id) : null;
        },
    }))
);
