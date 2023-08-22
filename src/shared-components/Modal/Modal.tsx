import './Modal.scss';

type Props = {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: any;
    maxwidth?: string;
};

const Modal = ({ active, setActive, children, maxwidth }: Props) => {
    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onMouseDown={() => {
                setActive(false);
            }}
        >
            <div
                className="modal__content"
                style={{ maxWidth: maxwidth }}
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
                <button
                    className="modal__content_close-btn"
                    type="button"
                    aria-label="закрити вікно"
                    onClick={() => setActive(false)}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.569963 0.0952841C0.70035 -0.0317614 0.911749 -0.0317614 1.04214 0.0952841L11.9021 10.6769C12.0325 10.804 12.0325 11.01 11.9021 11.137L11.4299 11.5971C11.2996 11.7241 11.0882 11.7241 10.9578 11.5971L0.0977901 1.01543C-0.0325968 0.888383 -0.0325966 0.682402 0.0977903 0.555357L0.569963 0.0952841Z"
                            fill="#A3A3A3"
                        />
                        <path
                            d="M0.0978911 11.4446C-0.0324958 11.3176 -0.0324958 11.1116 0.0978911 10.9846L10.9579 0.402905C11.0883 0.27586 11.2997 0.27586 11.43 0.402905L11.9022 0.862977C12.0326 0.990023 12.0326 1.196 11.9022 1.32305L1.04224 11.9047C0.911849 12.0318 0.700451 12.0318 0.570064 11.9047L0.0978911 11.4446Z"
                            fill="#A3A3A3"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

Modal.defaultProps = {
    maxwidth: '400px',
};

export default Modal;