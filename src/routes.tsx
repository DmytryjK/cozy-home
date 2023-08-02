import React from 'react';
import nextId from 'react-id-generator';
import { MainPage, CatalogPage, CategoryPage, ProductPage } from './pages';
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
        path: '/catalog/:categoryName',
        element: <CatalogPage />,
    },
    {
        path: '/catalog/:categoryName/:subCategoryName',
        element: <CatalogPage />,
    },
    {
        path: '/:productName',
        element: <ProductPage />,
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
