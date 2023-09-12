import './SubmitButton.scss';

type Props = {
    title: string;
    onClick?: () => void;
};

const SubmitButton = ({ title, onClick }: Props) => {
    return (
        <button
            className="submit-button"
            type="button"
            onClick={() => {
                if (onClick) {
                    onClick();
                }
            }}
        >
            {title}
        </button>
    );
};

export default SubmitButton;
