import { configureStore } from '@reduxjs/toolkit';
import popularItemsReducer from './reducers/popularItemsSlice';
import newItemsReducer from './reducers/newItemsSlice';

export const store = configureStore({
    reducer: {
        popularItems: popularItemsReducer,
        newItems: newItemsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
