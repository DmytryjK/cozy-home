/* eslint-disable func-names */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Loading, ErrorType, CartData } from '../../types/types';
import { RootState } from '../store';
import { API_BASE, API_SECURE } from '../../utils/API_BASE';

export type ProductsInfoToCheckout = {
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
    isButtonAddToCartClicked: boolean;
    isCartPageOpen: boolean;
    loading: Loading;
    loadingAuthCart: Loading;
    mergeCartLoading: Loading;
    updateAuthCartLoading: Loading;
    updateAuthCartError: ErrorType;
    error: ErrorType;
    isCheckoutUpdatedOnFirstRender: boolean;
};

const initialState: CartInitialState = {
    cartBody: [],
    cartData: [],
    productsInfoToCheckout: [],
    cartTotal: null,
    isDeletedItemButtonActive: false,
    isButtonAddToCartClicked: false,
    isCartPageOpen: false,
    loading: 'idle',
    loadingAuthCart: 'idle',
    mergeCartLoading: 'idle',
    updateAuthCartLoading: 'idle',
    updateAuthCartError: null,
    error: null,
    isCheckoutUpdatedOnFirstRender: false,
};

let controller: any;

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

            const result = await response.json();
            if (!response.ok) throw new Error('something went wrong');

            return result;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return thunkAPI.rejectWithValue('');
            }
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const fetchCartDataForAuthUser = createAsyncThunk(
    'cart/fetchCartDataForAuthUser',
    async function (_, thunkAPI) {
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
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const mergeCartOnAuth = createAsyncThunk(
    'cart/mergeCartOnAuth',
    async function (localCheckoutData: ProductsInfoToCheckout[], thunkAPI) {
        const state = thunkAPI.getState() as RootState;
        // const { productsInfoToCheckout } = state.cart;
        const { jwtToken } = state.auth;

        const cartDataForServer = localCheckoutData.map((item) => {
            const { skuCode, colorHex, quantityToCheckout } = item;
            return {
                skuCode,
                colorHex,
                quantity: quantityToCheckout,
            };
        });

        if (!jwtToken) {
            throw new Error('Для цього запиту потрібно бути авторизованим');
        }

        try {
            const response = await fetch(`${API_SECURE}basket`, {
                method: 'POST',
                body: JSON.stringify(cartDataForServer),
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (!response.ok) throw new Error('something went wrong');

            // const response2 = await fetch(`${API_SECURE}basket`, {
            //     method: 'GET',
            //     headers: {
            //         Authorization: `Bearer ${jwtToken}`,
            //         'Content-type': 'application/json; charset=UTF-8',
            //     },
            // });
            // if (!response2.ok) throw new Error('something went wrong');

            const result = await response.json();
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return '';
        }
    }
);

export const updateCartInfoForAuthUser = createAsyncThunk(
    'cart/updateCartInfoForAuthUser',
    async function ({ customData }: { customData?: any }, thunkAPI) {
        const state = thunkAPI.getState() as RootState;
        const { jwtToken } = state.auth;
        const { productsInfoToCheckout } = state.cart;

        const cartDataForServer = productsInfoToCheckout.map((item) => {
            const { skuCode, colorHex, quantityToCheckout } = item;
            return {
                skuCode,
                colorHex,
                quantity: quantityToCheckout,
            };
        });
        if (!jwtToken) {
            throw new Error('Для цього запиту потрібно бути авторизованим');
        }

        async function request() {
            try {
                const response = await fetch(`${API_SECURE}basket/replace`, {
                    method: 'POST',
                    body: JSON.stringify(customData || cartDataForServer),
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                if (!response.ok) throw new Error('something went wrong');
                return true;
            } catch (error: any) {
                if (error.name === 'AbortError') {
                    return thunkAPI.rejectWithValue('');
                }
                if (error instanceof Error) {
                    return thunkAPI.rejectWithValue(error.message);
                }
                return '';
            }
        }
        const result = await request();
        return null;
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
            state.isButtonAddToCartClicked = true;
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
        resetIsButtonAddToCartClicked(state) {
            state.isButtonAddToCartClicked = false;
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
            state.loading = 'idle';
        },
        setStatusRemoveCartItemBtn(state, action: PayloadAction<boolean>) {
            state.isDeletedItemButtonActive = action.payload;
        },
        addProductsInfoToCheckout(
            state,
            action: PayloadAction<ProductsInfoToCheckout[] | []>
        ) {
            state.productsInfoToCheckout = action.payload;
            state.isCheckoutUpdatedOnFirstRender = true;
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
            state.isCheckoutUpdatedOnFirstRender = true;
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
        resetMergeCartLoading(state) {
            state.mergeCartLoading = 'idle';
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
                const sortedData: CartData[] = JSON.parse(
                    JSON.stringify(
                        action.payload.sort((a, b) => {
                            if (
                                a.availableProductQuantity <
                                    b.availableProductQuantity &&
                                a.availableProductQuantity === 0
                            ) {
                                return 1;
                            }
                            return -1;
                        })
                    )
                );
                state.cartData = sortedData;
            }
        );
        builder.addCase(
            fetchProductCartInfo.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
        builder.addCase(fetchCartDataForAuthUser.pending, (state) => {
            state.loadingAuthCart = 'pending';
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchCartDataForAuthUser.fulfilled,
            (state, action: PayloadAction<CartData[]>) => {
                state.loadingAuthCart = 'succeeded';
                state.loading = 'succeeded';
                const sortedData: CartData[] = JSON.parse(
                    JSON.stringify(
                        action.payload.sort((a, b) => {
                            if (
                                a.availableProductQuantity <
                                    b.availableProductQuantity &&
                                a.availableProductQuantity === 0
                            ) {
                                return 1;
                            }
                            return -1;
                        })
                    )
                );
                state.cartData = sortedData.map((item) => {
                    const { productName } = item;
                    return {
                        ...item,
                        name: productName || '',
                    };
                });

                state.cartBody = action.payload.map((item) => {
                    return {
                        productSkuCode: item.skuCode,
                        colorHex: item.colorHex,
                    };
                });
            }
        );
        builder.addCase(
            fetchCartDataForAuthUser.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingAuthCart = 'failed';
                state.loading = 'failed';
                state.error = action.payload;
            }
        );

        builder.addCase(updateCartInfoForAuthUser.pending, (state) => {
            state.updateAuthCartLoading = 'pending';
            state.updateAuthCartError = null;
        });
        builder.addCase(updateCartInfoForAuthUser.fulfilled, (state) => {
            state.updateAuthCartLoading = 'succeeded';
        });
        builder.addCase(
            updateCartInfoForAuthUser.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.updateAuthCartLoading = 'failed';
                state.updateAuthCartError = action.payload;
            }
        );

        builder.addCase(mergeCartOnAuth.pending, (state) => {
            state.mergeCartLoading = 'pending';
            state.error = null;
        });
        builder.addCase(mergeCartOnAuth.fulfilled, (state) => {
            state.mergeCartLoading = 'succeeded';
        });
        builder.addCase(
            mergeCartOnAuth.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.mergeCartLoading = 'failed';
                state.error = action.payload;
            }
        );
    },
});

export const {
    addProductToCartBody,
    resetIsButtonAddToCartClicked,
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
