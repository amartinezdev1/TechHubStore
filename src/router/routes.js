import MainLayout from '../layouts/MainLayout.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/',
                component: () => import('pages/HomePage.vue'),
            },
            {
                path: '/login',
                component: () => import('pages/LoginPage.vue'),
            },
            {
                path: '/:catchAll(.*)*',
                component: () => import('pages/ErrorNotFound.vue'),
            },
            {
                path: '/new-product',
                meta: { requiresAuth: true },
                component: () => import('pages/AdminPage.vue'),
            },
            {
                path: 'product-details',
                component: () => import('../components/ProductDetails.vue'),
            },
            {
                name: 'product-detail',
                path: 'product/:slug',
                component: () => import('../components/ProductDetails.vue'),
            },
            {
                path: 'all-products',
                meta: { requiresAuth: true },
                component: () => import('pages/AllProducts.vue'),
            }
        ],
      },
]

export default routes
