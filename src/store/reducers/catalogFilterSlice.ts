import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import { GlobalFiltersQuery } from '../../types/catalogFiltersTypes';
import API_BASE from '../../utils/API_BASE';

interface CatalogFilterState {
    catalogProducts: ProductCardType[];
    globalFiltersQuery: GlobalFiltersQuery;
    loading: Loading;
    error: null | unknown;
}

const initialState: CatalogFilterState = {
    catalogProducts: [],
    globalFiltersQuery: {
        id: '',
        page: '0',
        size: '12',
    },
    loading: 'idle',
    error: null,
};

export const fetchCatalogProductsByFilters = createAsyncThunk(
    'catalogFilter/fetchCatalogProductsByFilters',
    async function (
        globalFiltersQuery: GlobalFiltersQuery,
        { rejectWithValue }
    ) {
        try {
            const { extraEndpoint } = globalFiltersQuery;
            const cloneGlobalQuery = { ...globalFiltersQuery };

            delete cloneGlobalQuery.extraEndpoint;
            const queryParams = new URLSearchParams({ ...cloneGlobalQuery });
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

export const catalogFilterSlice = createSlice({
    name: 'catalogFilter',
    initialState,
    reducers: {
        updateGlobalFiltersQuery(
            state,
            action: PayloadAction<GlobalFiltersQuery>
        ) {
            state.globalFiltersQuery = {
                ...state.globalFiltersQuery,
                ...action.payload,
            };
        },
    },
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

export const { updateGlobalFiltersQuery } = catalogFilterSlice.actions;
export default catalogFilterSlice.reducer;
