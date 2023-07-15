import { configureStore } from '@reduxjs/toolkit';
import popularItemsReducer from './popularItemsSlice';
import newItemsReducer from './newItemsSlice';

export const store = configureStore({
    reducer: {
        popularItems: popularItemsReducer,
        newItems: newItemsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
