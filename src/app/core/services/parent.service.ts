import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Parent, ParentsResponse } from '@/core/models/parent.model';
import { LoadingState } from '@/shared/rxjs/with-loading-state.operator';
import { withLoadingState } from '@/shared/rxjs/with-loading-state.operator';

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

    getParentById(id: string): Observable<LoadingState<Parent | null>> {
        return this.getAllParents().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.find((parent) => parent.id === id) || null,
            }))
        );
    }

    getMaleParents(): Observable<LoadingState<Parent[]>> {
        return this.getAllParents().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.filter((parent) => parent.gender === 'male') || [],
            }))
        );
    }

    getFemaleParents(): Observable<LoadingState<Parent[]>> {
        return this.getAllParents().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.filter((parent) => parent.gender === 'female') || [],
            }))
        );
    }

    getActiveParents(): Observable<LoadingState<Parent[]>> {
        return this.getAllParents().pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.filter((parent) => parent.status === 'active') || [],
            }))
        );
    }

    getParentOffspring(parentId: string): Observable<LoadingState<string[]>> {
        return this.getParentById(parentId).pipe(
            map((loadingState) => ({
                ...loadingState,
                data: loadingState.data?.offspring || [],
            }))
        );
    }

    searchParents(query: string): Observable<LoadingState<Parent[]>> {
        return this.getAllParents().pipe(
            map((loadingState) => ({
                ...loadingState,
                data:
                    loadingState.data?.filter((parent) => this.matchesSearchQuery(parent, query)) ||
                    [],
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
            ...parent.achievements.map((a) => a.title),
            ...parent.healthTests.map((h) => h.name),
        ]
            .join(' ')
            .toLowerCase();

        return searchTerms.every((term) => searchableText.includes(term));
    }
}
