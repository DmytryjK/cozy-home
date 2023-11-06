import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductCardType, Loading } from '../../types/types';
import { RootState } from '../store';
import filterInvalidBodyParams from '../../helpers/filterInvalidBodyParams';
import { API_BASE } from '../../utils/API_BASE';
import fetchData from '../../utils/fetchData';

const PRODUCTS_SIZE = 6;
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

let controller: any;

export const fetchCatalogProductsByFilters = createAsyncThunk(
    'catalogProducts/fetchCatalogProductsByFilters',
    async function (
        {
            page = null,
            isFiltersActive = false,
        }: { page?: number | null; isFiltersActive?: boolean },
        thunkAPI
    ) {
        if (controller) {
            controller.abort();
        }
        controller = new AbortController();

        try {
            const state = thunkAPI.getState() as RootState;
            const { filtersBody, filtersSort, currentPage, localFiltersState } =
                state.catalogFilters;
            const activeSortParams = filtersSort
                ? `&fieldName=${filtersSort.fieldName}&direction=${filtersSort.direction}`
                : '';

            const response = await fetchData({
                method: 'POST',
                request: `${API_BASE}product/filter?page=${
                    page !== null ? page : currentPage
                }&size=${PRODUCTS_SIZE}${activeSortParams}`,
                body: {
                    ...filterInvalidBodyParams(
                        isFiltersActive ? localFiltersState : filtersBody
                    ),
                },
                signal: controller.signal,
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

export const fetchCatalogProductsByCategories = createAsyncThunk(
    'catalogProducts/fetchCatalogProductsByCategories',
    async function (id: string, thunkAPI) {
        if (controller) {
            controller.abort();
        }
        controller = new AbortController();

        try {
            const response = await fetchData({
                method: 'GET',
                request: `${API_BASE}product/catalog/category?categoryId=${id}&size=${PRODUCTS_SIZE}`,
                signal: controller.signal,
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
    },
});

export default catalogProductsSlice.reducer;
