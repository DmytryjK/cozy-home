import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCategory, ProductCardType, Loading } from '../../types/types';

interface PopularItemsInitialState {
    products: ProductCardType[];
    categories: ProductCategory[];
    loading: Loading;
    loadingCategory: Loading;
    error: null | unknown;
}

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
                `https://cozy-home.onrender.com/api/v1/product?status=popular`
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
            const response = await fetch(
                `https://cozy-home.onrender.com/api/v1/category`
            );
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
    async function (id: string, { rejectWithValue }) {
        try {
            const response = await fetch(
                `https://cozy-home.onrender.com/api/v1/product/category_status?status=popular&categoryId=${id}`
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
