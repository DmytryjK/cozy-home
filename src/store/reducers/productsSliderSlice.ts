import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import API_BASE from '../../utils/API_BASE';

export interface NewItemsInitialState {
    newProducts: ProductCardType[];
    interestedProducts: ProductCardType[];
    loadingNew: Loading;
    loadingInterested: Loading;
    errorNew: null | unknown;
    errorInterested: null | unknown;
}

const initialState: NewItemsInitialState = {
    newProducts: [],
    loadingNew: 'idle',
    errorNew: null,
    interestedProducts: [],
    loadingInterested: 'idle',
    errorInterested: null,
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
            state.loadingNew = 'pending';
            state.errorNew = null;
        });
        builder.addCase(
            fetchNewItemsAllProducts.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loadingNew = 'succeeded';
                state.newProducts = action.payload;
            }
        );
        builder.addCase(
            fetchNewItemsAllProducts.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingNew = 'failed';
                state.errorNew = action.payload;
            }
        );
        builder.addCase(fetchMightBeInterestProducts.pending, (state) => {
            state.loadingInterested = 'pending';
            state.errorInterested = null;
        });
        builder.addCase(
            fetchMightBeInterestProducts.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loadingInterested = 'succeeded';
                state.interestedProducts = action.payload;
            }
        );
        builder.addCase(
            fetchMightBeInterestProducts.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingInterested = 'failed';
                state.errorInterested = action.payload;
            }
        );
    },
});

export default productsSliderSlice.reducer;
