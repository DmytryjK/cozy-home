import {
    MouseEvent,
    SetStateAction,
    Dispatch,
    useEffect,
    useState,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import {
    addProductsInfoToCheckout,
    updateCartBody,
    fetchProductCartInfo,
    resetCartData,
    setStatusRemoveCartItemBtn,
} from '../../../store/reducers/cartSlice';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';
import './CartIcon.scss';

type Props = {
    setIsPreviewCartActive: Dispatch<SetStateAction<boolean>>;
};

const CartIcon = (props: Props) => {
    const [isDesktop, setIsDesktop] = useState<boolean>(true);
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const cartTotal = useAppSelector((state) => state.cart.cartTotal);
    const cartData = useAppSelector((state) => state.cart.cartData);
    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );
    const isDeletedItemButtonActive = useAppSelector(
        (state) => state.cart.isDeletedItemButtonActive
    );
    const cartBodyLocal = JSON.parse(
        localStorage.getItem('cartBody') as string
    );
    const { setIsPreviewCartActive } = props;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (window.innerWidth <= 960) {
            setIsDesktop(false);
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 960) {
                setIsDesktop(false);
            } else {
                setIsDesktop(true);
            }
        });
    }, []);

    useEffect(() => {
        const productsLocalCheckout = localStorage.getItem('checkoutInfo')
            ? JSON.parse(localStorage.getItem('checkoutInfo') as string)
            : [];
        const checkoutProducts = cartData.map((item) => {
            const { skuCode, colorHex, price, priceWithDiscount } = item;
            let localItemQuantity = 1;
            if (
                productsLocalCheckout.some((localItem: any) => {
                    if (
                        localItem.skuCode === skuCode &&
                        localItem.colorHex === colorHex &&
                        localItem.quantityToCheckout > 1
                    ) {
                        localItemQuantity = localItem.quantityToCheckout;
                        return true;
                    }
                    return undefined;
                })
            ) {
                return {
                    skuCode,
                    colorHex,
                    price: (priceWithDiscount || price) * localItemQuantity,
                    quantityToCheckout: localItemQuantity,
                };
            }
            return {
                skuCode,
                colorHex,
                price: priceWithDiscount || price,
                quantityToCheckout: 1,
            };
        });
        dispatch(addProductsInfoToCheckout(checkoutProducts));
    }, [cartData]);

    useEffect(() => {
        if (productsInfoToCheckout.length > 0) {
            localStorage.setItem(
                'checkoutInfo',
                JSON.stringify(productsInfoToCheckout)
            );
        }
    }, [productsInfoToCheckout]);

    useEffect(() => {
        if (!cartBodyLocal) return;
        if (cartBodyLocal.length > 0) {
            dispatch(updateCartBody(cartBodyLocal));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartBody', JSON.stringify(cartBody));
        if (cartBody.length === 0) {
            if (isDeletedItemButtonActive) {
                localStorage.setItem('checkoutInfo', JSON.stringify([]));
            }
            dispatch(resetCartData());
            dispatch(setStatusRemoveCartItemBtn(false));
            setIsPreviewCartActive(false);
        } else {
            if (isDeletedItemButtonActive) {
                dispatch(setStatusRemoveCartItemBtn(false));
                return;
            }
            dispatch(fetchProductCartInfo(cartBody));
        }
    }, [cartBody]);

    const openProductCart = (e: MouseEvent) => {
        if (cartBody.length === 0) {
            e.preventDefault();
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
