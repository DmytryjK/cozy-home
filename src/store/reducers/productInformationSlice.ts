import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import {
    Loading,
    ProductInformationType,
    ColorDtoList,
} from '../../types/types';
import { API_BASE } from '../../utils/API_BASE';
import fetchData from '../../utils/fetchData';
import { RootState } from '../store';

type ProductParamsType = {
    productSkuCode: string;
    colorHex: string;
};

interface ProductInformationState {
    productInfo: ProductInformationType;
    loading: Loading;
    error: null | unknown;
    currentSku: string | null;
    currentColor: {
        id: string;
        name: string;
        quantityStatus: string;
    } | null;
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
        favorite: null,
    },
    loading: 'idle',
    error: null,
    currentSku: null,
    currentColor: null,
};

export const fetchProductInfoByScuWithColor = createAsyncThunk(
    'productInformation/fetchProductInfoByScuWithColor',
    async function (params: ProductParamsType, { rejectWithValue, getState }) {
        try {
            const states = getState() as RootState;
            const { jwtToken } = states.auth;
            const response = await fetchData({
                method: 'POST',
                request: `${API_BASE}product/skuCode`,
                body: {
                    ...params,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    ...(jwtToken
                        ? { Authorization: `Bearer ${jwtToken}` }
                        : {}),
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
        updateProductColor: (state, action: PayloadAction<ColorDtoList>) => {
            state.currentColor = action.payload;
        },
        updateProductSku: (state, action: PayloadAction<string>) => {
            state.currentSku = action.payload;
        },
        updateProductImages: (state, action) => {
            state.productInfo.images = action.payload;
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
                state.productInfo.images = action.payload.images;
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
export const { updateProductColor, updateProductSku, updateProductImages } =
    productInformationSlice.actions;
export default productInformationSlice.reducer;
