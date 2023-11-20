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
    quantity?: number;
};

type CartBodyServer = {
    skuCode: string;
    colorHex: string;
    quantity: number;
};

type ResponseCartWhenLoginUpdate = {
    colorHex: string;
    colorName: string;
    favorite: boolean;
    imagePath: string;
    price: number;
    priceWithDiscount: number | null;
    productName: string;
    quantity: number;
    quantityStatus: string;
    skuCode: string;
    availableProductQuantity?: number;
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
    async function (
        productsInfoToCheckout: ProductsInfoToCheckout[],
        thunkAPI
    ) {
        // if (controller) {
        //     controller.abort();
        // }
        // controller = new AbortController();

        const cartDataForServer = productsInfoToCheckout.map((item) => {
            const { skuCode, colorHex, quantityToCheckout } = item;
            return {
                skuCode,
                colorHex,
                quantity: quantityToCheckout,
            };
        });

        const state = thunkAPI.getState() as RootState;
        const { jwtToken } = state.auth;

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
    async function (_, thunkAPI) {
        const state = thunkAPI.getState() as RootState;
        const { jwtToken } = state.auth;
        if (!jwtToken) {
            throw new Error('Для цього запиту потрібно бути авторизованим');
        }

        try {
            const response = await fetch(`${API_SECURE}basket/replace`, {
                method: 'POST',
                body: JSON.stringify([]),
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
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
        builder.addCase(updateCartInfoForAuthUser.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            updateCartInfoForAuthUser.fulfilled,
            (state, action: PayloadAction<ResponseCartWhenLoginUpdate[]>) => {
                state.loading = 'succeeded';
                // state.cartData = action.payload.map((item) => {
                //     const {
                //         skuCode,
                //         productName,
                //         price,
                //         priceWithDiscount,
                //         colorHex,
                //         colorName,
                //         imagePath,
                //         quantity,
                //         quantityStatus,
                //     } = item;
                //     return {
                //         skuCode,
                //         name: productName,
                //         price,
                //         priceWithDiscount,
                //         imagePath,
                //         colorName,
                //         colorHex,
                //         availableProductQuantity: 10,
                //         quantityStatus,
                //     };
                // });
                state.productsInfoToCheckout = action.payload.map((item) => {
                    const {
                        productName,
                        skuCode,
                        colorHex,
                        colorName,
                        price,
                        priceWithDiscount,
                        quantity,
                    } = item;
                    return {
                        productName,
                        skuCode,
                        colorHex,
                        colorName,
                        quantityToCheckout: quantity,
                        price: priceWithDiscount || price,
                    };
                });
                localStorage.setItem(
                    'checkoutInfo',
                    JSON.stringify(state.productsInfoToCheckout)
                );
                state.cartBody = action.payload.map((item) => {
                    return {
                        productSkuCode: item.skuCode,
                        colorHex: item.colorHex,
                    };
                });
                const total = {
                    totalQuantity: 0,
                    totalCost: 0,
                    totalQuantityToCheckout: 0,
                };

                action.payload.forEach((item) => {
                    const {
                        quantity,
                        priceWithDiscount,
                        price,
                        availableProductQuantity,
                    } = item;

                    total.totalQuantity += quantity;
                    total.totalCost += priceWithDiscount || price;
                    total.totalQuantityToCheckout += availableProductQuantity
                        ? quantity
                        : 1;
                });
                state.cartTotal = total;
            }
        );
        builder.addCase(
            updateCartInfoForAuthUser.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
            }
        );
        builder.addCase(fetchCartDataForAuthUser.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchCartDataForAuthUser.fulfilled,
            (state, action: PayloadAction<ResponseCartWhenLoginUpdate[]>) => {
                state.loading = 'succeeded';
                state.cartData = action.payload.map((item) => {
                    const {
                        skuCode,
                        productName,
                        price,
                        priceWithDiscount,
                        colorHex,
                        colorName,
                        imagePath,
                        quantity,
                        quantityStatus,
                    } = item;
                    return {
                        skuCode,
                        name: productName,
                        price,
                        priceWithDiscount,
                        imagePath,
                        colorName,
                        colorHex,
                        availableProductQuantity: 10,
                        quantityStatus,
                    };
                });
            }
        );
        builder.addCase(
            fetchCartDataForAuthUser.rejected,
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
