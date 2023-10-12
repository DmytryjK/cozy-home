import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsType {
    isPopUpNotificationOpen: boolean;
    isPopUpCartOpen: boolean;
    isPasswordForgotten: boolean;
}

const initialState: ModalsType = {
    isPopUpNotificationOpen: false,
    isPopUpCartOpen: false,
    isPasswordForgotten: false,
};

export const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openPopUpCart(state, action: PayloadAction<boolean>) {
            state.isPopUpCartOpen = action.payload;
        },
        openPopUpNotification(state, action: PayloadAction<boolean>) {
            state.isPopUpNotificationOpen = action.payload;
        },
        openPopUpForgottenPassword(state, action: PayloadAction<boolean>) {
            state.isPasswordForgotten = action.payload;
        },
    },
});
export const {
    openPopUpCart,
    openPopUpNotification,
    openPopUpForgottenPassword,
} = modalsSlice.actions;
export default modalsSlice.reducer;
