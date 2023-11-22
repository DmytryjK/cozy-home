import failedIcon from '../../../assets/icons/userMessages/failed_icon.svg';
import './ErrorMessageSmall.scss';

const ErrorMessageSmall = ({
    text,
    additionalText,
}: {
    text: string;
    additionalText?: string;
}) => {
    return (
        <div className="error-message_small">
            <div className="error-message_small-inner">
                <img className="error-message__icon" src={failedIcon} alt="" />
                <p className="error-message__text">{text}</p>
            </div>
            {additionalText ? (
                <p className="error-message__text_additional">
                    {additionalText}
                </p>
            ) : (
                ''
            )}
        </div>
    );
};

export default ErrorMessageSmall;
