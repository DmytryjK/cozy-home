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
    reducers: {},
});
export default authSlice.reducer;
