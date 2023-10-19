import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FormikState } from 'formik';
import { API_SECURE, API_BASE } from '../../utils/API_BASE';
import { Loading, ErrorType } from '../../types/types';

type AuthData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthday?: string;
    roles: string[];
};

type JwtPayload = {
    token: string;
    isUserRemember: boolean;
};
interface AuthType {
    isPasswordRecovered: boolean;
    jwtToken: string;
    loginLoading: Loading;
    loginError: ErrorType;
    logoutLoading: Loading;
    logoutError: ErrorType;
    signinLoading: Loading;
    signinError: ErrorType;
    newPasswordLoading: Loading;
    newPasswordError: ErrorType;
    emailLinksLoading: Loading;
    emailLinksError: ErrorType;
}

const initialState: AuthType = {
    isPasswordRecovered: false,
    jwtToken: '',
    loginLoading: 'idle',
    loginError: null,
    logoutLoading: 'idle',
    logoutError: null,
    signinLoading: 'idle',
    signinError: null,
    newPasswordLoading: 'idle',
    newPasswordError: null,
    emailLinksLoading: 'idle',
    emailLinksError: null,
};

export const userLogIn = createAsyncThunk(
    'auth/userLogIn',
    async function (
        {
            email,
            password,
            resetForm,
            isUserRemember,
        }: {
            email: string;
            password: string;
            isUserRemember: boolean;
            resetForm: (
                nextState?:
                    | Partial<
                          FormikState<{
                              email: string;
                              password: string;
                              isUserRemember: boolean;
                          }>
                      >
                    | undefined
            ) => void;
        },
        { rejectWithValue }
    ) {
        try {
            const response = await fetch(`${API_BASE()}auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    username: email,
                    password,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const result: JwtPayload = {
                ...(await response.json()),
                isUserRemember,
            };

            if (response.status === 401) {
                throw new Error('Пошта або пароль не існують');
            } else if (!response.ok) {
                throw new Error('Щось пішло не так');
            }
            resetForm();
            return result;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const userLogOut = createAsyncThunk(
    'auth/userLogOut',
    async function (jwt: string, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_SECURE()}user/logout`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });

            if (!response.ok) {
                throw new Error('Щось пішло не так');
            }

            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const userSignInByEmail = createAsyncThunk(
    'auth/userSignInByEmail',
    async function (
        {
            authData,
            resetForm,
        }: {
            authData: AuthData;
            resetForm: (
                nextState?:
                    | Partial<
                          FormikState<{
                              firstName: string;
                              lastName: string;
                              birthdate: string;
                              phone: string;
                              password: string;
                              repeatedPassword: string;
                              email: string;
                          }>
                      >
                    | undefined
            ) => void;
        },
        { rejectWithValue }
    ) {
        try {
            const response = await fetch(`${API_BASE()}auth/signup`, {
                method: 'POST',
                body: JSON.stringify({ ...authData }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.status === 400) {
                throw new Error('Цей емейл вже зареєстрований');
            } else if (!response.ok) {
                throw new Error('Щось пішло не так, спробуйте ще раз');
            }
            resetForm();
            return null;
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const userActivateEmail = createAsyncThunk(
    'auth/userActivateEmail',
    async function (activationToken: string, { rejectWithValue }) {
        try {
            const response = await fetch(
                `${API_BASE()}auth/activate?activationToken=${activationToken}`
            );

            if (!response.ok) {
                throw new Error('Щось пішло не так');
            }
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

export const userForgotPasswordRequest = createAsyncThunk(
    'auth/userForgotPasswordRequest',
    async function (email: string, { rejectWithValue }) {
        try {
            const response = await fetch(`${API_BASE()}auth/login/forgot`, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (response.status === 404) {
                throw new Error('Такий емейл не зареєстрований');
            } else if (!response.ok) {
                throw new Error('Щось пішло не так');
            }

            return '';
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

export const userResetPassword = createAsyncThunk(
    'auth/userResetPassword',
    async function (
        {
            resetPasswordToken,
            password,
            resetForm,
        }: {
            resetPasswordToken: string;
            password: string;
            resetForm: (
                nextState?:
                    | Partial<
                          FormikState<{
                              email: string;
                              password: string;
                              isUserRemember: boolean;
                          }>
                      >
                    | undefined
            ) => void;
        },
        { rejectWithValue }
    ) {
        try {
            const response = await fetch(
                `${API_BASE()}auth/login/reset?resetPasswordToken=${resetPasswordToken}`,
                {
                    method: 'POST',
                    body: JSON.stringify({ password }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            );
            if (response.status === 404) {
                throw new Error(
                    'Посилання недійсне, спробуйте відправити запит ще раз'
                );
            } else if (!response.ok) {
                throw new Error('Щось пішло не так');
            }
            resetForm();
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

export const temporaryDelUser = createAsyncThunk(
    'auth/temporaryDelUser',
    async function (
        { email, jwt }: { email: string; jwt: string },
        { rejectWithValue }
    ) {
        try {
            const response = await fetch(`${API_BASE()}auth/delete-account`, {
                method: 'POST',
                body: JSON.stringify({ email }),
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (!response.ok) {
                throw new Error('Щось пішло не так');
            }
            return '';
        } catch (error: unknown) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return null;
        }
    }
);

// export const fetchUserProfileInfo = createAsyncThunk(
//     'auth/fetchUserProfileInfo',
//     async function (jwt: string, { rejectWithValue }) {
//         try {
//             const response = await fetch(`${API_SECURE()}user/profile`, {
//                 method: 'GET',
//                 headers: {
//                     Authorization: `Bearer ${jwt}`,
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Щось пішло не так');
//             }
//             const data = await response.json();
//             console.log(data);
//             return '';
//         } catch (error: unknown) {
//             if (error instanceof Error) {
//                 console.log(error.message);
//                 return rejectWithValue(error.message);
//             }
//             return null;
//         }
//     }
// );

export const authSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        setJwtToken: (state, action: PayloadAction<string>) => {
            state.jwtToken = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userLogIn.pending, (state) => {
            state.loginLoading = 'pending';
            state.loginError = null;
        });
        builder.addCase(
            userLogIn.fulfilled,
            (state, action: PayloadAction<JwtPayload | null>) => {
                state.loginLoading = 'succeeded';
                if (!action.payload) return;

                const { token, isUserRemember } = action.payload;
                state.jwtToken = token;

                if (isUserRemember) {
                    localStorage.setItem('token', token);
                } else {
                    sessionStorage.setItem('token', token);
                }
            }
        );
        builder.addCase(
            userLogIn.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loginLoading = 'failed';
                state.loginError = action.payload;
            }
        );

        builder.addCase(userLogOut.pending, (state) => {
            state.logoutLoading = 'pending';
            state.logoutError = null;
        });
        builder.addCase(userLogOut.fulfilled, (state) => {
            state.logoutLoading = 'succeeded';
            sessionStorage.setItem('token', '');
            localStorage.setItem('token', '');
            state.jwtToken = '';
        });
        builder.addCase(
            userLogOut.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.loginLoading = 'failed';
                state.logoutError = action.payload;
            }
        );

        builder.addCase(userSignInByEmail.pending, (state) => {
            state.emailLinksLoading = 'pending';
            state.emailLinksError = null;
        });
        builder.addCase(userSignInByEmail.fulfilled, (state) => {
            state.emailLinksLoading = 'succeeded';
        });
        builder.addCase(
            userSignInByEmail.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.emailLinksLoading = 'failed';
                state.emailLinksError = action.payload;
            }
        );

        builder.addCase(userActivateEmail.pending, (state) => {
            state.signinLoading = 'pending';
            state.signinError = null;
        });
        builder.addCase(
            userActivateEmail.fulfilled,
            (state, action: PayloadAction<{ token: string }>) => {
                state.signinLoading = 'succeeded';
                state.jwtToken = action.payload.token;
                sessionStorage.setItem('token', action.payload.token);
            }
        );
        builder.addCase(
            userActivateEmail.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.signinLoading = 'failed';
                state.signinError = action.payload;
            }
        );

        builder.addCase(userForgotPasswordRequest.pending, (state) => {
            state.emailLinksLoading = 'pending';
            state.emailLinksError = null;
        });
        builder.addCase(userForgotPasswordRequest.fulfilled, (state) => {
            state.emailLinksLoading = 'succeeded';
        });
        builder.addCase(
            userForgotPasswordRequest.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.emailLinksLoading = 'failed';
                state.emailLinksError = action.payload;
            }
        );

        builder.addCase(userResetPassword.pending, (state) => {
            state.newPasswordLoading = 'pending';
            state.newPasswordError = null;
        });
        builder.addCase(
            userResetPassword.fulfilled,
            (state, action: PayloadAction<{ token: string }>) => {
                state.newPasswordLoading = 'succeeded';
                state.jwtToken = action.payload.token;
                sessionStorage.setItem('token', action.payload.token);
            }
        );
        builder.addCase(
            userResetPassword.rejected,
            (state, action: PayloadAction<unknown>) => {
                state.newPasswordLoading = 'failed';
                state.newPasswordError = action.payload;
            }
        );

        builder.addCase(temporaryDelUser.pending, (state) => {});
        builder.addCase(temporaryDelUser.fulfilled, (state) => {
            state.jwtToken = '';
            sessionStorage.setItem('token', '');
            localStorage.setItem('token', '');
        });
        builder.addCase(temporaryDelUser.rejected, (state) => {});
    },
});

export const { setJwtToken } = authSlice.actions;
export default authSlice.reducer;
