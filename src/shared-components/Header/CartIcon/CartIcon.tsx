import {
    MouseEvent,
    SetStateAction,
    Dispatch,
    useEffect,
    memo,
    useCallback,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks';
import {
    fetchCartDataForAuthUser,
    updateCartInfoForAuthUser,
    addProductsInfoToCheckout,
    fetchProductCartInfo,
    resetIsButtonAddToCartClicked,
    resetCartData,
    setStatusRemoveCartItemBtn,
    updateCartBody,
} from '../../../store/reducers/cartSlice';
import debounce from '../../../utils/debounce';
import type { ProductsInfoToCheckout } from '../../../store/reducers/cartSlice';
import transformCartDataToCheckoutFormat from '../../../utils/transformCartDataToCheckoutFormat';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';
import { Loader, PrefetchProductPageLoader } from '../../Loaders';
import './CartIcon.scss';

type Props = {
    setIsPreviewCartActive: Dispatch<SetStateAction<boolean>>;
    setIsBurgerOpen: Dispatch<SetStateAction<boolean>>;
    isDesktop: boolean | null;
};

const CartIcon = (props: Props) => {
    const { setIsPreviewCartActive, setIsBurgerOpen, isDesktop } = props;
    const {
        cartBody,
        cartTotal,
        cartData,
        loading: cartLoading,
        loadingAuthCart,
        isButtonAddToCartClicked,
        productsInfoToCheckout,
        isDeletedItemButtonActive,
        updateAuthCartLoading,
        mergeCartLoading,
    } = useAppSelector((state) => state.cart);
    const cartBodyLocal = JSON.parse(
        localStorage.getItem('cartBody') as string
    );
    const { loginLoading, logoutLoading, jwtToken } = useAppSelector(
        (state) => state.auth
    );
    const { orderNumber, loading: orderLoading } = useAppSelector(
        (state) => state.order
    );
    const dispatch = useAppDispatch();

    const debouncedUpdateCartInfoForAuthUser = useCallback(
        debounce(() => {
            if (jwtToken) {
                dispatch(updateCartInfoForAuthUser({ customData: null }));
            }
        }, 700),
        [jwtToken]
    );

    useEffect(() => {
        if (!cartBodyLocal) return;
        if (cartBodyLocal.length > 0) {
            dispatch(updateCartBody(cartBodyLocal));
            if (!jwtToken) {
                dispatch(fetchProductCartInfo(cartBodyLocal));
            }
        }
    }, []);

    useEffect(() => {
        if (!jwtToken) return;
        if (loginLoading !== 'succeeded' && loadingAuthCart === 'idle') {
            dispatch(fetchCartDataForAuthUser());
        }
    }, [jwtToken, loginLoading]);

    useEffect(() => {
        if (
            logoutLoading === 'succeeded' ||
            (orderNumber && orderLoading === 'succeeded')
        ) {
            dispatch(updateCartBody([]));
            dispatch(resetCartData());
            localStorage.setItem('checkoutInfo', JSON.stringify([]));
        }
    }, [logoutLoading, orderNumber, orderLoading]);

    useEffect(() => {
        if (!jwtToken)
            localStorage.setItem('cartBody', JSON.stringify(cartBody));
        if (
            cartBody.length > 0 &&
            isButtonAddToCartClicked &&
            !isDeletedItemButtonActive
        ) {
            dispatch(fetchProductCartInfo(cartBody));
            dispatch(resetIsButtonAddToCartClicked());
        }
        if (cartBody.length === 0 && isDeletedItemButtonActive) {
            localStorage.setItem('checkoutInfo', JSON.stringify([]));
            dispatch(resetCartData());
            setIsPreviewCartActive(false);
        }
        if (isDeletedItemButtonActive) {
            dispatch(setStatusRemoveCartItemBtn(false));
        }
    }, [cartBody.length]);

    useEffect(() => {
        if (productsInfoToCheckout.length > 0) {
            localStorage.setItem(
                'checkoutInfo',
                JSON.stringify(productsInfoToCheckout)
            );
        }
        if (jwtToken && loadingAuthCart === 'succeeded') {
            debouncedUpdateCartInfoForAuthUser();
        }
    }, [JSON.stringify(productsInfoToCheckout)]);

    useEffect(() => {
        let productsLocalCheckout: ProductsInfoToCheckout[] = [];
        if (localStorage.getItem('checkoutInfo')) {
            productsLocalCheckout = JSON.parse(
                localStorage.getItem('checkoutInfo') as string
            );
        }

        const checkoutProducts = transformCartDataToCheckoutFormat(
            cartData,
            productsLocalCheckout
        );
        if (mergeCartLoading === 'pending') return;
        dispatch(addProductsInfoToCheckout(checkoutProducts));
    }, [cartData]);

    return (
        <>
            <NavLink
                className="header-icons__cart cart-icon"
                to="/cart"
                aria-label="Open cart"
                onClick={(e) => {
                    if (cartBody.length === 0) {
                        setIsPreviewCartActive(true);
                        e.preventDefault();
                    } else {
                        setIsBurgerOpen(false);
                    }
                }}
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
                    {cartLoading === 'succeeded' &&
                        mergeCartLoading !== 'pending' &&
                        (cartTotal?.totalQuantity || 0)}
                    {((cartLoading !== 'succeeded' && cartLoading !== 'idle') ||
                        mergeCartLoading === 'pending') && (
                        <Loader className="cart-icon__counter-loading" />
                    )}
                    {cartLoading === 'idle' &&
                        mergeCartLoading !== 'pending' &&
                        cartBody.length === 0 &&
                        0}
                </span>
            </NavLink>
            {updateAuthCartLoading === 'pending' && (
                <PrefetchProductPageLoader isLine />
            )}
        </>
    );
};

export default memo(CartIcon);
