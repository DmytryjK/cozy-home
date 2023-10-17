import './RegistrationSuccess.scss';

const RegistrationSuccess = () => {
    return (
        <div className="auth-success">
            <div className="auth-success__top-wrapper">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                >
                    <path
                        d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
                        stroke="#64CB13"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M9 12.5L11 14.5L16 9.5"
                        stroke="#64CB13"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <h2 className="auth-success__title">
                    Реєстрація пройшла успішно!
                </h2>
            </div>
            <p className="auth-success__subtitle">
                Повідомлення з введеними даними відправлена Вам електронною
                поштою!
            </p>
        </div>
    );
};

export default RegistrationSuccess;
