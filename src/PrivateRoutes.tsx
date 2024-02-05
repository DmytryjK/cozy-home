/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { resetUserLogoutStatus } from './store/reducers/authSlice';
import { useAppDispatch, useAppSelector } from './hooks/hooks';

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
    const { jwtToken, logoutLoading } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const localJwt = localStorage.getItem('token');

    useEffect(() => {
        if (!localJwt) {
            navigate(-1);
        }
    }, []);

    useEffect(() => {
        if (logoutLoading === 'succeeded') {
            navigate('/');
            dispatch(resetUserLogoutStatus('idle'));
        }
    }, [logoutLoading]);

    return <>{jwtToken ? children : ''}</>;
};

export default PrivateRoutes;
