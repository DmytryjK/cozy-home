import AddToFavoriteBtn from '../../../../shared-components/AddToFavoriteBtn/AddToFavoriteBtn';
import AddToCartBtn from './AddToCartBtn/AddToCartBtn';
import { useAppSelector } from '../../../../hooks/hooks';

const AddProductBlock = () => {
    const quantityStatus = useAppSelector(
        (state) => state.productInformation.currentColor?.quantityStatus
    );
    return (
        <div className="product-page__add-product">
            <AddToCartBtn />
            {quantityStatus === 'Немає на складі' ||
            quantityStatus === 'Немає в наявності' ? null : (
                <AddToFavoriteBtn />
            )}
        </div>
    );
};

export default AddProductBlock;
