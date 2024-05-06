import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { openPopUpCreateNewPassword } from '../../store/reducers/modalsSlice';
import './ResetPasswordPage.scss';

const ResetPasswordPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { search, key } = useLocation();
    const { newPasswordLoading } = useAppSelector((state) => state.auth);
    const isFirstPage = key === 'default';

    useEffect(() => {
        if (search) {
            dispatch(openPopUpCreateNewPassword(true));
        }
    }, [search]);

    useEffect(() => {
        if (newPasswordLoading === 'succeeded') {
            setTimeout(() => {
                if (isFirstPage) {
                    navigate(0);
                } else {
                    navigate(-1);
                }
            }, 2200);
        }
    }, [newPasswordLoading]);

    return (
        <section className="reset-password">
            <div className="container">
                <h1 className="reset-password__title">Відновлення паролю</h1>
            </div>
        </section>
    );
};

export default ResetPasswordPage;
