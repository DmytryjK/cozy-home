import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import API_BASE from '../../utils/API_BASE';

type CurrentData = {
    id: string;
    page: string;
    size: string;
};

interface CatalogFilterState {
    catalogProducts: ProductCardType[];
    isFiltersShowed: boolean;
    currentPage: string;
    currentProductCategoryId: string;
    amountOfProducts: string;
    loading: Loading;
    error: null | unknown;
}

const initialState: CatalogFilterState = {
    catalogProducts: [],
    isFiltersShowed: false,
    currentPage: '0',
    currentProductCategoryId: '',
    amountOfProducts: '12',
    loading: 'idle',
    error: null,
};

export const fetchCatalogProductsByFilters = createAsyncThunk(
    'catalogFilter/fetchCatalogProductsByFilters',
    async function (currentData: CurrentData, { rejectWithValue }) {
        try {
            const queryParams = new URLSearchParams({ ...currentData });
            const response = await fetch(
                `${API_BASE()}product/catalog/category?${queryParams}`
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
        updateCurrentPage(state, action: PayloadAction<string>) {
            state.currentPage = action.payload;
        },
        updateCurrentProductCategory(state, action: PayloadAction<string>) {
            state.currentProductCategoryId = action.payload;
        },
        showHideFilters(state, action: PayloadAction<boolean>) {
            state.isFiltersShowed = action.payload;
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

export const {
    updateCurrentPage,
    updateCurrentProductCategory,
    showHideFilters,
} = catalogFilterSlice.actions;
export default catalogFilterSlice.reducer;
