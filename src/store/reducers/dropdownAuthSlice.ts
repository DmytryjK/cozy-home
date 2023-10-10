import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalsType {
    isAuthDropdownActive: boolean;
}

const initialState: ModalsType = {
    isAuthDropdownActive: false,
};

export const dropdownAuthSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setIsAuthDropdownActive(state, action: PayloadAction<boolean>) {
            state.isAuthDropdownActive = action.payload;
        },
    },
});

export const { setIsAuthDropdownActive } = dropdownAuthSlice.actions;

export default dropdownAuthSlice.reducer;
