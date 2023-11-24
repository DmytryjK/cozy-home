import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from '../../utils/fetchData';
import { API_SECURE } from '../../utils/API_BASE';
import { RootState } from '../store';
import { Loading, ErrorType, ProductCardType } from '../../types/types';

interface UserProfileContacts {
    [key: string]: string;
    firstName: string;
    email: string;
    lastName: string;
    phoneNumber: string;
    birthday: string;
}

interface UserProfilePasswords {
    [key: string]: string;
    oldPassword: string;
    newPassword: string;
    repeatedNewPassword: string;
}

// interface FavoriteProduct {
//     skuCode: string;
//     name: string;
//     shortDescription: string;
//     price: 0;
//     discount: string;
//     priceWithDiscount: 0;
//     imageDtoList: [
//         {
//             id: string;
//             imagePath: string;
//             color: string;
//         }
//     ];
//     colorDtoList: [
//         {
//             id: string;
//             name: string;
//             quantityStatus: string;
//             favorite: true;
//         }
//     ];
//     productQuantityStatus: string;
// }

// export interface UserFavoritesType {
//     favoritesProducts: ProductCardType[];
//     categories: [
//         {
//             id: string;
//             name: string;
//         }
//     ];
//     countOfPages: number;
// }

interface UserActions {
    loadingUserPersonalInfo: Loading;
    errorUserPersonalInfo: ErrorType;
    updatePasswordStatus: Loading;
    errorUpdatePassword: ErrorType;
    userProfileData: UserProfileContacts | null;
    // userFavorites: UserFavoritesType | null;
    userFavorites: ProductCardType[] | null;
    loadingUserFavorites: Loading;
    errorUserFavorites: ErrorType;
}

const initialState: UserActions = {
    loadingUserPersonalInfo: 'idle',
    errorUserPersonalInfo: null,
    updatePasswordStatus: 'idle',
    errorUpdatePassword: null,
    userProfileData: null,
    userFavorites: null,
    loadingUserFavorites: 'idle',
    errorUserFavorites: null,
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
        userProfileData: UserProfileContacts,
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
            return data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const updatetUserProfilePassword = createAsyncThunk(
    'userActions/updatetUserProfilePassword',
    async function (
        userProfileData: UserProfilePasswords,
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
                request: `${API_SECURE}user/profile/update/pass`,
                body: { ...userProfileData },
            });

            if (response.status === 401) {
                throw new Error('Схоже старий пароль введено невірно');
            }
            if (!response.ok) throw new Error('Щосі пішло не так :(');
            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const getUserFavorites = createAsyncThunk(
    'userActions/getUserFavorites',
    async function (
        { page, size }: { page: number; size: number },
        { rejectWithValue, getState }
    ) {
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
                request: `${API_SECURE}user/favorites?page=${page}&size=${size}`,
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

export const userActionsSlice = createSlice({
    name: 'userActions',
    initialState,
    reducers: {
        resetUpdatePasswordStatus: (state) => {
            state.errorUpdatePassword = null;
            state.updatePasswordStatus = 'idle';
        },
        resetUserProfileDataStatus: (state) => {
            state.errorUserPersonalInfo = null;
            state.loadingUserPersonalInfo = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfileData.pending, (state) => {
            state.loadingUserPersonalInfo = 'pending';
            state.errorUserPersonalInfo = null;
        });
        builder.addCase(
            getUserProfileData.fulfilled,
            (state, action: PayloadAction<UserProfileContacts>) => {
                state.loadingUserPersonalInfo = 'succeeded';
                state.userProfileData = action.payload;
            }
        );
        builder.addCase(
            getUserProfileData.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingUserPersonalInfo = 'failed';
                state.errorUserPersonalInfo = action.payload;
            }
        );
        builder.addCase(updateUserProfileData.pending, (state) => {
            state.loadingUserPersonalInfo = 'pending';
            state.errorUserPersonalInfo = null;
        });
        builder.addCase(
            updateUserProfileData.fulfilled,
            (state, action: PayloadAction<UserProfileContacts>) => {
                state.loadingUserPersonalInfo = 'succeeded';
                state.userProfileData = action.payload;
            }
        );
        builder.addCase(
            updateUserProfileData.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingUserPersonalInfo = 'failed';
                state.errorUserPersonalInfo = action.payload;
            }
        );
        builder.addCase(updatetUserProfilePassword.pending, (state) => {
            state.updatePasswordStatus = 'pending';
            state.errorUpdatePassword = null;
        });
        builder.addCase(
            updatetUserProfilePassword.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.updatePasswordStatus = 'succeeded';
            }
        );
        builder.addCase(
            updatetUserProfilePassword.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.updatePasswordStatus = 'failed';
                state.errorUpdatePassword = action.payload;
            }
        );
        builder.addCase(getUserFavorites.pending, (state) => {
            state.loadingUserFavorites = 'pending';
            state.errorUserFavorites = null;
        });
        builder.addCase(
            getUserFavorites.fulfilled,
            (state, action: PayloadAction<ProductCardType[]>) => {
                state.loadingUserFavorites = 'succeeded';
                state.userFavorites = action.payload;
            }
        );
        builder.addCase(
            getUserFavorites.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingUserFavorites = 'failed';
                state.errorUserFavorites = action.payload;
            }
        );
    },
});
export const { resetUpdatePasswordStatus, resetUserProfileDataStatus } =
    userActionsSlice.actions;
export default userActionsSlice.reducer;
