import { Routes } from '@angular/router';

export const ABOUT_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('@/features/about/about.component').then((m) => m.AboutComponent),
    },
];
