import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import nextId from 'react-id-generator';
import {
    updateProductColor,
    fetchProductInfoByScuWithColor,
    updateProductImages,
} from '../../../../store/reducers/productInformationSlice';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import './ColorSelection.scss';
import { ResponseData } from '../ProductImagesSlider/ProductImagesSlider';

const ColorSelection = () => {
    const skuCode = useAppSelector(
        (state) => state.productInformation.productInfo.skuCode
    );
    const colorDtoList = useAppSelector(
        (state) => state.productInformation.productInfo.colors
    );
    const currentColor = useAppSelector(
        (state) => state.productInformation.currentColor
    );
    const currentSkuCode = useAppSelector(
        (state) => state.productInformation.currentSku
    );

    const localColorCurrent = JSON.parse(
        localStorage.getItem('currentColor') ||
            JSON.stringify({
                hex: '',
                colorName: '',
                quantityStatus: '',
            })
    );
    const { hex, colorName } = localColorCurrent;
    const localProductSku = localStorage.getItem('productSkuCode');
    const { pathname, hash } = useLocation();

    const dispatch = useAppDispatch();
    const currentPath = useLocation().pathname;

    useEffect(() => {
        const { hex } = localColorCurrent;
        if (localProductSku && hex) {
            dispatch(
                fetchProductInfoByScuWithColor({
                    productSkuCode: localProductSku,
                    colorHex: hex,
                })
            );
        } else {
            const regex = /\D/g;
            const skuFromLink = pathname.replace(regex, ''); // Удаляем все, кроме цифр
            dispatch(
                fetchProductInfoByScuWithColor({
                    productSkuCode: skuFromLink,
                    colorHex: hash,
                })
            );
            localStorage.setItem('productSkuCode', skuFromLink);
            localStorage.setItem(
                'currentColor',
                JSON.stringify({
                    hex: hash,
                })
            );
        }
        if (!currentSkuCode || !currentColor) return;
        dispatch(
            fetchProductInfoByScuWithColor({
                productSkuCode: currentSkuCode,
                colorHex: currentColor.id,
            })
        );
    }, [dispatch, currentSkuCode]);

    useEffect(() => {
        if (!hex || colorDtoList.length === 0) return;
        const colorName = colorDtoList.filter((color) => color.id === hex)[0]
            .name;
        const colorStatus = colorDtoList.filter((color) => color.id === hex)[0]
            .quantityStatus;

        localStorage.setItem(
            'currentColor',
            JSON.stringify({
                hex,
                colorName,
                colorStatus,
            })
        );
        dispatch(
            updateProductColor({
                id: hex,
                name: colorName,
                quantityStatus: colorStatus,
            })
        );
    }, [colorDtoList]);

    useEffect(() => {
        if (!currentColor) return;
        const { id, name, quantityStatus } = currentColor;
        localStorage.setItem(
            'currentColor',
            JSON.stringify({
                hex: id,
                colorName: name,
                colorStatus: quantityStatus,
            })
        );
    }, [currentColor]);

    const handleColorChange = async (id: string) => {
        try {
            const requestBody = {
                productSkuCode: skuCode,
                colorHex: id,
            };

            const response = await fetch(
                'https://cozy-home.onrender.com/api/v1/image/product_card_image',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data: ResponseData[] = await response.json();

            dispatch(updateProductImages(data));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="color-selection">
            <span className="color-selection__color-descr">
                Колір: <span>{currentColor?.name}</span>
            </span>
            <ul className="color-selection__list">
                {colorDtoList.map((color) => {
                    const { id, name, quantityStatus } = color;
                    return (
                        <li
                            className={`color-selection__item ${
                                quantityStatus === 'Немає на складі' ||
                                quantityStatus === 'Немає в наявності'
                                    ? 'out-of-stock'
                                    : ''
                            }`}
                            key={nextId('product-color')}
                        >
                            <NavLink
                                className={`color-selection__link ${
                                    currentColor?.id === id ? 'active-link' : ''
                                }`}
                                to={`${currentPath}${id}`}
                                style={{ backgroundColor: `${id}` }}
                                onClick={() => {
                                    handleColorChange(id);
                                    dispatch(
                                        updateProductColor({
                                            name,
                                            id,
                                            quantityStatus,
                                        })
                                    );
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ColorSelection;
