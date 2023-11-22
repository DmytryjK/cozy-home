import successIcon from '../../../assets/icons/userMessages/success_icon.svg';
import './SuccessMessage.scss';

const SuccessMessage = ({
    text,
    additionalText,
}: {
    text: string;
    additionalText?: string;
}) => {
    return (
        <div className="success-message">
            <div className="success-message__inner">
                <img
                    className="success-message__icon"
                    src={successIcon}
                    alt=""
                />
                <p className="success-message__text">{text}</p>
            </div>
            {additionalText ? (
                <p className="success-message__text_additional">
                    {additionalText}
                </p>
            ) : (
                ''
            )}
        </div>
    );
};

export default SuccessMessage;
