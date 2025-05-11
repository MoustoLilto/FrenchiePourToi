import { Routes } from '@angular/router';

export const RESERVATION_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('@/features/reservation/reservation.component').then(
                (m) => m.ReservationComponent
            ),
    },
];
