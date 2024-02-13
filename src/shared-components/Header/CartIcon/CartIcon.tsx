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
    mergeCartOnAuth,
    addProductsInfoToCheckout,
    fetchProductCartInfo,
    resetIsButtonAddToCartClicked,
    resetCartData,
    setStatusRemoveCartItemBtn,
    updateCartBody,
} from '../../../store/reducers/cartSlice';
import debounce from '../../../utils/debounce';
import type { ProductsInfoToCheckout } from '../../../store/reducers/cartSlice';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';
import './CartIcon.scss';

type Props = {
    setIsPreviewCartActive: Dispatch<SetStateAction<boolean>>;
    setIsBurgerOpen: Dispatch<SetStateAction<boolean>>;
    isDesktop: boolean;
};

const CartIcon = (props: Props) => {
    const cartBody = useAppSelector((state) => state.cart.cartBody);
    const cartTotal = useAppSelector((state) => state.cart.cartTotal);
    const cartData = useAppSelector((state) => state.cart.cartData);
    const isButtonAddToCartClicked = useAppSelector(
        (state) => state.cart.isButtonAddToCartClicked
    );
    const cartBodyLocal = JSON.parse(
        localStorage.getItem('cartBody') as string
    );

    const loginLoading = useAppSelector((state) => state.auth.loginLoading);
    const logoutLoading = useAppSelector((state) => state.auth.logoutLoading);
    const jwtToken = useAppSelector((state) => state.auth.jwtToken);
    const productsInfoToCheckout = useAppSelector(
        (state) => state.cart.productsInfoToCheckout
    );
    const isDeletedItemButtonActive = useAppSelector(
        (state) => state.cart.isDeletedItemButtonActive
    );

    const { setIsPreviewCartActive, setIsBurgerOpen, isDesktop } = props;
    const dispatch = useAppDispatch();

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
        if (loginLoading !== 'succeeded') {
            dispatch(fetchCartDataForAuthUser());
        } else {
            dispatch(mergeCartOnAuth());
            localStorage.setItem('cartBody', JSON.stringify([]));
            localStorage.setItem('checkoutInfo', JSON.stringify([]));
        }
    }, [loginLoading, jwtToken]);

    useEffect(() => {
        if (logoutLoading === 'succeeded') {
            dispatch(updateCartBody([]));
            dispatch(resetCartData());
            localStorage.setItem('checkoutInfo', JSON.stringify([]));
        }
    }, [logoutLoading]);

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

    const debouncedUpdateCartInfoForAuthUser = useCallback(
        debounce(() => {
            dispatch(updateCartInfoForAuthUser({ customData: null }));
        }, 700),
        []
    );

    useEffect(() => {
        if (productsInfoToCheckout.length > 0) {
            localStorage.setItem(
                'checkoutInfo',
                JSON.stringify(productsInfoToCheckout)
            );
        }
        if (jwtToken) {
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
        const checkoutProducts = cartData.map((item) => {
            const {
                name,
                skuCode,
                colorHex,
                price,
                priceWithDiscount,
                colorName,
                quantity,
                availableProductQuantity,
            } = item;
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
                    productName: name,
                    skuCode,
                    colorHex,
                    colorName,
                    price: (priceWithDiscount || price) * localItemQuantity,
                    quantityToCheckout: localItemQuantity,
                };
            }
            return {
                productName: name,
                skuCode,
                colorHex,
                colorName,
                price: priceWithDiscount || price,
                quantityToCheckout: availableProductQuantity
                    ? quantity || 1
                    : availableProductQuantity,
            };
        });
        dispatch(addProductsInfoToCheckout(checkoutProducts));
    }, [cartData]);

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

export default memo(CartIcon);
