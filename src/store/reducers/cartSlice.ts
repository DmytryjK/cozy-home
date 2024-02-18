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
    updateAuthCartLoading: Loading;
    updateAuthCartError: ErrorType;
    error: ErrorType;
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
    updateAuthCartLoading: 'idle',
    updateAuthCartError: null,
    error: null,
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
    async function (_, thunkAPI) {
        const state = thunkAPI.getState() as RootState;
        const { productsInfoToCheckout } = state.cart;
        const { jwtToken } = state.auth;

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

        // let result: any = null;

        // async function secondRequest() {
        //     const response2 = await fetch(`${API_SECURE}basket`, {
        //         method: 'GET',
        //         headers: {
        //             Authorization: `Bearer ${jwtToken}`,
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     });
        //     return response2.json();
        // }

        // async function firstRequest() {
        //     const promise1 = new Promise((resolve, reject) => {
        //         fetch(`${API_SECURE}basket`, {
        //             method: 'POST',
        //             body: JSON.stringify(cartDataForServer),
        //             headers: {
        //                 Authorization: `Bearer ${jwtToken}`,
        //                 'Content-type': 'application/json; charset=UTF-8',
        //             },
        //         }).then(() =>
        //             setTimeout(async () => {
        //                 try {
        //                     const result = await secondRequest();
        //                     resolve(result); // Возвращаем результат внешнему промису
        //                 } catch (error) {
        //                     reject(error); // В случае ошибки возвращаем ошибку
        //                 }
        //             }, 0)
        //         );
        //     });
        //     return promise1;
        // }

        // result = await firstRequest();
        // return result;

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

            const response2 = await fetch(`${API_SECURE}basket`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (!response2.ok) throw new Error('something went wrong');

            const result = await response2.json();
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message);
            }
            return '';
        }
    }
);
let isRequestToCartHasBeenSent = false;
let requestCounter = 0;
export const updateCartInfoForAuthUser = createAsyncThunk(
    'cart/updateCartInfoForAuthUser',
    async function ({ customData }: { customData?: any }, thunkAPI) {
        const state = thunkAPI.getState() as RootState;
        const { jwtToken } = state.auth;
        const { productsInfoToCheckout } = state.cart;

        if (!isRequestToCartHasBeenSent && requestCounter > 1) {
            return null;
        }
        isRequestToCartHasBeenSent = false;
        requestCounter += 1;
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
                isRequestToCartHasBeenSent = true;
                console.log('cart has been updated');
                return true;
            } catch (error: any) {
                isRequestToCartHasBeenSent = true;
                if (error.name === 'AbortError') {
                    console.log('cart hasn`t been updated, canceled');
                    return thunkAPI.rejectWithValue('');
                }
                if (error instanceof Error) {
                    console.log(
                        'cart hasn`t been updated, something went wrong'
                    );
                    return thunkAPI.rejectWithValue(error.message);
                }
                return '';
            }
        }
        const result = await request();

        // cartUpdatePromise = new Promise((resolve, reject) => {
        //     fetch(`${API_SECURE}basket/replace`, {
        //         method: 'POST',
        //         body: JSON.stringify(customData || cartDataForServer),
        //         headers: {
        //             Authorization: `Bearer ${jwtToken}`,
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     })
        //         .then((result) => {
        //             resolve(result);
        //             console.log('cart has been updated');
        //         })
        //         .catch((error) => {
        //             reject(error);
        //             if (error.name === 'AbortError') {
        //                 console.log('cart hasn`t been updated, canceled');
        //                 return thunkAPI.rejectWithValue('');
        //             }
        //             if (error instanceof Error) {
        //                 console.log(
        //                     'cart hasn`t been updated, something went wrong'
        //                 );
        //                 return thunkAPI.rejectWithValue(error.message);
        //             }
        //             return '';
        //         });
        // });

        return null;

        // try {
        //     const response = await fetch(`${API_SECURE}basket/replace`, {
        //         method: 'POST',
        //         body: JSON.stringify(customData || cartDataForServer),
        //         headers: {
        //             Authorization: `Bearer ${jwtToken}`,
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     });
        //     if (!response.ok) throw new Error('something went wrong');
        //     isUpdateCartResolved = true;
        //     console.log('cart has been updated');
        //     return null;
        // } catch (error: any) {
        //     if (error.name === 'AbortError') {
        //         console.log('cart hasn`t been updated, canceled');
        //         return thunkAPI.rejectWithValue('');
        //     }
        //     if (error instanceof Error) {
        //         console.log('cart hasn`t been updated, something went wrong');
        //         return thunkAPI.rejectWithValue(error.message);
        //     }
        //     return '';
        // }
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
        builder.addCase(fetchCartDataForAuthUser.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            fetchCartDataForAuthUser.fulfilled,
            (state, action: PayloadAction<CartData[]>) => {
                state.loading = 'succeeded';
                state.cartData = action.payload.map((item, index) => {
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
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(
            mergeCartOnAuth.fulfilled,
            (state, action: PayloadAction<CartData[]>) => {
                state.loading = 'succeeded';
                state.cartData = action.payload.map((item, index) => {
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
            mergeCartOnAuth.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
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
