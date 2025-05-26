import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { Observable, map, delay } from 'rxjs';
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
}

export type PuppySortField = 'name' | 'price' | 'birthDate' | 'status';
export type PuppySortDirection = 'asc' | 'desc';
export interface PuppySortOptions {
    field: PuppySortField;
    direction: PuppySortDirection;
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

    getPuppyById(allPuppies: Puppy[], id: string): Puppy | null {
        return allPuppies.find((puppy) => puppy.id === id) || null;
    }

    filterPuppies(allPuppies: Puppy[], filters: PuppyFilters): Puppy[] {
        return allPuppies.filter((puppy) => this.matchesFilters(puppy, filters));
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

    searchPuppies(allPuppies: Puppy[], query: string): Puppy[] {
        return allPuppies.filter((puppy) => this.matchesSearchQuery(puppy, query));
    }

    getAvailablePuppies(allPuppies: Puppy[]): Puppy[] {
        return allPuppies.filter((puppy) => puppy.status === 'available');
    }

    getFeaturedPuppies(allPuppies: Puppy[], limit = 3): Puppy[] {
        return this.getAvailablePuppies(allPuppies).slice(0, limit);
    }

    getPuppyWithParents(
        allPuppies: Puppy[],
        id: string,
        parents: Parent[]
    ): {
        puppy: Puppy | null;
        parents: { father: Parent | null; mother: Parent | null };
    } {
        const puppy = this.getPuppyById(allPuppies, id);
        if (!puppy) {
            return { puppy: null, parents: { father: null, mother: null } };
        }

        return {
            puppy,
            parents: this.getPuppyParents(puppy, parents),
        };
    }

    getPuppyParents(
        puppy: Puppy,
        parents: Parent[]
    ): {
        father: Parent | null;
        mother: Parent | null;
    } {
        const father = parents.find((p) => p.id === puppy.parents.father) || null;
        const mother = parents.find((p) => p.id === puppy.parents.mother) || null;

        return { father, mother };
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

        // if (filters.features && filters.features.length > 0) {
        //     const hasAllFeatures = filters.features.every((feature) =>
        //         puppy.features.some((puppyFeature) =>
        //             puppyFeature.toLowerCase().includes(feature.toLowerCase())
        //         )
        //     );
        //     if (!hasAllFeatures) return false;
        // }

        return true;
    }

    private matchesSearchQuery(puppy: Puppy, query: string): boolean {
        const searchTerms = query
            .toLowerCase()
            .split(' ')
            .filter((term) => term.length > 0);
        const searchableText = [puppy.name, puppy.description, puppy.color, puppy.gender]
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
