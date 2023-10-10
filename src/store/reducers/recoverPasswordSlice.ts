import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsType {
    isPasswordRecovered: boolean;
}

const initialState: ModalsType = {
    isPasswordRecovered: false,
};

export const recoverPasswordSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        recoverPassword(state, action: PayloadAction<boolean>) {
            state.isPasswordRecovered = action.payload;
        },
    },
});
export const { recoverPassword } = recoverPasswordSlice.actions;
export default recoverPasswordSlice.reducer;
