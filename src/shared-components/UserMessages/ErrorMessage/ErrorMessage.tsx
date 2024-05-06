import { useNavigate } from 'react-router';
import './ErrorMessage.scss';

const ErrorMessage = ({ message }: { message?: string }) => {
    const navigate = useNavigate();
    return (
        <div className="error-message">
            <p className="error-message_text">
                {message || 'Упс... Щось пішло не так. Спробуйте ще раз.'}
            </p>
            <button
                className="error-message_reload-page"
                onClick={() => navigate(0)}
                type="button"
            >
                Оновити сторінку
            </button>
        </div>
    );
};

export default ErrorMessage;
