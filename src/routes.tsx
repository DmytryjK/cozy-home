import React from 'react';
import nextId from 'react-id-generator';
import {
    MainPage,
    CatalogPage,
    CategoryPage,
    ProductPage,
    ShoppingCartPage,
    CheckoutPage,
    SignInPage,
    ActivationPage,
} from './pages';
import './App.scss';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage/CheckoutSuccessPage';

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
        path: '/cabinet',
        element: <div>Кабінет користувача</div>,
    },
    {
        path: '/api/v1/auth/activate',
        element: <ActivationPage />,
    },
    // {
    //     path: '/',
    //     element: [
    //         <ProductPage key={nextId('page-item')} />,
    //         <CatalogPage key={nextId('page-item')} />,
    //         <CategoryPage key={nextId('page-item')} />,
    //         <MainPage key={nextId('page-item')} />,
    //     ],
    // },
];

export default routes;
