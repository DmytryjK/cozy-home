import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import { GlobalFiltersQuery } from '../../types/catalogFiltersTypes';
import { RootState } from '../store';
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
    async function (_, { rejectWithValue, getState }) {
        try {
            const state = getState() as RootState;
            const filtersQuery = state.catalogFilters.globalFiltersQuery;
            const temporaryParams = Object.entries(filtersQuery).filter(
                (param) => {
                    if (Array.isArray(param[1]) && param[1].length <= 0) {
                        return false;
                    }
                    if (typeof param[1] === 'string' && param[1].trim() === '')
                        return false;
                    return true;
                }
            );

            const filtersQueryFiltered: GlobalFiltersQuery = {};
            temporaryParams.forEach((item) => {
                const key = item[0];
                const value = item[1];
                filtersQueryFiltered[key] = value;
            });
            console.log(filtersQueryFiltered);
            const response = await fetch(
                `${API_BASE()}product/filter?page=0&size=12`,
                {
                    method: 'POST',
                    body: JSON.stringify({ ...filtersQueryFiltered }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
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
                `${API_BASE()}product/catalog/category?parentId=${id}`
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
                `${API_BASE()}product/catalog/category?subCategoryId=${id}`
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
