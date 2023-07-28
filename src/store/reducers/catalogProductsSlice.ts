import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import { GlobalFiltersQuery } from '../../types/catalogFiltersTypes';
import API_BASE from '../../utils/API_BASE';

interface CatalogProductsState {
    catalogProducts: ProductCardType[];
    loading: Loading;
    error: null | unknown;
}

const initialState: CatalogProductsState = {
    catalogProducts: [],
    loading: 'idle',
    error: null,
};

export const fetchCatalogProductsByFilters = createAsyncThunk(
    'catalogProducts/fetchCatalogProductsByFilters',
    async function (
        globalFiltersQuery: GlobalFiltersQuery,
        { rejectWithValue }
    ) {
        try {
            const cloneGlobalQuery = { ...globalFiltersQuery };
            const queryParams = Object.entries(cloneGlobalQuery)
                .filter((param) => {
                    if (Array.isArray(param[1]) && param[1].length <= 0) {
                        return false;
                    }
                    if (typeof param[1] === 'string' && param[1].trim() === '')
                        return false;
                    return true;
                })
                .map(
                    ([key, value]: [key: string, value: string | string[]]) => {
                        let result;
                        if (Array.isArray(value)) {
                            result = `${encodeURIComponent(key)}=${value
                                .map((item) => `${encodeURIComponent(item)}`)
                                .join(',')}`;
                        } else {
                            result = `${encodeURIComponent(
                                key
                            )}=${encodeURIComponent(value)}`;
                        }
                        return result;
                    }
                )
                .join('&');
            const response = await fetch(
                `${API_BASE()}product/filter?${queryParams}`
            );
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const fetchCatalogProductsByCategories = createAsyncThunk(
    'catalogProducts/fetchCatalogProductsByCategories',
    async function (id: string, { rejectWithValue }) {
        try {
            const response = await fetch(
                `${API_BASE()}product/catalog/category?id=${id}`
            );

            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const fetchCatalogProductsBySubCategories = createAsyncThunk(
    'catalogProducts/fetchCatalogProductsBySubCategories',
    async function (id: string, { rejectWithValue }) {
        try {
            const response = await fetch(
                `${API_BASE()}product/catalog/category/category?id=${id}`
            );

            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const catalogProductsSlice = createSlice({
    name: 'catalogProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCatalogProductsByFilters.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchCatalogProductsByFilters.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loading = 'succeeded';
                state.catalogProducts = action.payload;
            }
        );
        builder.addCase(
            fetchCatalogProductsByFilters.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
        builder.addCase(fetchCatalogProductsByCategories.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchCatalogProductsByCategories.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loading = 'succeeded';
                state.catalogProducts = action.payload;
            }
        );
        builder.addCase(
            fetchCatalogProductsByCategories.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
        builder.addCase(
            fetchCatalogProductsBySubCategories.pending,
            (state) => {
                state.loading = 'pending';
                state.error = null;
            }
        );
        builder.addCase(
            fetchCatalogProductsBySubCategories.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loading = 'succeeded';
                state.catalogProducts = action.payload;
            }
        );
        builder.addCase(
            fetchCatalogProductsBySubCategories.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});

export default catalogProductsSlice.reducer;
