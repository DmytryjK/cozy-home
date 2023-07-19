import React from 'react';
import { MainPage, CatalogPage, CategoryPage } from './pages';
import './App.scss';

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
        path: '/catalog/:name',
        element: <CatalogPage />,
    },
];

export default routes;
