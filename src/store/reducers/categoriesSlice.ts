import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, ErrorType } from '../../types/types';
import API_BASE from '../../utils/API_BASE';

type CategoryType = {
    id: string;
    name: string;
    categoryImagePath: string;
    categoryDtos: { id: string; name: string }[];
};

type CategoryInitialState = {
    data: CategoryType[];
    loading: Loading;
    error: ErrorType;
};

const initialState: CategoryInitialState = {
    data: [],
    loading: 'idle',
    error: null,
};

export const fetchCategoriesWithSubcategories = createAsyncThunk(
    'categories/fetchCategoriesWithSubcategories',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_BASE()}category/categories`);
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategoriesWithSubcategories.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchCategoriesWithSubcategories.fulfilled,
            (state, action: PayloadAction<CategoryType[]>) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            }
        );
        builder.addCase(
            fetchCategoriesWithSubcategories.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});
export default categoriesSlice.reducer;
