import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FiltersBody, FilterOptions } from '../../types/catalogFiltersTypes';
import { API_BASE } from '../../utils/API_BASE';
import { ErrorType, Loading } from '../../types/types';
import filterInvalidBodyParams from '../../helpers/filterInvalidBodyParams';
import { RootState } from '../store';
import fetchData from '../../utils/fetchData';

const PRODUCTS_SIZE = 6;

type FilterSort = {
    title: string;
    fieldName: string;
    direction: string;
};
interface CatalogFilterState {
    filterOptions: FilterOptions | null;
    filterOptionsDuplicate: FilterOptions | null;
    filtersBody: FiltersBody;
    filtersSort: FilterSort | null;
    localFiltersState: FiltersBody;
    currentPage: number;
    loading: Loading;
    error: ErrorType;
    isFiltersCleared: boolean;
    isFiltersActive: boolean;
    isFiltersShowed: boolean;
}

const initialState: CatalogFilterState = {
    filterOptions: null,
    filterOptionsDuplicate: null,
    filtersBody: {},
    filtersSort: null,
    localFiltersState: {},
    currentPage: 0,
    isFiltersCleared: false,
    isFiltersActive: false,
    isFiltersShowed: false,
    loading: 'idle',
    error: null,
};

let controller: any;

export const fetchFiltersOptionsByCategory = createAsyncThunk(
    'catalogFilter/fetchFiltersOptionsByCategory',
    async function (
        {
            categoryId,
            subcategoryId = null,
        }: { categoryId: string; subcategoryId?: string | null },
        thunkAPI
    ) {
        if (controller) {
            controller.abort();
        }
        controller = new AbortController();
        const state = thunkAPI.getState() as RootState;
        const { currentPage } = state.catalogFilters;
        try {
            const response = await fetchData({
                method: 'POST',
                request: `${API_BASE}product/filter/parameters?size=${PRODUCTS_SIZE}&page=${currentPage}`,
                body: {
                    parentCategoryId: categoryId,
                    ...(subcategoryId
                        ? { subCategories: [subcategoryId] }
                        : {}),
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

export const fetchFiltersOptionsForFilteredProducts = createAsyncThunk(
    'catalogFilter/fetchFiltersOptionsForFilteredProducts',
    async function (
        { isFiltersActive = false }: { isFiltersActive?: boolean },
        thunkAPI
    ) {
        if (controller) {
            controller.abort();
        }
        controller = new AbortController();

        try {
            const state = thunkAPI.getState() as RootState;
            const { filtersBody, localFiltersState } = state.catalogFilters;

            const response = await fetchData({
                method: 'POST',
                request: `${API_BASE}product/filter/parameters?size=${PRODUCTS_SIZE}&page=0`,
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

export const catalogFilterSlice = createSlice({
    name: 'catalogFilter',
    initialState,
    reducers: {
        updateGlobalFiltersQuery(state, action: PayloadAction<FiltersBody>) {
            state.filtersBody = {
                ...state.filtersBody,
                ...action.payload,
            };
            const { parentCategoryId, subCategories } = action.payload;
            if (parentCategoryId) {
                state.localFiltersState.parentCategoryId = parentCategoryId;
            }
            if (subCategories) {
                state.localFiltersState.subCategories = [...subCategories];
            }
        },
        updateLocalFiltersState(state, action: PayloadAction<FiltersBody>) {
            state.localFiltersState = {
                ...state.localFiltersState,
                ...action.payload,
            };
            state.isFiltersCleared = false;
        },
        updateFiltersBodyWithLocalFiltersState(state) {
            state.filtersBody = {
                ...state.filtersBody,
                ...state.localFiltersState,
            };
        },
        updateFilterSortParam(state, action: PayloadAction<FilterSort | null>) {
            state.filtersSort = action.payload;
        },
        duplicateFilterOptions(state, action: PayloadAction<FilterOptions>) {
            state.filterOptionsDuplicate = action.payload;
        },
        resetFilters(state, action: PayloadAction<string>) {
            state.filtersBody = { parentCategoryId: action.payload };
            state.localFiltersState = { parentCategoryId: action.payload };
            state.isFiltersCleared = true;
        },
        showHideFilters(state, action: PayloadAction<boolean>) {
            state.isFiltersShowed = action.payload;
        },
        updateCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        updateCurrentCategory(state, action: PayloadAction<string>) {
            state.filtersBody = { parentCategoryId: action.payload };
            state.localFiltersState = { parentCategoryId: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFiltersOptionsByCategory.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchFiltersOptionsByCategory.fulfilled,
            (state, action: PayloadAction<FilterOptions>) => {
                state.loading = 'succeeded';
                state.filterOptions = action.payload;
            }
        );
        builder.addCase(
            fetchFiltersOptionsByCategory.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
        builder.addCase(
            fetchFiltersOptionsForFilteredProducts.pending,
            (state) => {
                state.loading = 'pending';
                state.error = null;
            }
        );
        builder.addCase(
            fetchFiltersOptionsForFilteredProducts.fulfilled,
            (state, action: PayloadAction<FilterOptions>) => {
                state.loading = 'succeeded';
                state.filterOptions = action.payload;
            }
        );
        builder.addCase(
            fetchFiltersOptionsForFilteredProducts.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});

export const {
    updateGlobalFiltersQuery,
    resetFilters,
    showHideFilters,
    updateFilterSortParam,
    updateCurrentPage,
    updateLocalFiltersState,
    updateFiltersBodyWithLocalFiltersState,
    updateCurrentCategory,
    duplicateFilterOptions,
} = catalogFilterSlice.actions;
export default catalogFilterSlice.reducer;
