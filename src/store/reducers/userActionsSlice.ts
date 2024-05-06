import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from '../../utils/fetchData';
import { API_SECURE } from '../../utils/API_BASE';
import { RootState } from '../store';
import type {
    Loading,
    ErrorType,
    ProductCardType,
    NavigationCategory,
} from '../../types/types';

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

export interface UserFavoritesType {
    products: ProductCardType[];
    countOfProducts: number;
    countOfPages: number;
}

interface UserActions {
    loadingUserPersonalInfo: Loading;
    errorUserPersonalInfo: ErrorType;
    updatePasswordStatus: Loading;
    errorUpdatePassword: ErrorType;
    userProfileData: UserProfileContacts | null;
    userFavorites: UserFavoritesType | null;
    userFavoritsCategories: NavigationCategory[];
    loadingUserFavorites: Loading;
    loadingUserFavoritesCategories: Loading;
    errorUserFavorites: ErrorType;
    errorUserFavoritesCategories: ErrorType;
    loadingAddToFavorite: Loading;
    errorAddToFavorite: ErrorType;
}

const initialState: UserActions = {
    loadingUserPersonalInfo: 'idle',
    errorUserPersonalInfo: null,
    updatePasswordStatus: 'idle',
    errorUpdatePassword: null,
    userProfileData: null,
    userFavorites: null,
    userFavoritsCategories: [],
    loadingUserFavorites: 'idle',
    loadingUserFavoritesCategories: 'idle',
    errorUserFavorites: null,
    errorUserFavoritesCategories: null,
    loadingAddToFavorite: 'idle',
    errorAddToFavorite: null,
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

            if (!response.ok) throw new Error('Щось пішло не так :(');

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

            if (!response.ok) throw new Error('Щось пішло не так :(');

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
            if (!response.ok) throw new Error('Щось пішло не так :(');
            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

let controller1: any;
let controller2: any;

export const getUserFavorites = createAsyncThunk(
    'userActions/getUserFavorites',
    async function (
        { page, size }: { page: number; size: number },
        { rejectWithValue, getState }
    ) {
        if (controller1) {
            controller1.abort();
        }
        controller1 = new AbortController();
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
                signal: controller1.signal,
            });

            if (!response.ok) throw new Error('Щось пішло не так :(');

            const data = await response.json();
            return data;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return rejectWithValue('');
            }
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const getUserFavoritCategories = createAsyncThunk(
    'userActions/getUserFavoritCategories',
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
                request: `${API_SECURE}user/favorites/categories`,
            });

            if (!response.ok) throw new Error('Щось пішло не так :(');

            const data = await response.json();
            return data;
        } catch (error: any) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const getUserFavoritByCategory = createAsyncThunk(
    'userActions/getUserFavoritCAtegories',
    async function (
        { id, size, page = 0 }: { id: string; size: number; page?: number },
        { rejectWithValue, getState }
    ) {
        if (controller2) {
            controller2.abort();
        }
        controller2 = new AbortController();
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
                request: `${API_SECURE}user/favorites/category-id?categoryId=${id}&page=${page}&size=${size}`,
                signal: controller2.signal,
            });

            if (!response.ok) throw new Error('Щось пішло не так :(');

            const data = await response.json();
            return data;
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return rejectWithValue('');
            }
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const toggleFavoriteProduct = createAsyncThunk(
    'userActions/toggleFavoriteProduct',
    async function (productSkuCode: string, { rejectWithValue, getState }) {
        const states = getState() as RootState;
        const { jwtToken } = states.auth;
        try {
            if (!jwtToken) {
                throw new Error('Потрібна авторизація для даного запиту');
            }

            const response = await fetchData({
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                request: `${API_SECURE}user/favorites?productSkuCode=${productSkuCode}`,
            });

            if (!response.ok) throw new Error('Щось пішло не так :(');

            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
                return rejectWithValue(error.message);
            }
            return rejectWithValue(error);
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
        resetFavoriteStatus: (state) => {
            state.errorAddToFavorite = null;
            state.loadingAddToFavorite = 'idle';
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
            (state, action: PayloadAction<UserFavoritesType>) => {
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
        builder.addCase(toggleFavoriteProduct.pending, (state) => {
            state.loadingAddToFavorite = 'pending';
            state.errorAddToFavorite = null;
        });
        builder.addCase(toggleFavoriteProduct.fulfilled, (state) => {
            state.loadingAddToFavorite = 'succeeded';
        });
        builder.addCase(
            toggleFavoriteProduct.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingAddToFavorite = 'failed';
                state.errorAddToFavorite = action.payload;
            }
        );

        builder.addCase(getUserFavoritCategories.pending, (state) => {
            state.loadingUserFavoritesCategories = 'pending';
            state.errorUserFavoritesCategories = null;
        });
        builder.addCase(
            getUserFavoritCategories.fulfilled,
            (state, action: PayloadAction<NavigationCategory[]>) => {
                state.loadingUserFavoritesCategories = 'succeeded';
                state.userFavoritsCategories = action.payload;
            }
        );
        builder.addCase(
            getUserFavoritCategories.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingUserFavoritesCategories = 'failed';
                state.errorUserFavoritesCategories = action.payload;
            }
        );

        builder.addCase(getUserFavoritByCategory.pending, (state) => {
            state.loadingUserFavorites = 'pending';
            state.errorUserFavorites = null;
        });
        builder.addCase(
            getUserFavoritByCategory.fulfilled,
            (state, action: PayloadAction<UserFavoritesType>) => {
                state.loadingUserFavorites = 'succeeded';
                state.userFavorites = action.payload;
            }
        );
        builder.addCase(
            getUserFavoritByCategory.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loadingUserFavorites = 'failed';
                state.errorUserFavorites = action.payload;
            }
        );
    },
});
export const {
    resetUpdatePasswordStatus,
    resetUserProfileDataStatus,
    resetFavoriteStatus,
} = userActionsSlice.actions;
export default userActionsSlice.reducer;
