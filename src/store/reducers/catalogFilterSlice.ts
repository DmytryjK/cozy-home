import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatalogFilterParametersType } from '../../types/types';
import { GlobalFiltersQuery } from '../../types/catalogFiltersTypes';

interface CatalogFilterState {
    catalogFilterParametersDto: CatalogFilterParametersType | null;
    globalFiltersQuery: GlobalFiltersQuery;
    isFiltersActive: boolean;
    isFiltersShowed: boolean;
}

const initialState: CatalogFilterState = {
    catalogFilterParametersDto: null,
    globalFiltersQuery: {
        page: '0',
        size: '12',
    },
    isFiltersActive: false,
    isFiltersShowed: false,
};

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
});

export const { updateGlobalFiltersQuery, resetFilters, showHideFilters } =
    catalogFilterSlice.actions;
export default catalogFilterSlice.reducer;
