import './Modal.scss';

type Props = {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: any;
};

const Modal = ({ active, setActive, children }: Props) => {
    return (
        <div
            className={active ? 'modal active' : 'modal'}
            onClick={() => setActive(false)}
        >
            <div
                className="modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
