import { configureStore } from '@reduxjs/toolkit';
import newItemsReducer from './reducers/newItemsSlice';
import popularItemsReducer from './reducers/popularItemsSlice';

export const store = configureStore({
    reducer: {
        popularItems: popularItemsReducer,
        newItems: newItemsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
