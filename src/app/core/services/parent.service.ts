import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Parent, ParentsResponse } from '@/core/models/parent.model';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { withLoadingState } from '@/shared/rxjs/with-loading-state.operator';

export interface ParentSortOptions {
    field: 'name' | 'birthDate' | 'color';
    direction: 'asc' | 'desc';
}

@Injectable({
    providedIn: 'root',
})
export class ParentService {
    private http = inject(HttpClient);
    private locale = inject(LOCALE_ID);

    private getLocalizedPath(basePath: string): string {
        return `assets/data/${this.locale}/${basePath}.json`;
    }

    getAllParents(): Observable<LoadingState<Parent[]>> {
        return this.http.get<ParentsResponse>(this.getLocalizedPath('parents')).pipe(
            map((response) => response.parents),
            withLoadingState()
        );
    }

    getParentById(allParents: Parent[], id: string): Parent | null {
        return allParents.find((parent) => parent.id === id) || null;
    }

    sortParents(parents: Parent[], sortOptions: ParentSortOptions): Parent[] {
        return [...parents].sort((a, b) => {
            let comparison = 0;
            switch (sortOptions.field) {
                case 'name':
                    comparison = a.name.localeCompare(b.name);
                    break;
                case 'birthDate':
                    comparison = new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime();
                    break;
                case 'color':
                    comparison = a.color.localeCompare(b.color);
                    break;
            }
            return sortOptions.direction === 'desc' ? -comparison : comparison;
        });
    }

    searchParents(allParents: Parent[], query: string): Parent[] {
        return allParents.filter((parent) => this.matchesSearchQuery(parent, query));
    }

    getMaleParents(allParents: Parent[]): Parent[] {
        return allParents.filter((parent) => parent.gender === 'male');
    }

    getFemaleParents(allParents: Parent[]): Parent[] {
        return allParents.filter((parent) => parent.gender === 'female');
    }

    getActiveParents(allParents: Parent[]): Parent[] {
        return allParents.filter((parent) => parent.status === 'active');
    }

    getRetiredParents(allParents: Parent[]): Parent[] {
        return allParents.filter((parent) => parent.status === 'retired');
    }

    // Méthode Observable pour compatibilité avec les composants existants
    getParentByIdObservable(id: string): Observable<LoadingState<Parent | null>> {
        return this.getAllParents().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.find((parent) => parent.id === id) || null,
            }))
        );
    }

    private matchesSearchQuery(parent: Parent, query: string): boolean {
        const searchTerms = query
            .toLowerCase()
            .split(' ')
            .filter((term) => term.length > 0);

        const searchableText = [
            parent.name,
            parent.description,
            parent.color,
            parent.pedigree.registration,
            ...parent.pedigree.lineage,
        ]
            .join(' ')
            .toLowerCase();

        return searchTerms.every((term) => searchableText.includes(term));
    }
}
