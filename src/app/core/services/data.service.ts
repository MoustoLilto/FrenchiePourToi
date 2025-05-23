import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LOCALE_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { PuppiesResponse, Puppy } from '@/core/models/puppy.model';
import { map } from 'rxjs/operators';
// import { Breeder } from '@/core/models/breeder.model';
import { Testimonial } from '@/core/models/testimonial.model';
import { withLoadingState } from '@/shared/rxjs/with-loading-state.operator';

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
        return `assets/data/${this.locale}/${basePath}.json`;
    }

    getPuppies(): Observable<LoadingState<Puppy[]>> {
        return this.http.get<PuppiesResponse>(this.getLocalizedPath('puppies')).pipe(
            // delay(2000), // Ajout d'un délai de 2 secondes
            map((response) => response.puppies),
            withLoadingState()
        );
    }

    getBreeders(): Observable<LoadingState<any>> {
        return this.http.get<any>(this.getLocalizedPath('breeders')).pipe(withLoadingState());
    }

    getTestimonials(): Observable<LoadingState<any>> {
        return this.http.get<any>(this.getLocalizedPath('testimonials')).pipe(withLoadingState());
    }
}
