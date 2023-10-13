import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { FormikState } from 'formik';
import { API_BASE } from '../../utils/API_BASE';
import { Loading, ErrorType } from '../../types/types';

type JwtPayload = {
    token: string;
    isUserRemember: boolean;
};
interface AuthType {
    isPasswordRecovered: boolean;
    jwtToken: string;
    loginLoading: Loading;
    loginError: ErrorType;
}

const initialState: AuthType = {
    isPasswordRecovered: false,
    jwtToken: '',
    loginLoading: 'idle',
    loginError: null,
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
    'auth/userLogIn',
    async function (jwt: string, { rejectWithValue }) {
        try {
            fetch(`${API_BASE()}auth/logout`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }).then((response) => console.log(response));
            return '';
        } catch (error: unknown) {
            console.log(error);
            return rejectWithValue(error);
        }
    }
);

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
                    // sessionStorage.setItem('token', '');
                } else {
                    sessionStorage.setItem('token', token);
                    // localStorage.setItem('token', '');
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
    },
});

export const { setJwtToken } = authSlice.actions;
export default authSlice.reducer;
