import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Loading } from '../../types/types';
import { API_BASE } from '../../utils/API_BASE';

interface ModalsType {
    isPopUpNotificationOpen: boolean;
    isPopUpCartOpen: boolean;
}

const initialState: ModalsType = {
    isPopUpNotificationOpen: false,
    isPopUpCartOpen: false,
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
    },
});
export const { openPopUpCart, openPopUpNotification } = modalsSlice.actions;
export default modalsSlice.reducer;
