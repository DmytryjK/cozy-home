import { lazy } from 'react';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage/CheckoutSuccessPage';
import PrivateRoutes from './PrivateRoutes';
// import {
//     MainPage,
//     CatalogPage,
//     CategoryPage,
//     ProductPage,
//     ShoppingCartPage,
//     CheckoutPage,
//     SignInPage,
//     ActivationPage,
//     ResetPasswordPage,
//     UserCabinet,
//     AboutUsPage,
//     GoogleAuthPage,
//     DeliveryPage,
// } from './pages';

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const ShoppingCartPage = lazy(
    () => import('./pages/ShoppingCartPage/ShoppingCartPage')
);
const CheckoutPage = lazy(() => import('./pages/CheckoutPage/CheckoutPage'));
const SignInPage = lazy(() => import('./pages/SignInPage/SignInPage'));
const ActivationPage = lazy(
    () => import('./pages/ActivationPage/ActivationPage')
);
const ResetPasswordPage = lazy(
    () => import('./pages/ResetPasswordPage/ResetPasswordPage')
);
const UserCabinet = lazy(() => import('./pages/UserCabinet/UserCabinet'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage/AboutUsPage'));
const GoogleAuthPage = lazy(
    () => import('./pages/GoogleAuthPage/GoogleAuthPage')
);
const DeliveryPage = lazy(() => import('./pages/DeliveryPage/DeliveryPage'));

const routes = [
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/catalog',
        element: <CategoryPage />,
    },
    {
        path: '/catalog/:categoryName',
        element: <CatalogPage />,
    },
    {
        path: '/catalog/:categoryName/:subCategoryName',
        element: <CatalogPage />,
    },
    {
        path: '/product/:productSku',
        element: <ProductPage />,
    },
    {
        path: '/cart',
        element: <ShoppingCartPage />,
    },
    {
        path: '/checkout',
        element: <CheckoutPage />,
    },
    {
        path: '/checkout/success',
        element: <CheckoutSuccessPage />,
    },
    {
        path: '/signin',
        element: <SignInPage />,
    },
    {
        path: '/api/v1/auth/activate',
        element: <ActivationPage />,
    },
    {
        path: '/api/v1/auth/login/reset',
        element: <ResetPasswordPage />,
    },
    {
        path: '/api/v1/auth/google-login',
        element: <GoogleAuthPage />,
    },
    {
        path: '/about',
        element: <AboutUsPage />,
    },
    {
        path: '/delivery',
        element: <DeliveryPage />,
    },
    {
        path: '/cabinet',
        element: (
            <PrivateRoutes>
                <UserCabinet />
            </PrivateRoutes>
        ),
    },
    {
        path: '/cabinet/:name',
        element: (
            <PrivateRoutes>
                <UserCabinet />
            </PrivateRoutes>
        ),
    },
];

export default routes;
