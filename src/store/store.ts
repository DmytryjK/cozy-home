import { configureStore } from '@reduxjs/toolkit';
import popularItemsReducer from './reducers/popularItemsSlice';
import productsSliderReducer from './reducers/productsSliderSlice';
import catalogFiltersReducer from './reducers/catalogFilterSlice';
import productCardReducer from './reducers/productCardSlice';
import catalogProductsReducer from './reducers/catalogProductsSlice';

export const store = configureStore({
    reducer: {
        popularItems: popularItemsReducer,
        productsSlider: productsSliderReducer,
        catalogFilters: catalogFiltersReducer,
        productCard: productCardReducer,
        catalogProducts: catalogProductsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
