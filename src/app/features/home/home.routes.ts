import { Routes } from '@angular/router';

export const HOME_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('@/features/home/home.component').then((m) => m.HomeComponent),
    },
];
