import './SubmitButton.scss';

type Props = {
    title: string;
    onClick?: () => void;
    className?: string;
};

const SubmitButton = ({ title, onClick, className }: Props) => {
    return (
        <button
            className={`submit-button ${className || ''}`}
            type="submit"
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
        >
            {title}
            <span className="submit-button__loading-dots">
                <span className="submit-button__loading-dot" />
                <span className="submit-button__loading-dot" />
                <span className="submit-button__loading-dot" />
            </span>
        </button>
    );
};

export default SubmitButton;
