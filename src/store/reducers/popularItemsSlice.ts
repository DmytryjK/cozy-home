import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import API_BASE from '../../utils/API_BASE';
import { ProductCategory } from '../../pages/MainPage/components/PopularItems/types';

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

export const fetchPopularItemsAllProducts = createAsyncThunk(
    'popularItems/fetchPopularItemsAllProducts',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                `${API_BASE()}product/homepage/status?status=1&countOfProducts=8`
            );
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const fetchPopularItemsAllСategories = createAsyncThunk(
    'popularItems/fetchPopularItemsAllСategories',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_BASE()}category`);
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
    async function (
        currentData: GetProductsByCategoryType,
        { rejectWithValue }
    ) {
        try {
            const queryParams = new URLSearchParams({ ...currentData });
            const response = await fetch(
                `${API_BASE()}product/homepage/category_status?${queryParams}`
            );

            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
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
