import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
    {
        path: 'parents/:id',
        renderMode: RenderMode.Server,
    },
    {
        path: 'puppies/:id',
        renderMode: RenderMode.Server,
    },
    {
        path: 'reservation',
        renderMode: RenderMode.Server,
    },
    {
        path: '**',
        renderMode: RenderMode.Server,
    },
];
