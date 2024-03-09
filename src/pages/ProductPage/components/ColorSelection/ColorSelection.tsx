import { useEffect, memo } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { useLenis } from '@studio-freight/react-lenis';
import {
    updateProductColor,
    updateProductImages,
} from '../../../../store/reducers/productInformationSlice';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import { ResponseData } from '../ProductImagesSlider/ProductImagesSlider';
import { sortColors } from '../../../../shared-components/ProductCard/SliderImages/SliderImages';
import './ColorSelection.scss';
import transliterate from '../../../../utils/transliterate';

type Props = {
    setColorChange: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColorSelection = ({ setColorChange }: Props) => {
    const [search, setSearch] = useSearchParams();
    const lenis = useLenis(({ scroll }) => {});

    const skuCode = useAppSelector(
        (state) => state.productInformation.productInfo.skuCode
    );
    const colorDtoList = useAppSelector(
        (state) => state.productInformation.productInfo.colors
    );
    const currentColor = useAppSelector(
        (state) => state.productInformation.currentColor
    );
    const colorDtoSort = sortColors(colorDtoList);
    const localColorCurrent = JSON.parse(
        localStorage.getItem('currentColor') ||
            JSON.stringify({
                hex: '',
                colorName: '',
                quantityStatus: '',
            })
    );
    const localHex = localColorCurrent.hex;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        if (!localHex || colorDtoSort.length === 0) return;
        if (!colorDtoSort.some((color) => color.id === localHex)) return;
        if (currentColor) return;
        const colorName = colorDtoSort.filter(
            (color) => color.id === localHex
        )[0].name;
        const colorStatus = colorDtoSort.filter(
            (color) => color.id === localHex
        )[0].quantityStatus;
        dispatch(
            updateProductColor({
                id: localHex,
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
        setColorChange(true);
        try {
            const requestBody = {
                productSkuCode: skuCode,
                colorHex: id,
            };

            const response = await fetch(
                'https://cozy-home.onrender.com/api/v1/image/product-card-image',
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
        } finally {
            setColorChange(false);
        }
    };

    return (
        <div className="color-selection">
            <span className="color-selection__color-descr">
                Колір: <span>{currentColor?.name}</span>
            </span>
            <ul className="color-selection__list">
                {colorDtoSort.map((color) => {
                    const { id, name, quantityStatus } = color;
                    return (
                        <li
                            className={`color-selection__item ${
                                quantityStatus === 'Немає на складі' ||
                                quantityStatus === 'Немає в наявності'
                                    ? 'out-of-stock'
                                    : ''
                            }`}
                            key={`product-color-${skuCode}-${color.id}`}
                        >
                            <NavLink
                                className={`color-selection__link ${
                                    currentColor?.id === id ? 'active-link' : ''
                                }`}
                                to={`${pathname}`}
                                style={{ backgroundColor: `${id}` }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    lenis?.scrollTo('top', {
                                        offset: 0,
                                        lerp: 0.1,
                                        duration: 0.5,
                                        easing: (rawValue: number) => rawValue, // Example easing function
                                        immediate: false,
                                        lock: false,
                                        force: false,
                                    });
                                    search.set('hex', id.replace('#', ''));
                                    search.set('color', transliterate(name));
                                    setSearch(search);
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

export default memo(ColorSelection);
