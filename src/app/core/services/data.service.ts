import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PuppiesResponse, Puppy } from '@/core/models/puppy.model';
import { map, catchError, startWith, delay } from 'rxjs/operators';
// import { Breeder } from '@/core/models/breeder.model';
import { Testimonial } from '@/core/models/testimonial.model';

export interface LoadingState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

@Injectable({
    providedIn: 'root',
})
export class DataService {
    private http = inject(HttpClient);
    private locale = inject(LOCALE_ID);

    private getLocalizedPath(basePath: string): string {
        // Utilisation du chemin absolu depuis la racine des assets
        return `assets/data/${this.locale}/${basePath}.json`;
    }

    getPuppies(): Observable<LoadingState<Puppy[]>> {
        return this.http.get<PuppiesResponse>(this.getLocalizedPath('puppies')).pipe(
            delay(2000), // Ajout d'un délai de 2 secondes
            map((response) => ({ data: [], loading: false, error: null })),
            catchError((error) => of({ data: null, loading: false, error: error.message })),
            startWith({ data: null, loading: true, error: null })
        );
    }

    getBreeders(): Observable<any> {
        return this.http.get<any>(this.getLocalizedPath('breeders'));
    }

    getTestimonials(): Observable<any> {
        return this.http.get<any>(this.getLocalizedPath('testimonials'));
    }
}
