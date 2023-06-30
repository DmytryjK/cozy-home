import './ErrorMessage.scss';

const ErrorMessage = () => {
    return (
        <div className="error-message">
            <p className="error-message_text">
                Sorry, something went wrong. Try again!
            </p>
            <a className="error-message_reload-page" href="/">
                Reload page
            </a>
        </div>
    );
};

export default ErrorMessage;
