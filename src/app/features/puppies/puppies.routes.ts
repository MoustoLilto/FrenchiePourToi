import { Routes } from '@angular/router';

export const PUPPIES_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('@/features/puppies/puppies.component').then((m) => m.PuppiesComponent),
    },
    {
        path: ':id',
        loadComponent: () =>
            import('@/features/puppies/puppy-detail/puppy-detail.component').then(
                (m) => m.PuppyDetailComponent
            ),
    },
];
