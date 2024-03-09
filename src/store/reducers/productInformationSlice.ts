import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FormikState } from 'formik';
import {
    Loading,
    ProductInformationType,
    ColorDtoList,
    ErrorType,
} from '../../types/types';
import { API_BASE } from '../../utils/API_BASE';
import fetchData from '../../utils/fetchData';
import { RootState } from '../store';

type ProductParamsType = {
    productSkuCode: string;
    colorHex: string;
};

export type ProductRating = {
    rating: number;
    comment: string;
    productSkuCode: string;
    userName: string;
    email: string;
};

interface ProductInformationState {
    productInfo: ProductInformationType;
    loading: Loading;
    error: ErrorType;
    loadingReview: Loading;
    errorReview: ErrorType;
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
        parentCategoryId: '',
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
    loadingReview: 'idle',
    errorReview: null,
    currentSku: null,
    currentColor: null,
};
let controller: any;
export const fetchProductInfoByScuWithColor = createAsyncThunk(
    'productInformation/fetchProductInfoByScuWithColor',
    async function (params: ProductParamsType, thunkAPI) {
        if (controller) {
            controller.abort();
        }
        controller = new AbortController();
        try {
            const states = thunkAPI.getState() as RootState;
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
                signal: controller.signal,
            });

            const result: ProductInformationType = await response.json();
            if (response.status === 422) {
                throw new Error('Товар не знайдено');
            }
            if (!response.ok) throw new Error('Помилка завантаження з серверу');
            if (!result.skuCode) {
                throw new Error('Жодного товару не знайдено');
            }
            return result;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return thunkAPI.rejectWithValue('');
            }
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addReviewForProduct = createAsyncThunk(
    'productInformation/addReviewForProduct',
    async function (
        {
            productRatingInfo,
            resetForm,
        }: {
            productRatingInfo: ProductRating;
            resetForm: (
                nextState?:
                    | Partial<
                          FormikState<{
                              firstName: string;
                              email: string;
                              comment: string;
                          }>
                      >
                    | undefined
            ) => void;
        },
        { rejectWithValue }
    ) {
        try {
            const response = await fetchData({
                method: 'POST',
                request: `${API_BASE}review/new`,
                body: {
                    ...productRatingInfo,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const result = await response.json();

            if (!response.ok) throw new Error('something went wrong');
            resetForm();
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
        resetAddReviewForProduct: (state) => {
            state.loadingReview = 'idle';
            state.errorReview = null;
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
                // state.loading = 'failed';
                console.log('rejected');
                state.error = action.payload;
            }
        );

        builder.addCase(addReviewForProduct.pending, (state) => {
            state.loadingReview = 'pending';
            state.errorReview = null;
        });
        builder.addCase(addReviewForProduct.fulfilled, (state) => {
            state.loadingReview = 'succeeded';
        });
        builder.addCase(
            addReviewForProduct.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingReview = 'failed';
                state.errorReview = action.payload;
            }
        );
    },
});
export const {
    updateProductColor,
    updateProductSku,
    updateProductImages,
    resetAddReviewForProduct,
} = productInformationSlice.actions;
export default productInformationSlice.reducer;
