import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, ErrorType } from '../../types/types';
import { API_BASE } from '../../utils/API_BASE';

type CategoryType = {
    categoryId: string;
    categoryName: string;
    imagePath: string;
    imageSize: string;
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

export const fetchSixCategoriesWithPhoto = createAsyncThunk(
    'homepageCategories/fetchSixCategoriesWithPhoto',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch(
                `${API_BASE()}category/homepage/categories`
            );
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const homepageCategoriesSlice = createSlice({
    name: 'homepageCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSixCategoriesWithPhoto.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchSixCategoriesWithPhoto.fulfilled,
            (state, action: PayloadAction<CategoryType[]>) => {
                state.loading = 'succeeded';
                state.data = action.payload;
            }
        );
        builder.addCase(
            fetchSixCategoriesWithPhoto.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});
export default homepageCategoriesSlice.reducer;
