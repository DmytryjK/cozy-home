import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { googleAuth } from '../../store/reducers/authSlice';
import {
    ErrorMessageSmall,
    SuccessMessage,
} from '../../shared-components/UserMessages/UserMessages';
import {
    mergeCartOnAuth,
    fetchCartDataForAuthUser,
} from '../../store/reducers/cartSlice';
import './GoogleAuthPage.scss';
import Loader from '../../shared-components/Loaders/components/Loader';

const GoogleAuthPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { search, key } = useLocation();

    const { loginLoading, googleAuthLoading, googleAuthError } = useAppSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (search) {
            const currentCode = search
                .replace('?code=', '')
                .substring(0, search.replace('?code=', '').indexOf('&'));
            dispatch(googleAuth(currentCode));
        }
    }, [search]);

    useEffect(() => {
        if (loginLoading === 'succeeded') {
            setTimeout(() => {
                navigate(
                    localStorage.getItem('googleAuthLocation')
                        ? `${localStorage.getItem('googleAuthLocation')}`
                        : '/'
                );
                localStorage.removeItem('googleAuthLocation');
            }, 1500);

            if (localStorage.getItem('checkoutInfo')) {
                const localCartData = JSON.parse(
                    localStorage.getItem('checkoutInfo') as string
                );
                dispatch(mergeCartOnAuth(localCartData)).then(() => {
                    dispatch(fetchCartDataForAuthUser());
                    localStorage.setItem('cartBody', JSON.stringify([]));
                    localStorage.setItem('checkoutInfo', JSON.stringify([]));
                });
            }
        }
        if (googleAuthError) {
            setTimeout(() => {
                navigate(
                    localStorage.getItem('googleAuthLocation')
                        ? `${localStorage.getItem('googleAuthLocation')}`
                        : '/'
                );
                localStorage.removeItem('googleAuthLocation');
            }, 3000);
        }
    }, [loginLoading, googleAuthError]);
    return (
        <section className="google-auth">
            <div className="container">
                <h1 className="google-auth__title">Гугл авторизація</h1>
                <div className="google-auth__notifications">
                    {loginLoading === 'succeeded' ? (
                        <SuccessMessage text="Авторизація пройшла успішно" />
                    ) : (
                        ''
                    )}
                    {googleAuthLoading === 'pending' ? <Loader /> : ''}
                    {googleAuthError ? (
                        <ErrorMessageSmall text="Помилка авторизації, спробуйте ще раз" />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </section>
    );
};

export default GoogleAuthPage;
