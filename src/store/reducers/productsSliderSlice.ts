import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import API_BASE from '../../utils/API_BASE';

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
    'productsSlider/fetchNewItemsAllProducts',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                `${API_BASE()}product/homepage/status?status=0&countOfProducts=20`
            );
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const fetchMightBeInterestProducts = createAsyncThunk(
    'productsSlider/fetchMightBeInterestProducts',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                `${API_BASE()}product/homepage/status?status=0&countOfProducts=20`
            );
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const productsSliderSlice = createSlice({
    name: 'productsSlider',
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
        builder.addCase(fetchMightBeInterestProducts.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchMightBeInterestProducts.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loading = 'succeeded';
                state.products = action.payload;
            }
        );
        builder.addCase(
            fetchMightBeInterestProducts.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});

export default productsSliderSlice.reducer;
