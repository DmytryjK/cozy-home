import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Loading } from '../../types/types';
import API_BASE from '../../utils/API_BASE';

type ProductParams = {
    productSkuCode: string;
    colorId: string;
    main: 'true' | 'false';
};

type ImageSrc = {
    id: string;
    imagePath: string;
    color: string;
};

interface ProductCardState {
    imageSrc: ImageSrc | null;
    loading: Loading;
    error: null | unknown;
}

const initialState: ProductCardState = {
    imageSrc: null,
    loading: 'idle',
    error: null,
};

export const fetchImageByColorId = createAsyncThunk(
    'productCard/fetchImageByColorId',
    async function (productParams: ProductParams, { rejectWithValue }) {
        try {
            const queryParams = new URLSearchParams({ ...productParams });
            const response = await fetch(
                `${API_BASE()}image/product_color?${queryParams}`
            );
            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const productCardSlice = createSlice({
    name: 'productCard',
    initialState,
    reducers: {
        updateImageState(state, action: PayloadAction<ImageSrc | null>) {
            state.imageSrc = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchImageByColorId.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchImageByColorId.fulfilled,
            (state, action: PayloadAction<ImageSrc>) => {
                state.loading = 'succeeded';
                state.imageSrc = action.payload;
            }
        );
        builder.addCase(
            fetchImageByColorId.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});
export const { updateImageState } = productCardSlice.actions;
export default productCardSlice.reducer;
