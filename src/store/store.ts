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
import authReducer from './reducers/authSlice';
import cartReducer from './reducers/cartSlice';
import userActionsReducer from './reducers/userActionsSlice';
import orderReducer from './reducers/orderSlice';

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
        cart: cartReducer,
        auth: authReducer,
        userActions: userActionsReducer,
        order: orderReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
