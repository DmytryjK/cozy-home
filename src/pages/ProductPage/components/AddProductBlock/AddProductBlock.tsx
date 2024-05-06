import { useState, useEffect } from 'react';
import AddToFavoriteBtn from '../../../../shared-components/AddToFavoriteBtn/AddToFavoriteBtn';
import AddToCartBtn from './AddToCartBtn/AddToCartBtn';
import { useAppSelector } from '../../../../hooks/hooks';

const AddProductBlock = () => {
    const [isAvailable, setIsAvailable] = useState(true);
    const jwtToken = useAppSelector((state) => state.auth.jwtToken);
    const quantityStatus = useAppSelector(
        (state) => state.productInformation.currentColor?.quantityStatus
    );
    const currentColor = useAppSelector(
        (state) => state.productInformation.currentColor
    );
    const isFavorite = useAppSelector(
        (state) => state.productInformation.productInfo.favorite
    );
    const skuCode = useAppSelector(
        (state) => state.productInformation.productInfo.skuCode
    );

    useEffect(() => {
        if (!quantityStatus) return;
        if (
            quantityStatus === 'Немає на складі' ||
            quantityStatus === 'Немає в наявності'
        ) {
            setIsAvailable(false);
        } else {
            setIsAvailable(true);
        }
    }, [quantityStatus]);

    return (
        <div
            className={`product-page__add-product ${
                !isAvailable ? 'unavailable' : ''
            }`}
        >
            <AddToCartBtn />
            {isFavorite !== null && jwtToken ? (
                <AddToFavoriteBtn
                    productSkuCode={skuCode}
                    isFavorite={isFavorite}
                />
            ) : (
                ''
            )}
        </div>
    );
};

export default AddProductBlock;
