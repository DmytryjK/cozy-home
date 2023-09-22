import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, ErrorType, CartData } from '../../types/types';
import API_BASE from '../../utils/API_BASE';

type CartBody = {
    productSkuCode: string;
    colorHex: string;
};

type CartInitialState = {
    cartBody: CartBody[] | [];
    cartData: CartData[] | [];
    isDeletedItemButtonActive: boolean;
    loading: Loading;
    error: ErrorType;
};

const initialState: CartInitialState = {
    cartBody: [],
    cartData: [],
    isDeletedItemButtonActive: false,
    loading: 'idle',
    error: null,
};

export const fetchProductCartInfo = createAsyncThunk(
    'cart/fetchProductCartInfo',
    async function (cartBody: CartBody[], { rejectWithValue }) {
        try {
            const response = await fetch(`${API_BASE()}product/basket`, {
                method: 'POST',
                body: JSON.stringify([...cartBody]),
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

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCartBody(state, action: PayloadAction<CartBody[]>) {
            state.cartBody = action.payload;
        },
        addProductToCartBody(state, action: PayloadAction<CartBody>) {
            state.cartBody = [...state.cartBody, action.payload];
        },
        removeProductFromCartBody(state, action: PayloadAction<CartBody>) {
            state.cartBody = state.cartBody.filter((item) => {
                if (
                    item.productSkuCode === action.payload.productSkuCode &&
                    item.colorHex === action.payload.colorHex
                ) {
                    return false;
                }
                return true;
            });
        },
        removeProductFromCartData(state, action: PayloadAction<CartBody>) {
            state.cartData = state.cartData.filter((item) => {
                if (
                    item.skuCode === action.payload.productSkuCode &&
                    item.colorHex === action.payload.colorHex
                ) {
                    return false;
                }
                return true;
            });
        },
        resetCartData(state) {
            state.cartData = [];
        },
        setStatusRemoveCartItemBtn(state, action: PayloadAction<boolean>) {
            state.isDeletedItemButtonActive = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductCartInfo.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchProductCartInfo.fulfilled,
            (state, action: PayloadAction<CartData[]>) => {
                state.loading = 'succeeded';
                state.cartData = action.payload;
            }
        );
        builder.addCase(
            fetchProductCartInfo.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
    },
});

export const {
    addProductToCartBody,
    removeProductFromCartBody,
    updateCartBody,
    resetCartData,
    setStatusRemoveCartItemBtn,
    removeProductFromCartData,
} = cartSlice.actions;
export default cartSlice.reducer;
