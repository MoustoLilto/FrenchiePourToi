import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';

export interface LoadingState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function withLoadingState<T>() {
    return (source$: Observable<T>): Observable<LoadingState<T>> =>
        source$.pipe(
            map((data) => ({ data, loading: false, error: null })),
            catchError((error) => of({ data: null, loading: false, error: error.message })),
            startWith({ data: null, loading: true, error: null })
        );
}
