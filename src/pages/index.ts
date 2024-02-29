import { lazy } from 'react';

const MainPage = lazy(() => import('./MainPage/MainPage'));
const CatalogPage = lazy(() => import('./CatalogPage/CatalogPage'));
const CategoryPage = lazy(() => import('./CategoryPage/CategoryPage'));
const ProductPage = lazy(() => import('./ProductPage/ProductPage'));
const ShoppingCartPage = lazy(
    () => import('./ShoppingCartPage/ShoppingCartPage')
);
const CheckoutPage = lazy(() => import('./CheckoutPage/CheckoutPage'));
const CheckoutSuccessPage = lazy(
    () => import('./CheckoutSuccessPage/CheckoutSuccessPage')
);
const SignInPage = lazy(() => import('./SignInPage/SignInPage'));
const ActivationPage = lazy(() => import('./ActivationPage/ActivationPage'));
const ResetPasswordPage = lazy(
    () => import('./ResetPasswordPage/ResetPasswordPage')
);
const UserCabinet = lazy(() => import('./UserCabinet/UserCabinet'));
const AboutUsPage = lazy(() => import('./AboutUsPage/AboutUsPage'));
const GoogleAuthPage = lazy(() => import('./GoogleAuthPage/GoogleAuthPage'));
const DeliveryPage = lazy(() => import('./DeliveryPage/DeliveryPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage'));

export {
    MainPage,
    CatalogPage,
    CategoryPage,
    ProductPage,
    ShoppingCartPage,
    CheckoutPage,
    SignInPage,
    ActivationPage,
    ResetPasswordPage,
    UserCabinet,
    AboutUsPage,
    GoogleAuthPage,
    DeliveryPage,
    NotFoundPage,
    CheckoutSuccessPage,
};
