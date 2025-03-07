import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import { ROUTE_NAMES } from '@/constants/routesConstants';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomePage from '@/pages/HomePage.vue';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/auth',
        component: () => import('@/layouts/AuthLayout.vue'),
        children: [
            {
                path: 'login',
                name: ROUTE_NAMES.LOGIN,
                component: () => import('@/pages/auth/LoginPage.vue'),
            },
            {
                path: 'register',
                name: ROUTE_NAMES.REGISTER,
                component: () => import('@/pages/auth/RegisterPage.vue'),
            },
        ],
    },
    {
        path: '/dashboard',
        component: () => import('@/layouts/DashboardLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: ROUTE_NAMES.DASHBOARD,
                component: () => import('@/pages/dashboard/DashboardPage.vue'),
            },
        ],
    },
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: ROUTE_NAMES.HOME,
                component: HomePage,
            },
            {
                path: 'about',
                name: ROUTE_NAMES.ABOUT,
                component: () => import('@/pages/AboutPage.vue'),
            },
            {
                path: 'puppies',
                name: ROUTE_NAMES.PUPPIES,
                component: () => import('@/pages/PuppiesPage.vue'),
            },
            {
                path: 'parents',
                name: ROUTE_NAMES.PARENTS,
                component: () => import('@/pages/ParentsPage.vue'),
            },
            {
                path: 'care',
                name: ROUTE_NAMES.CARE,
                component: () => import('@/pages/CarePage.vue'),
            },
            {
                path: 'reservation',
                name: ROUTE_NAMES.RESERVATION,
                component: () => import('@/pages/ReservationPage.vue'),
            },
            {
                path: 'contact',
                name: ROUTE_NAMES.CONTACT,
                component: () => import('@/pages/ContactPage.vue'),
            },
            {
                path: 'blog',
                name: ROUTE_NAMES.BLOG,
                component: () => import('@/pages/BlogPage.vue'),
            },
            {
                path: 'gallery',
                name: ROUTE_NAMES.GALLERY,
                component: () => import('@/pages/GalleryPage.vue'),
            },
        ],
    },
];

routes.push({
    path: '/:pathMatch(.*)*',
    component: DefaultLayout,
    children: [
        {
            path: '',
            name: ROUTE_NAMES.NOT_FOUND,
            component: () => import('@/pages/NotFoundPage.vue'),
        },
    ],
});

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(_to, _from, savedPosition) {
        return savedPosition || { top: 0 };
    },
    routes,
});

router.beforeEach(() => {
    NProgress.start();
});

router.afterEach(() => {
    NProgress.done();
});

export default router;
