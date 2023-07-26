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
            const { extraEndpoint } = globalFiltersQuery;
            const cloneGlobalQuery = { ...globalFiltersQuery };
            delete cloneGlobalQuery.extraEndpoint;

            const queryParams = Object.entries(cloneGlobalQuery)
                .map(
                    ([key, value]: [key: string, value: string | string[]]) => {
                        let result;
                        if (value !== '') {
                            if (Array.isArray(value)) {
                                if (value.length > 0) {
                                    result = `${encodeURIComponent(key)}=${value
                                        .map(
                                            (item) =>
                                                `${encodeURIComponent(item)}`
                                        )
                                        .join(',')}`;
                                }
                            } else {
                                result = `${encodeURIComponent(
                                    key
                                )}=${encodeURIComponent(value)}`;
                            }
                        }
                        return result;
                    }
                )
                .filter((param) => param !== undefined)
                .join('&');

            const response = await fetch(
                `${API_BASE()}product/${extraEndpoint}${queryParams}`
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
    },
});

export default catalogProductsSlice.reducer;
