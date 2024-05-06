import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsType {
    isPopUpNotificationOpen: boolean;
    isPopUpCartOpen: boolean;
    isPasswordForgotten: boolean;
    isCreateNewPasswordOpen: boolean;
}

const initialState: ModalsType = {
    isPopUpNotificationOpen: false,
    isPopUpCartOpen: false,
    isPasswordForgotten: false,
    isCreateNewPasswordOpen: false,
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
        openPopUpCreateNewPassword(state, action: PayloadAction<boolean>) {
            state.isCreateNewPasswordOpen = action.payload;
        },
    },
});
export const {
    openPopUpCart,
    openPopUpNotification,
    openPopUpForgottenPassword,
    openPopUpCreateNewPassword,
} = modalsSlice.actions;
export default modalsSlice.reducer;
