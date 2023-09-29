import './ErrorMessageValidation.scss';

const ErrorMessageValidation = ({ message }: { message: string }) => {
    return <div className="form-error">{message}</div>;
};

export default ErrorMessageValidation;
