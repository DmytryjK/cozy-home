import { MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    fetchProductInfoByScuWithColor,
    updateProductSku,
    updateProductColor,
} from '../store/reducers/productInformationSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import type { ProductInformationType, Loading } from '../types/types';
import transliterate from '../utils/transliterate';

export type LinkState = {
    sku: string;
    color: string;
    isClicked: boolean;
};

const usePrefetchProduct = (isSubscribedPrefetch?: boolean) => {
    const [isLinkClicked, setIsLinkClicked] = useState<LinkState>({
        sku: '',
        color: '',
        isClicked: false,
    });
    const [isCanceledByUser, setIsCanceledByUser] = useState(false);
    const [errorPrefetch, setErrorPrefetch] = useState<any>(null);
    const [loadingPrefetch, setLoadingPrefetch] = useState<Loading>('idle');
    const { currentSku, currentColor, productInfo } = useAppSelector(
        (state) => state.productInformation
    );
    const { name, categoryName, parentCategoryId } = productInfo;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleProductClick = async (
        e: MouseEvent<HTMLAnchorElement>,
        sku: string,
        hex: string
    ) => {
        e.preventDefault();
        setIsLinkClicked({ sku, color: hex, isClicked: true });
        setLoadingPrefetch('pending');
        setErrorPrefetch(null);
        setIsCanceledByUser(false);
        if (
            loadingPrefetch === 'pending' &&
            isLinkClicked.sku === sku &&
            isLinkClicked
        ) {
            return;
        }

        if (!currentSku || currentSku !== sku || currentColor?.id !== hex) {
            dispatch(
                fetchProductInfoByScuWithColor({
                    productSkuCode: sku || '',
                    colorHex: `${hex}`,
                })
            )
                .then((response) => {
                    if (
                        response.payload === '' &&
                        response.meta.requestStatus === 'rejected'
                    ) {
                        throw new Error('AbortError');
                    }
                    const { categoryName, parentCategoryId, colors, name } =
                        response.payload as ProductInformationType;
                    const colorName = colors.filter((color) => {
                        return color.id === hex;
                    });
                    const translitCategName = transliterate(categoryName);
                    const translitProdName = transliterate(name);
                    const translitColorName = transliterate(colorName[0].name);

                    dispatch(updateProductSku(sku));
                    dispatch(
                        updateProductColor({
                            name: colorName[0].name,
                            id: colorName[0].id,
                            quantityStatus: colorName[0].quantityStatus,
                        })
                    );
                    if (
                        isSubscribedPrefetch === undefined ||
                        isSubscribedPrefetch
                    ) {
                        const redirectUrl = `/catalog/${translitCategName}&categoryId=${parentCategoryId}/product?name=${translitProdName}&color=${translitColorName}&sku=${sku}&hex=${hex.replace(
                            '#',
                            ''
                        )}`;
                        setIsLinkClicked({ sku, color: hex, isClicked: false });
                        setLoadingPrefetch('succeeded');
                        setErrorPrefetch(null);
                        navigate(redirectUrl);
                    } else {
                        setIsLinkClicked({ sku, color: hex, isClicked: false });
                        setLoadingPrefetch('idle');
                        setErrorPrefetch(null);
                    }
                })
                .catch((error: any) => {
                    if (error.message !== 'AbortError') {
                        setErrorPrefetch(error);
                        setLoadingPrefetch('failed');
                    } else {
                        setIsCanceledByUser(true);
                    }
                });
        } else if (currentSku) {
            const redirectUrl = `/catalog/${transliterate(
                categoryName
            )}&categoryId=${parentCategoryId}/product?name=${transliterate(
                name
            )}&color=${transliterate(
                currentColor.name
            )}&sku=${sku}&hex=${hex.replace('#', '')}`;
            setLoadingPrefetch('succeeded');
            setIsLinkClicked({ sku, color: hex, isClicked: false });
            setErrorPrefetch(null);
            navigate(redirectUrl);
        }
    };
    return {
        handleProductClick,
        isLinkClicked,
        loadingPrefetch,
        errorPrefetch,
        setErrorPrefetch,
        setIsLinkClicked,
        isCanceledByUser,
    };
};

export default usePrefetchProduct;
