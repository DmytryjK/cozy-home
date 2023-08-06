import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FiltersBody, FilterOptions } from '../../types/catalogFiltersTypes';
import API_BASE from '../../utils/API_BASE';
import { ErrorType, Loading } from '../../types/types';
import { RootState } from '../store';

type FilterSort = {
    fieldName: string;
    direction: string;
};
interface CatalogFilterState {
    filterOptions: FilterOptions | null;
    filtersBody: FiltersBody;
    filtersSort: FilterSort | null;
    isFiltersActive: boolean;
    isFiltersShowed: boolean;
    loading: Loading;
    error: ErrorType;
}

const initialState: CatalogFilterState = {
    filterOptions: null,
    filtersBody: {},
    filtersSort: null,
    isFiltersActive: false,
    isFiltersShowed: false,
    loading: 'idle',
    error: null,
};

export const fetchFiltersOptionsByCategory = createAsyncThunk(
    'catalogFilter/fetchFiltersOptionsByCategory',
    async function (parentCategoryId: string, { rejectWithValue }) {
        try {
            const response = await fetch(
                `${API_BASE()}product/filter/parameters?size=12&page=0`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        parentCategoryId,
                    }),
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

export const fetchFiltersOptionsBySubCategory = createAsyncThunk(
    'catalogFilter/fetchFiltersOptionsBySubCategory',
    async function (
        {
            parentCategoryId,
            subCategoryId,
        }: { parentCategoryId: string; subCategoryId: string },
        { rejectWithValue }
    ) {
        try {
            const response = await fetch(
                `${API_BASE()}product/filter/parameters?size=12&page=0`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        parentCategoryId,
                        subCategories: [subCategoryId],
                    }),
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

export const fetchFiltersOptionsForFilteredProducts = createAsyncThunk(
    'catalogFilter/fetchFiltersOptionsForFilteredProducts',
    async function (_, { rejectWithValue, getState }) {
        try {
            const state = getState() as RootState;
            const { filtersBody } = state.catalogFilters;
            const temporaryBody = Object.entries(filtersBody).filter(
                (param) => {
                    if (Array.isArray(param[1]) && param[1].length <= 0) {
                        return false;
                    }
                    if (typeof param[1] === 'string' && param[1].trim() === '')
                        return false;
                    return true;
                }
            );

            const filtersBodyFiltered: FiltersBody = {};
            temporaryBody.forEach((item) => {
                const key = item[0];
                const value = item[1];
                filtersBodyFiltered[key] = value;
            });

            const response = await fetch(
                `${API_BASE()}product/filter/parameters?size=12&page=0`,
                {
                    method: 'POST',
                    body: JSON.stringify({ ...filtersBodyFiltered }),
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

export const catalogFilterSlice = createSlice({
    name: 'catalogFilter',
    initialState,
    reducers: {
        updateGlobalFiltersQuery(state, action: PayloadAction<FiltersBody>) {
            state.filtersBody = {
                ...state.filtersBody,
                ...action.payload,
            };
        },
        resetGlobalFiltersQueryByCategory(
            state,
            action: PayloadAction<string>
        ) {
            state.filtersBody.parentCategoryId = action.payload;
        },
        resetFilters(state, action: PayloadAction<boolean>) {
            state.isFiltersActive = action.payload;
        },
        updateFilterSortParam(state, action: PayloadAction<FilterSort | null>) {
            state.filtersSort = action.payload;
        },
        showHideFilters(state, action: PayloadAction<boolean>) {
            state.isFiltersShowed = action.payload;
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
        builder.addCase(fetchFiltersOptionsBySubCategory.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchFiltersOptionsBySubCategory.fulfilled,
            (state, action: PayloadAction<FilterOptions>) => {
                state.loading = 'succeeded';
                state.filterOptions = action.payload;
            }
        );
        builder.addCase(
            fetchFiltersOptionsBySubCategory.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});

export const {
    updateGlobalFiltersQuery,
    resetGlobalFiltersQueryByCategory,
    resetFilters,
    showHideFilters,
    updateFilterSortParam,
} = catalogFilterSlice.actions;
export default catalogFilterSlice.reducer;
