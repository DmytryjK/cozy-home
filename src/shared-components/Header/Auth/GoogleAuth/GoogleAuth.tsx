import { useLocation } from 'react-router';
import googleIcon from '../../../../assets/icons/auth/google-icon.svg';

type Props = {
    additionalClass?: string;
    textBtn?: string;
    isTitleShow?: boolean;
};

const GoogleAuth = (props: Props) => {
    const { additionalClass, textBtn, isTitleShow } = props;

    const { pathname, search } = useLocation();
    return (
        <div
            className={`auth-popup__login-by-service login-by-service ${additionalClass}`}
        >
            {isTitleShow ? (
                <h3 className="login-by-service__title">
                    Увійдіть як користувач
                </h3>
            ) : (
                ''
            )}
            <a
                className="login-by-service__link"
                // href="https://accounts.google.com/o/oauth2/auth?client_id=920811235941-7mhi8ad1m5qt42bumghsdvncadnj2jkf.apps.googleusercontent.com&redirect_uri=https://teamchallange-web-git-dev-dmytryjk.vercel.app/api/v1/auth/google-login&response_type=code&scope=openid profile email"
                href="https://accounts.google.com/o/oauth2/auth?client_id=920811235941-7mhi8ad1m5qt42bumghsdvncadnj2jkf.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/v1/auth/google-login&response_type=code&scope=openid profile email"
                onClick={() => {
                    localStorage.setItem(
                        'googleAuthLocation',
                        pathname + (search || '')
                    );
                }}
                rel="noreferrer"
            >
                <img src={googleIcon} alt="увійти через гугл аккаунт" />
                {textBtn ? <p className="text-btn">{textBtn}</p> : ''}
            </a>
        </div>
    );
};
GoogleAuth.defaultProps = {
    additionalClass: '',
    textBtn: '',
    isTitleShow: true,
};
export default GoogleAuth;
