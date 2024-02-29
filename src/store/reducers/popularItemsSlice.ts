import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import { API_BASE } from '../../utils/API_BASE';
import { ProductCategory } from '../../pages/MainPage/components/PopularItems/types';
import fetchData from '../../utils/fetchData';
import { RootState } from '../store';

interface PopularItemsInitialState {
    products: ProductCardType[];
    categories: ProductCategory[];
    loading: Loading;
    loadingCategory: Loading;
    error: null | unknown;
}

type GetProductsByCategoryType = {
    status: string;
    categoryId: string;
    countOfProducts: string;
};

const initialState: PopularItemsInitialState = {
    products: [],
    categories: [],
    loading: 'idle',
    loadingCategory: 'idle',
    error: null,
};
let controller1: any;

export const fetchPopularItemsAllProducts = createAsyncThunk(
    'popularItems/fetchPopularItemsAllProducts',
    async function (_, thunkAPI) {
        if (controller1) {
            controller1.abort();
        }
        controller1 = new AbortController();
        try {
            const states = thunkAPI.getState() as RootState;
            const { jwtToken } = states.auth;
            const response = await fetchData({
                method: 'GET',
                request: `${API_BASE}product/homepage/status?status=1&countOfProducts=8`,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    ...(jwtToken
                        ? { Authorization: `Bearer ${jwtToken}` }
                        : {}),
                },
                signal: controller1.signal,
            });
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return thunkAPI.rejectWithValue('');
            }
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchPopularItemsAllСategories = createAsyncThunk(
    'popularItems/fetchPopularItemsAllСategories',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_BASE}category`);
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const fetchPopularItemsProductsByСategories = createAsyncThunk(
    'popularItems/fetchPopularItemsProductsByСategories',
    async function (currentData: GetProductsByCategoryType, thunkAPI) {
        if (controller1) {
            controller1.abort();
        }
        controller1 = new AbortController();
        try {
            const queryParams = new URLSearchParams({ ...currentData });
            const states = thunkAPI.getState() as RootState;
            const { jwtToken } = states.auth;
            const response = await fetchData({
                method: 'GET',
                request: `${API_BASE}product/homepage/category-status?${queryParams}`,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    ...(jwtToken
                        ? { Authorization: `Bearer ${jwtToken}` }
                        : {}),
                },
                signal: controller1.signal,
            });

            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return thunkAPI.rejectWithValue('');
            }
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const popularItemsSlice = createSlice({
    name: 'popularItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPopularItemsAllProducts.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchPopularItemsAllProducts.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loading = 'succeeded';
                state.products = action.payload;
            }
        );
        builder.addCase(
            fetchPopularItemsAllProducts.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
        builder.addCase(fetchPopularItemsAllСategories.pending, (state) => {
            state.loadingCategory = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchPopularItemsAllСategories.fulfilled,
            (state, action: PayloadAction<ProductCategory[]>) => {
                state.loadingCategory = 'succeeded';
                state.categories = action.payload;
            }
        );
        builder.addCase(
            fetchPopularItemsAllСategories.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingCategory = 'failed';
                state.error = action.payload;
            }
        );
        builder.addCase(
            fetchPopularItemsProductsByСategories.pending,
            (state) => {
                state.loading = 'pending';
                state.error = null;
            }
        );
        builder.addCase(
            fetchPopularItemsProductsByСategories.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loading = 'succeeded';
                state.products = action.payload;
            }
        );
        builder.addCase(
            fetchPopularItemsProductsByСategories.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});

export default popularItemsSlice.reducer;
