import { configureStore } from '@reduxjs/toolkit';
import homepageCategoriesReducer from './reducers/homepageCategoriesSlice';
import popularItemsReducer from './reducers/popularItemsSlice';
import productsSliderReducer from './reducers/productsSliderSlice';
import catalogFiltersReducer from './reducers/catalogFilterSlice';
import productCardReducer from './reducers/productCardSlice';
import catalogProductsReducer from './reducers/catalogProductsSlice';
import categoriesReducer from './reducers/categoriesSlice';
import productInformationReducer from './reducers/productInformationSlice';
import modalsReducer from './reducers/modalsSlice';

export const store = configureStore({
    reducer: {
        homepageCategories: homepageCategoriesReducer,
        popularItems: popularItemsReducer,
        productsSlider: productsSliderReducer,
        catalogFilters: catalogFiltersReducer,
        productCard: productCardReducer,
        catalogProducts: catalogProductsReducer,
        categories: categoriesReducer,
        productInformation: productInformationReducer,
        modals: modalsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
