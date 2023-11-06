/* eslint-disable react/jsx-no-useless-fragment */
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from './hooks/hooks';

const PrivateRoutes = ({ children }: { children: ReactNode }) => {
    const { jwtToken } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!jwtToken) {
            navigate(-1);
        }
    }, []);

    return <>{jwtToken ? children : ''}</>;
};

export default PrivateRoutes;
