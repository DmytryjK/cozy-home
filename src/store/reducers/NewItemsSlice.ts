import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';

export interface NewItemsInitialState {
    products: ProductCardType[];
    loading: Loading;
    error: null | unknown;
}

const initialState: NewItemsInitialState = {
    products: [],
    loading: 'idle',
    error: null,
};

export const fetchNewItemsAllProducts = createAsyncThunk(
    'newItems/fetchNewItemsAllProducts',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                `https://cozy-home.onrender.com/api/v1/product?status=new`
            );
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const newItemsSlice = createSlice({
    name: 'newItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNewItemsAllProducts.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchNewItemsAllProducts.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loading = 'succeeded';
                state.products = action.payload;
            }
        );
        builder.addCase(
            fetchNewItemsAllProducts.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});

export default newItemsSlice.reducer;
