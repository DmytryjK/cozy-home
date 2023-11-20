import {
    MouseEvent,
    SetStateAction,
    Dispatch,
    useEffect,
    useState,
    memo,
    useCallback,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';
import userScreenWith from '../../../utils/userScreenWith';
import './CartIcon.scss';

type Props = {
    setIsPreviewCartActive: Dispatch<SetStateAction<boolean>>;
    setIsBurgerOpen: Dispatch<SetStateAction<boolean>>;
};

const CartIcon = (props: Props) => {
    const [isDesktop, setIsDesktop] = useState<boolean>(true);
    // const cartBody = useAppSelector((state) => state.cart.cartBody);
    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );
    const cartTotal = useAppSelector((state) => state.cart.cartTotal);
    const dispatch = useAppDispatch();
    const { setIsPreviewCartActive, setIsBurgerOpen } = props;

    useEffect(() => {
        if (userScreenWith() <= 960) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }, []);

    const openProductCart = useCallback((e: MouseEvent) => {
        if (productsInfoToCheckout.length === 0) {
            e.preventDefault();
        } else {
            setIsBurgerOpen(false);
        }
    }, []);

    useEffect(() => {
        console.log(cartTotal, productsInfoToCheckout, 'asdfasdf');
    }, [cartTotal, productsInfoToCheckout]);

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
                {productsInfoToCheckout.length > 0
                    ? cartTotal?.totalQuantity || 0
                    : 0}
            </span>
        </NavLink>
    );
};

export default memo(CartIcon);
