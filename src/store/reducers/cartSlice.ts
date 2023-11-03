import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, ErrorType, CartData } from '../../types/types';
import { API_BASE, API_SECURE } from '../../utils/API_BASE';
import { RootState } from '../store';

type ProductsInfoToCheckout = {
    productName: string;
    skuCode: string;
    colorHex: string;
    colorName: string;
    quantityToCheckout: number;
    price: number;
};

type CartBody = {
    productSkuCode: string;
    colorHex: string;
    quantity?: string;
};

type CartBodyServer = {
    skuCode: string;
    colorHex: string;
    quantity?: number;
};

type CartInitialState = {
    cartBody: CartBody[] | [];
    cartData: CartData[] | [];
    productsInfoToCheckout: ProductsInfoToCheckout[];
    cartTotal: {
        totalQuantity: number;
        totalCost: number;
        totalQuantityToCheckout: number;
    } | null;
    isDeletedItemButtonActive: boolean;
    isCartPageOpen: boolean;
    loading: Loading;
    error: ErrorType;
};

const initialState: CartInitialState = {
    cartBody: [],
    cartData: [],
    productsInfoToCheckout: [],
    cartTotal: null,
    isDeletedItemButtonActive: false,
    isCartPageOpen: false,
    loading: 'idle',
    error: null,
};

let controller: any;

export const fetchCartDataForAuthUser = createAsyncThunk(
    'cart/fetchCartDataForAuthUser',
    async function (_, thunkAPI) {
        // if (controller) {
        //     controller.abort();
        // }
        // controller = new AbortController();

        const state = thunkAPI.getState() as RootState;
        const { jwtToken } = state.auth;
        if (!jwtToken) {
            throw new Error('Для цього запиту потрібно бути авторизованим');
        }

        try {
            const response = await fetch(`${API_SECURE}basket`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) throw new Error('Упс, щось пішло не так :(');
            const result = await response.json();

            return result;
        } catch (error: any) {
            // if (error.name === 'AbortError') {
            //     return thunkAPI.rejectWithValue('');
            // }
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateCartInfoForAuthUser = createAsyncThunk(
    'cart/updateCartInfoForAuthUser',
    async function (cartBody: CartBodyServer, thunkAPI) {
        // if (controller) {
        //     controller.abort();
        // }
        // controller = new AbortController();

        const state = thunkAPI.getState() as RootState;
        const { jwtToken } = state.auth;

        if (!jwtToken) {
            throw new Error('Для цього запиту потрібно бути авторизованим');
        }

        try {
            const response = await fetch(`${API_SECURE}basket`, {
                method: 'POST',
                body: JSON.stringify(cartBody),
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) throw new Error('something went wrong');
            const result = await response.json();

            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                // if (error.name === 'AbortError') {
                //     return thunkAPI.rejectWithValue('');
                // }
                return thunkAPI.rejectWithValue(error.message);
            }
            return '';
        }
    }
);

export const resetCartDataWhenUserLogOut = createAsyncThunk(
    'cart/resetCartDataWhenUserLogOut',
    async function (cartBody: CartBody[], thunkAPI) {
        const state = thunkAPI.getState() as RootState;
        const { jwtToken } = state.auth;
        if (!jwtToken) {
            throw new Error('Для цього запиту потрібно бути авторизованим');
        }

        try {
            const response = await fetch(`${API_SECURE}basket`, {
                method: 'POST',
                body: JSON.stringify([...cartBody]),
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                signal: controller.signal,
            });

            if (!response.ok) throw new Error('something went wrong');

            const result = await response.json();
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchProductCartInfo = createAsyncThunk(
    'cart/fetchProductCartInfo',
    async function (cartBody: CartBody[], thunkAPI) {
        if (controller) {
            controller.abort();
        }
        controller = new AbortController();

        try {
            const response = await fetch(`${API_BASE}product/basket`, {
                method: 'POST',
                body: JSON.stringify([...cartBody]),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                signal: controller.signal,
            });

            if (!response.ok) throw new Error('something went wrong');
            const result = await response.json();

            return result;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return thunkAPI.rejectWithValue('');
            }
            return thunkAPI.rejectWithValue(error);
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
        addProductsInfoToCheckout(
            state,
            action: PayloadAction<ProductsInfoToCheckout[] | []>
        ) {
            state.productsInfoToCheckout = action.payload;
        },
        updateProductsInfoToCheckout(
            state,
            action: PayloadAction<ProductsInfoToCheckout>
        ) {
            const indexOfPayloadProduct =
                state.productsInfoToCheckout.findIndex(
                    (item) =>
                        item.skuCode === action.payload.skuCode &&
                        item.colorHex === action.payload.colorHex
                );
            if (indexOfPayloadProduct < 0) return;

            state.productsInfoToCheckout = state.productsInfoToCheckout.map(
                (item, index) =>
                    index === indexOfPayloadProduct ? action.payload : item
            );
        },
        updateCartTotal(
            state,
            action: PayloadAction<{
                totalQuantity: number;
                totalCost: number;
                totalQuantityToCheckout: number;
            }>
        ) {
            state.cartTotal = action.payload;
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
    addProductsInfoToCheckout,
    updateProductsInfoToCheckout,
    updateCartTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
