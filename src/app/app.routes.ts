import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@/layouts/default-layout/default-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('@/features/home/home.routes').then((m) => m.HOME_ROUTES),
            },
            {
                path: 'puppies',
                loadChildren: () =>
                    import('@/features/puppies/puppies.routes').then((m) => m.PUPPIES_ROUTES),
            },
            {
                path: 'parents',
                loadChildren: () =>
                    import('@/features/parents/parents.routes').then((m) => m.PARENTS_ROUTES),
            },
            {
                path: 'reservation',
                loadChildren: () =>
                    import('@/features/reservation/reservation.routes').then(
                        (m) => m.RESERVATION_ROUTES
                    ),
            },
            {
                path: 'about',
                loadChildren: () =>
                    import('@/features/about/about.routes').then((m) => m.ABOUT_ROUTES),
            },
        ],
    },
    {
        path: 'blog',
        loadComponent: () =>
            import('@/layouts/blog-layout/blog-layout.component').then(
                (m) => m.BlogLayoutComponent
            ),
    },
    // {
    //     path: '**',
    //     redirectTo: '',
    // },
];
