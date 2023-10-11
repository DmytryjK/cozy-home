import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsType {
    isPasswordRecovered: boolean;
}

const initialState: ModalsType = {
    isPasswordRecovered: false,
};

export const authSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        recoverPassword(state, action: PayloadAction<boolean>) {
            state.isPasswordRecovered = action.payload;
        },
    },
});
export const { recoverPassword } = authSlice.actions;
export default authSlice.reducer;
