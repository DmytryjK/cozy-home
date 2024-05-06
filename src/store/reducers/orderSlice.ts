import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import type {
    Loading,
    ErrorType,
    OrderData,
    OrderDataOrderItems,
    OrderDataOrderDelivery,
} from '../../types/types';
import { RootState } from '../store';
import { API_BASE } from '../../utils/API_BASE';

type PostalResponse = {
    data: OrderData | Record<string, never>;
    loading: Loading;
    error: ErrorType;
    isFormSubmitted: boolean;
    orderNumber: number | null;
};

type ClientInfo = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
};

const initialState: PostalResponse = {
    data: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        delivery: {},
        orderItems: [],
    },
    isFormSubmitted: false,
    loading: 'idle',
    error: null,
    orderNumber: null,
};

export const makeOrder = createAsyncThunk(
    'order/makeOrder',
    async function (_, thunkAPI) {
        try {
            const state = thunkAPI.getState() as RootState;
            const response = await fetch(`${API_BASE}order`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(state.order.data),
            });

            if (!response.ok) throw new Error('something went wrong');

            const result = await response.json();

            return result;
        } catch (error: unknown) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderData(state, action: PayloadAction<OrderData>) {
            state.data = action.payload;
        },
        setClientContacts(state, action: PayloadAction<ClientInfo>) {
            state.data = { ...state.data, ...action.payload };
        },
        setDeliveryInfo(state, action: PayloadAction<OrderDataOrderDelivery>) {
            state.data = {
                ...state.data,
                delivery: { ...state.data.delivery, ...action.payload },
            };
        },
        resetSubmittedForm(state) {
            state.isFormSubmitted = false;
        },
        resetOrderFormData(state) {
            state.loading = 'idle';
            state.error = null;
            state.data = {
                ...state.data,
                delivery: {},
                orderItems: [],
            };
            localStorage.setItem('orderData', JSON.stringify([]));
        },
        setOrderedProducts(
            state,
            action: PayloadAction<OrderDataOrderItems[]>
        ) {
            state.data = { ...state.data, orderItems: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(makeOrder.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
            state.orderNumber = null;
        });
        builder.addCase(
            makeOrder.fulfilled,
            (state, action: PayloadAction<{ orderNumber: number }>) => {
                state.loading = 'succeeded';
                state.orderNumber = action.payload.orderNumber;
            }
        );
        builder.addCase(
            makeOrder.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loading = 'failed';
                state.error = action.payload;
                state.orderNumber = null;
            }
        );
    },
});
export const {
    setOrderData,
    setClientContacts,
    setDeliveryInfo,
    setOrderedProducts,
    resetSubmittedForm,
    resetOrderFormData,
} = orderSlice.actions;
export default orderSlice.reducer;
