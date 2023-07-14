import './ErrorMessage.scss';

const ErrorMessage = () => {
    return (
        <div className="error-message">
            <p className="error-message_text">
                Упс... Щось пішло не так. Спробуйте ще раз.
            </p>
            <a className="error-message_reload-page" href="/">
                Оновити сторінку
            </a>
        </div>
    );
};

export default ErrorMessage;
