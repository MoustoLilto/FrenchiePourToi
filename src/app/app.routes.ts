import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from '@/layouts/default-layout/default-layout.component';
import { routes as appRoutes } from '@/core/constants/routes.constants';

export const routes: Routes = [
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: appRoutes.home.path.replace('/', ''),
                title: appRoutes.home.title,
                loadChildren: () =>
                    import('@/features/home/home.routes').then((m) => m.HOME_ROUTES),
            },
            {
                path: appRoutes.puppies.path.replace('/', ''),
                title: appRoutes.puppies.title,
                loadChildren: () =>
                    import('@/features/puppies/puppies.routes').then((m) => m.PUPPIES_ROUTES),
            },
            {
                path: appRoutes.parents.path.replace('/', ''),
                title: appRoutes.parents.title,
                loadChildren: () =>
                    import('@/features/parents/parents.routes').then((m) => m.PARENTS_ROUTES),
            },
            {
                path: appRoutes.reservation.path.replace('/', ''),
                title: appRoutes.reservation.title,
                loadChildren: () =>
                    import('@/features/reservation/reservation.routes').then(
                        (m) => m.RESERVATION_ROUTES
                    ),
            },
            {
                path: appRoutes.about.path.replace('/', ''),
                title: appRoutes.about.title,
                loadChildren: () =>
                    import('@/features/about/about.routes').then((m) => m.ABOUT_ROUTES),
            },
        ],
    },
    {
        path: appRoutes.blog.path.replace('/', ''),
        title: appRoutes.blog.title,
        loadComponent: () =>
            import('@/layouts/blog-layout/blog-layout.component').then(
                (m) => m.BlogLayoutComponent
            ),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
