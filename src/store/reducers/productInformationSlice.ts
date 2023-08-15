import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, ProductInformationType } from '../../types/types';
import API_BASE from '../../utils/API_BASE';

type ProductParamsType = {
    productSkuCode: string;
    colorHex: string;
};

interface ProductInformationState {
    productInfo: ProductInformationType;
    loading: Loading;
    error: null | unknown;
    currentColor: { id: string; name: string } | null;
}

const initialState: ProductInformationState = {
    productInfo: {
        categoryName: '',
        subCategoryName: '',
        skuCode: '',
        name: '',
        description: '',
        price: 0,
        discount: '',
        priceWithDiscount: null,
        colors: [],
        averageRating: 0,
        countOfReviews: 0,
        reviews: null,
        images: [],
        materials: [],
        collection: {},
        transformation: true,
        heightAdjustment: true,
        weight: 0,
        height: 0,
        width: 0,
        depth: 0,
        numberOfDoors: 0,
        numberOfDrawers: 0,
        bedLength: 0,
        bedWidth: 0,
        maxLoad: 0,
        quantityStatus: '',
    },
    loading: 'idle',
    error: null,
    currentColor: null,
};

export const fetchProductInfoByScuWithColor = createAsyncThunk(
    'productInformation/fetchProductInfoByScuWithColor',
    async function (params: ProductParamsType, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_BASE()}product/skuCode`, {
                method: 'POST',
                body: JSON.stringify({
                    ...params,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: unknown) {
            return rejectWithValue(error);
        }
    }
);

export const productInformationSlice = createSlice({
    name: 'productInformation',
    initialState,
    reducers: {
        updateCurrentProductColor: (
            state,
            action: PayloadAction<{ id: string; name: string }>
        ) => {
            state.currentColor = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductInfoByScuWithColor.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchProductInfoByScuWithColor.fulfilled,
            (state, action: PayloadAction<ProductInformationType>) => {
                state.loading = 'succeeded';
                state.productInfo = action.payload;
            }
        );
        builder.addCase(
            fetchProductInfoByScuWithColor.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});
export const { updateCurrentProductColor } = productInformationSlice.actions;
export default productInformationSlice.reducer;
