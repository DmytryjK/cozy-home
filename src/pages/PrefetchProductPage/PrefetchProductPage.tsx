import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import Loader from '../../shared-components/Loaders/components/Loader';
import ErrorMessage from '../../shared-components/UserMessages/ErrorMessage';
import transliterate from '../../utils/transliterate';
import {
    fetchProductInfoByScuWithColor,
    updateProductSku,
    updateProductColor,
} from '../../store/reducers/productInformationSlice';
import type { ProductInformationType } from '../../types/types';
import './PrefetchProductPage.scss';

const PrefetchProductPage = () => {
    const { sku, hex } = useParams();
    const [localError, setLocalError] = useState('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error, currentColor, currentSku, productInfo } =
        useAppSelector((state) => state.productInformation);
    const { name, categoryName, parentCategoryId } = productInfo;

    const loadingProduct = async () => {
        if (!sku || !hex) return null;
        try {
            const response = await dispatch(
                fetchProductInfoByScuWithColor({
                    productSkuCode: sku || '',
                    colorHex: `#${hex}`,
                })
            );

            if (!response.payload) {
                throw new Error('some error');
            }
            const { categoryName, parentCategoryId, colors, name } =
                response.payload as ProductInformationType;
            const colorName = colors.filter((color) => {
                return color.id === `#${hex}`;
            });
            if (colorName.length === 0) {
                throw new Error('Товар в такому кольорі не знайдено');
            }

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

            const redirectUrl = `/catalog/${translitCategName}&categoryId=${parentCategoryId}/product?name=${translitProdName}&color=${translitColorName}&sku=${sku}&hex=${hex.replace(
                '#',
                ''
            )}`;
            return navigate(redirectUrl);
        } catch (error: any) {
            setLocalError(error.message);
            return error;
        }
    };

    useEffect(() => {
        if (!sku || !hex) return;
        if (currentColor?.id === hex && currentSku === sku) {
            const translitCategName = transliterate(categoryName);
            const translitProdName = transliterate(name);
            const translitColorName = transliterate(currentColor.name);
            const redirectUrl = `/catalog/${translitCategName}&categoryId=${parentCategoryId}/product?name=${translitProdName}&color=${translitColorName}&sku=${sku}&hex=${hex.replace(
                '#',
                ''
            )}`;
            navigate(redirectUrl);
        } else {
            loadingProduct();
        }
    }, [sku, hex]);

    return (
        <section className="prefetch-product">
            <div className="container">
                {loading === 'pending' ? (
                    <Loader className="prefetch-product__loader" />
                ) : (
                    ''
                )}
                {error ? <ErrorMessage /> : ''}
                {localError ? <ErrorMessage message={localError} /> : ''}
            </div>
        </section>
    );
};

export default PrefetchProductPage;
