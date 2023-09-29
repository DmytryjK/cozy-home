import {
    MouseEvent,
    SetStateAction,
    Dispatch,
    useEffect,
    useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';
import './CartIcon.scss';

type Props = {
    setIsPreviewCartActive: Dispatch<SetStateAction<boolean>>;
    setIsBurgerOpen: Dispatch<SetStateAction<boolean>>;
};

const CartIcon = (props: Props) => {
    const [isDesktop, setIsDesktop] = useState<boolean>(true);
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const cartTotal = useAppSelector((state) => state.cart.cartTotal);
    const { setIsPreviewCartActive, setIsBurgerOpen } = props;

    useEffect(() => {
        if (window.innerWidth <= 960) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }, []);

    const openProductCart = (e: MouseEvent) => {
        if (cartBody.length === 0) {
            e.preventDefault();
        } else {
            setIsBurgerOpen(false);
        }
    };
    return (
        <NavLink
            className="header-icons__cart cart-icon"
            to="/cart"
            aria-label="Open cart"
            onClick={openProductCart}
            onMouseEnter={() =>
                isDesktop
                    ? setIsPreviewCartActive(true)
                    : setIsPreviewCartActive(false)
            }
        >
            <svg width="21" height="21">
                <use href={`${headerSprite}#card-icon`} />
            </svg>
            <span className="header__icons_cart-counter cart-icon__counter">
                {cartBody.length > 0 ? cartTotal?.totalQuantity || 0 : 0}
            </span>
        </NavLink>
    );
};

export default CartIcon;
