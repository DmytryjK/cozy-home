import { configureStore } from '@reduxjs/toolkit';
import popularItemsReducer from '../components/PopularItems/PopularItemsSlice';
import newItemsReducer from '../components/NewItems/NewItemsSlice';

export const store = configureStore({
    reducer: {
        popularItems: popularItemsReducer,
        newItems: newItemsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
