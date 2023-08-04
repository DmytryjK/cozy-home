import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    GlobalFiltersQuery,
    FilterOptions,
} from '../../types/catalogFiltersTypes';
import API_BASE from '../../utils/API_BASE';
import { ErrorType, Loading } from '../../types/types';
import { RootState } from '../store';

interface CatalogFilterState {
    filterOptions: FilterOptions | null;
    globalFiltersQuery: GlobalFiltersQuery;
    isFiltersActive: boolean;
    isFiltersShowed: boolean;
    loading: Loading;
    error: ErrorType;
}

const initialState: CatalogFilterState = {
    filterOptions: null,
    globalFiltersQuery: {},
    isFiltersActive: false,
    isFiltersShowed: false,
    loading: 'idle',
    error: null,
};

export const fetchFiltersOptionsByCategory = createAsyncThunk(
    'catalogFilter/fetchFiltersOptionsByCategory',
    async function (
        {
            parentCategoryId,
            size = 12,
        }: { parentCategoryId: string; size: number },
        { rejectWithValue }
    ) {
        try {
            const response = await fetch(
                `${API_BASE()}product/filter/parameters?size=${size}&page=0`,
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

export const fetchFiltersOptionsForFilteredProducts = createAsyncThunk(
    'catalogFilter/fetchFiltersOptionsForFilteredProducts',
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

            const response = await fetch(
                `${API_BASE()}product/filter/parameters?size=12&page=0`,
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
        resetFilters(state, action: PayloadAction<boolean>) {
            state.isFiltersActive = action.payload;
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
    },
});

export const { updateGlobalFiltersQuery, resetFilters, showHideFilters } =
    catalogFilterSlice.actions;
export default catalogFilterSlice.reducer;
