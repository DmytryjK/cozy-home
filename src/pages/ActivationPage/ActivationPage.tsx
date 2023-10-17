import { useEffect } from 'react';
import { useLocation, useNavigate, redirect } from 'react-router';
import { NavLink } from 'react-router-dom';
import { userActivateEmail } from '../../store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Loader from '../../shared-components/Loader';
import ErrorMessage from '../../shared-components/ErrorMessage';
import RegistrationSuccess from './RegistrationSuccess/RegistrationSuccess';
import RegistrationFailed from './RegistrationFailed/RegistrationFailed';
import './ActivationPage.scss';

const ActivationPage = () => {
    const dispatch = useAppDispatch();
    const { search, pathname } = useLocation();
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
                {jwtToken ? <RegistrationSuccess /> : ''}
                {signinError ? <RegistrationFailed /> : ''}
                <NavLink className="activation-page__link" to="/catalog">
                    Повернутись в магазин
                </NavLink>
            </div>
        </section>
    );
};

export default ActivationPage;
