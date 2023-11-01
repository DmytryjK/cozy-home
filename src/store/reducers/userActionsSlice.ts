import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FormikState } from 'formik';
import fetchData from '../../utils/fetchData';
import { API_SECURE } from '../../utils/API_BASE';
import { RootState } from '../store';
import { Loading, ErrorType } from '../../types/types';

interface UserProfileData {
    [key: string]: string;
    firstName: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    birthday: string;
    oldPassword: string;
    newPassword: string;
    repeatedNewPassword: string;
}

interface UserActions {
    loadingContacts: Loading;
    errorContacts: ErrorType;
    userProfileData: UserProfileData | null;
}

const initialState: UserActions = {
    loadingContacts: 'idle',
    errorContacts: null,
    userProfileData: null,
};

export const getUserProfileData = createAsyncThunk(
    'userActions/getUserProfileData',
    async function (_, { rejectWithValue, getState }) {
        const states = getState() as RootState;
        const { jwtToken } = states.auth;
        try {
            if (!jwtToken)
                throw new Error('Потрібна авторизація для даного запиту');
            const response = await fetchData({
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                request: `${API_SECURE}user/profile`,
            });

            if (!response.ok) throw new Error('Щосі пішло не так :(');

            const data = await response.json();
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const updateUserProfileData = createAsyncThunk(
    'userActions/updateUserProfileData',
    async function (
        userProfileData: UserProfileData,
        { rejectWithValue, getState }
    ) {
        const states = getState() as RootState;
        const { jwtToken } = states.auth;
        try {
            if (!jwtToken)
                throw new Error('Потрібна авторизація для даного запиту');
            const response = await fetchData({
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                request: `${API_SECURE}user/profile/update`,
                body: { ...userProfileData },
            });

            if (!response.ok) throw new Error('Щосі пішло не так :(');

            const data = await response.json();
            // resetForm();
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const userActionsSlice = createSlice({
    name: 'userActions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserProfileData.pending, (state) => {
            state.loadingContacts = 'pending';
            state.errorContacts = null;
        });
        builder.addCase(
            getUserProfileData.fulfilled,
            (state, action: PayloadAction<UserProfileData>) => {
                state.loadingContacts = 'succeeded';
                state.userProfileData = action.payload;
            }
        );
        builder.addCase(
            getUserProfileData.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingContacts = 'failed';
                state.errorContacts = action.payload;
            }
        );
    },
});

export default userActionsSlice.reducer;
