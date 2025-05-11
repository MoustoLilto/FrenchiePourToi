import { Routes } from '@angular/router';

export const PARENTS_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('@/features/parents/parents.component').then((m) => m.ParentsComponent),
    },
    {
        path: ':id',
        loadComponent: () =>
            import('@/features/parents/parent-detail/parent-detail.component').then(
                (m) => m.ParentDetailComponent
            ),
    },
];
