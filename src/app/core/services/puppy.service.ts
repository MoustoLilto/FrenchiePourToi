import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { Observable, map, combineLatest, delay } from 'rxjs';
import { Puppy, PuppiesResponse } from '@/core/models/puppy.model';
import { Parent } from '@/core/models/parent.model';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { withLoadingState } from '@/shared/rxjs/with-loading-state.operator';

export interface PuppyFilters {
    gender?: string;
    color?: string;
    minPrice?: number;
    maxPrice?: number;
    ageMinWeeks?: number;
    ageMaxWeeks?: number;
    status?: string;
    features?: string[];
}

export interface PuppySortOptions {
    field: 'name' | 'price' | 'birthDate' | 'status';
    direction: 'asc' | 'desc';
}

@Injectable({
    providedIn: 'root',
})
export class PuppyService {
    private http = inject(HttpClient);
    private locale = inject(LOCALE_ID);

    private getLocalizedPath(basePath: string): string {
        return `assets/data/${this.locale}/${basePath}.json`;
    }

    getAllPuppies(): Observable<LoadingState<Puppy[]>> {
        // return this.http.get<PuppiesResponse>('/toto').pipe(
        //     map((response) => response.puppies),
        //     withLoadingState()
        // );
        return this.http.get<PuppiesResponse>(this.getLocalizedPath('puppies')).pipe(
            delay(1000),
            map((response) => response.puppies),
            withLoadingState()
        );
    }

    getPuppyById(id: string): Observable<LoadingState<Puppy | null>> {
        return this.getAllPuppies().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.find((puppy) => puppy.id === id) || null,
            }))
        );
    }

    filterPuppies(filters: PuppyFilters): Observable<LoadingState<Puppy[]>> {
        return this.getAllPuppies().pipe(
            map((loadingState) => ({
                ...loadingState,
                data:
                    loadingState.data?.filter((puppy) => this.matchesFilters(puppy, filters)) || [],
            }))
        );
    }

    sortPuppies(puppies: Puppy[], sortOptions: PuppySortOptions): Puppy[] {
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
    }

    searchPuppies(query: string): Observable<LoadingState<Puppy[]>> {
        return this.getAllPuppies().pipe(
            map((loadingState) => ({
                ...loadingState,
                data:
                    loadingState.data?.filter((puppy) => this.matchesSearchQuery(puppy, query)) ||
                    [],
            }))
        );
    }

    getAvailablePuppies(): Observable<LoadingState<Puppy[]>> {
        return this.filterPuppies({ status: 'available' });
    }

    getFeaturedPuppies(limit = 3): Observable<LoadingState<Puppy[]>> {
        return this.getAvailablePuppies().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.slice(0, limit) || [],
            }))
        );
    }

    getPuppyWithParents(id: string): Observable<
        LoadingState<{
            puppy: Puppy | null;
            parents: { father: Parent | null; mother: Parent | null };
        }>
    > {
        return combineLatest([
            this.getPuppyById(id),
            this.http.get<{ parents: Parent[] }>(this.getLocalizedPath('parents')),
        ]).pipe(
            map(([puppyState, parentsResponse]) => {
                if (!puppyState.data) {
                    return {
                        data: null,
                        loading: false,
                        error: 'Puppy not found',
                    };
                }

                const father =
                    parentsResponse.parents.find((p) => p.id === puppyState.data!.parents.father) ||
                    null;
                const mother =
                    parentsResponse.parents.find((p) => p.id === puppyState.data!.parents.mother) ||
                    null;

                return {
                    data: {
                        puppy: puppyState.data,
                        parents: { father, mother },
                    },
                    loading: false,
                    error: null,
                };
            })
        );
    }

    private matchesFilters(puppy: Puppy, filters: PuppyFilters): boolean {
        if (filters.gender && puppy.gender !== filters.gender) return false;
        if (filters.color && puppy.color !== filters.color) return false;
        if (filters.status && puppy.status !== filters.status) return false;

        if (filters.minPrice && puppy.price < filters.minPrice) return false;
        if (filters.maxPrice && puppy.price > filters.maxPrice) return false;

        if (filters.ageMinWeeks || filters.ageMaxWeeks) {
            const ageWeeks = this.calculateAgeInWeeks(puppy.birthDate);
            if (filters.ageMinWeeks && ageWeeks < filters.ageMinWeeks) return false;
            if (filters.ageMaxWeeks && ageWeeks > filters.ageMaxWeeks) return false;
        }

        if (filters.features && filters.features.length > 0) {
            const hasAllFeatures = filters.features.every((feature) =>
                puppy.features.some((puppyFeature) =>
                    puppyFeature.toLowerCase().includes(feature.toLowerCase())
                )
            );
            if (!hasAllFeatures) return false;
        }

        return true;
    }

    private matchesSearchQuery(puppy: Puppy, query: string): boolean {
        const searchTerms = query
            .toLowerCase()
            .split(' ')
            .filter((term) => term.length > 0);
        const searchableText = [
            puppy.name,
            puppy.description,
            puppy.color,
            puppy.gender,
            ...puppy.features,
        ]
            .join(' ')
            .toLowerCase();

        return searchTerms.every((term) => searchableText.includes(term));
    }

    private calculateAgeInWeeks(birthDate: string): number {
        const birth = new Date(birthDate);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - birth.getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7));
    }
}
