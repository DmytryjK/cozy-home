import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { userActivateEmail } from '../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Loader from '../../shared-components/Loader';
import {
    SuccessMessage,
    ErrorMessageSmall,
} from '../../shared-components/UserMessages/UserMessages';
import './ActivationPage.scss';

const ActivationPage = () => {
    const dispatch = useAppDispatch();
    const { search } = useLocation();
    const navigate = useNavigate();
    const activationToken = search.replace('?activationToken=', '');
    const { jwtToken, signinLoading, signinError } = useAppSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (activationToken) {
            dispatch(userActivateEmail(activationToken));
        }
    }, []);

    useEffect(() => {
        if (jwtToken) {
            navigate('/api/v1/auth/activate');
        }
    }, [jwtToken]);

    return (
        <section className="activation-page">
            <div className="container">
                <h1 className="activation-page__title">
                    Реєстрація нового користувача
                </h1>
                {signinLoading === 'pending' ? <Loader /> : ''}
                {jwtToken ? (
                    <SuccessMessage text="Реєстрація пройшла успішно!" />
                ) : (
                    ''
                )}
                {signinError ? (
                    <ErrorMessageSmall
                        text="Упс, щось пішло не так :("
                        additionalText="Спробуйте ще раз, або зверніться до адміністратора."
                    />
                ) : (
                    ''
                )}
                <NavLink className="activation-page__link" to="/catalog">
                    Повернутись в магазин
                </NavLink>
            </div>
        </section>
    );
};

export default ActivationPage;
