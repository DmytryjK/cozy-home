import React from 'react';
import nextId from 'react-id-generator';
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
    // {
    //     path: '/',
    //     element: [
    //         <CatalogPage key={nextId('page-item')} />,
    //         <CategoryPage key={nextId('page-item')} />,
    //         <MainPage key={nextId('page-item')} />,
    //     ],
    // },
];

export default routes;
