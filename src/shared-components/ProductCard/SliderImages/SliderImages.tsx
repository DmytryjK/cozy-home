import { useState, useEffect, useRef, memo, MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import nextId from 'react-id-generator';
import LazyLoad from 'react-lazy-load';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
    updateProductColor,
    updateProductSku,
    fetchProductInfoByScuWithColor,
} from '../../../store/reducers/productInformationSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import Loader from '../../Loader';
import transliterate from '../../../utils/transliterate';
import imageNotFound from '../../../assets/images/error-images/image-not-found_small.png';
import type {
    ProductInformationType,
    Loading,
    ProductCardType,
    ColorDtoList,
    ImageDtoList,
} from '../../../types/types';
import { API_BASE } from '../../../utils/API_BASE';
import './SliderImages.scss';

export type ImageType = {
    imageSrc: string;
};

export type ImagesData = Record<number, ImageType>;

type ImageSrc = {
    id: string;
    imagePath: string;
    color: string;
};

type Props = {
    productData: ProductCardType;
    imagesData: ImagesData;
    setImagesData: React.Dispatch<React.SetStateAction<ImagesData>>;
    setCurrentColor: React.Dispatch<
        React.SetStateAction<{
            name: string;
            hex: string;
            quantityStatus: string;
        }>
    >;
    currentColor: {
        name: string;
        hex: string;
        quantityStatus: string;
    };
};

export const sortColors = (colorDtoList: ColorDtoList[]) => {
    const colorDtoSort: ColorDtoList[] = JSON.parse(
        JSON.stringify(colorDtoList)
    );
    return colorDtoSort.sort((a, b) => {
        const valuesOfAvailability = [
            'Немає в наявності',
            'Закінчується',
            'В наявності',
        ];
        const compareA = valuesOfAvailability.indexOf(a.quantityStatus);
        const compareB = valuesOfAvailability.indexOf(b.quantityStatus);
        if (compareA < compareB) {
            return 1;
        }
        if (compareA > compareB) {
            return -1;
        }
        return 0;
    });
};

const sortColorByFirstImg = (
    colorDtoList: ColorDtoList[],
    imageDtoList: ImageDtoList[]
) => {
    return sortColors(colorDtoList).sort((a, b) => {
        if (a.name === imageDtoList[0].color) {
            return -1;
        }
        if (b.name === imageDtoList[0].color) {
            return 1;
        }
        return 0;
    });
};

const SliderImages = (props: Props) => {
    const {
        productData,
        imagesData,
        setImagesData,
        currentColor,
        setCurrentColor,
    } = props;
    const {
        skuCode,
        name,
        shortDescription,
        colorDtoList,
        imageDtoList,
        favorite,
    } = productData;

    const [currentIndexColor, setCurrentIndexColor] = useState<number>(0);
    const [isColorChosen, setIsColorChosen] = useState(false);
    const uniqIdForInputName = nextId('color-');

    const [imageSrc, setImageSrc] = useState<string>('');
    const [loading, setLoading] = useState<Loading>('succeeded');
    const [error, setError] = useState<unknown | null>(null);

    const [isLinkClicked, setIsLinkClicked] = useState<{
        sku: string;
        color: string;
        isClicked: boolean;
    }>({ sku: '', color: '', isClicked: false });

    const productPageLoading = useAppSelector(
        (state) => state.productInformation.loading
    );
    const productPageSku = useAppSelector(
        (state) => state.productInformation.currentSku
    );
    const productPageHex = useAppSelector(
        (state) => state.productInformation.currentColor
    );
    const productPageName = useAppSelector(
        (state) => state.productInformation.productInfo.name
    );
    const productPageCategoryName = useAppSelector(
        (state) => state.productInformation.productInfo.categoryName
    );
    const productCategoryId = useAppSelector(
        (state) => state.productInformation.productInfo.parentCategoryId
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const colorDtoSort = sortColorByFirstImg(colorDtoList, imageDtoList);

    useEffect(() => {
        if (!isColorChosen && imageDtoList.length > 0) {
            const { name, id, quantityStatus } = colorDtoSort[0];
            setCurrentColor({ name, hex: id, quantityStatus });
            setCurrentIndexColor(0);
        }
    }, [isColorChosen, imageDtoList]);

    useEffect(() => {
        setImagesData({
            [currentIndexColor]: {
                imageSrc: imageDtoList[0].imagePath || imageNotFound,
            },
        });
    }, [imageDtoList]);

    useEffect(() => {
        if (imageSrc) {
            if (Object.keys(imagesData).length < colorDtoSort.length) {
                setImagesData((prev) => ({
                    ...prev,
                    [currentIndexColor]: {
                        imageSrc,
                    },
                }));
            }
        }
    }, [imageSrc, imageDtoList]);

    useEffect(() => {
        if (productPageLoading === 'failed') {
            if (
                isLinkClicked.isClicked === true &&
                isLinkClicked.sku === skuCode
            ) {
                setIsLinkClicked((props) => {
                    return {
                        ...props,
                        isLinkClicked: false,
                    };
                });
            }
        }
    }, [productPageLoading]);

    const handleSlideChange = (
        color: string,
        index: number,
        id: string,
        quantityStatus: string
    ) => {
        setCurrentColor({ name: color, hex: id, quantityStatus });
        setIsColorChosen(true);
        setCurrentIndexColor(index);
        setLoading('idle');
        async function fetchData() {
            try {
                setImageSrc('');
                setLoading('pending');

                const response = await fetch(`${API_BASE}image/product-color`, {
                    method: 'POST',
                    body: JSON.stringify({
                        productSkuCode: skuCode,
                        colorHex: id,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });

                const result: ImageSrc = await response.json();

                if (!response.ok) throw new Error('something went wrong');

                setImageSrc(result.imagePath);
                setError(null);
                setLoading('succeeded');
            } catch (errors) {
                setError(errors);
                setLoading('failed');
                setImageSrc(imageNotFound);
            }
        }
        if (
            error === null &&
            imagesData &&
            Object.keys(imagesData).length < colorDtoSort.length
        )
            fetchData();
    };

    const renderedImage = (name: string, index: number) => {
        let result: JSX.Element = (
            <LazyLoad height={350}>
                <img
                    className="product-card__image"
                    src={imagesData[index]?.imageSrc || ''}
                    loading="lazy"
                    width={304}
                    height={350}
                    alt={name}
                />
            </LazyLoad>
        );

        if (loading === 'pending') {
            result = <Loader />;
        }
        return result;
    };

    const handleLinkClick = async (
        e: MouseEvent<HTMLAnchorElement>,
        sku: string,
        hex: string
    ) => {
        e.preventDefault();
        setIsLinkClicked({ sku, color: hex, isClicked: true });

        if (
            productPageLoading === 'pending' &&
            isLinkClicked.isClicked &&
            isLinkClicked.sku === skuCode
        ) {
            return;
        }

        try {
            if (
                !productPageSku ||
                productPageSku !== sku ||
                productPageHex?.id !== hex
            ) {
                const response = await dispatch(
                    fetchProductInfoByScuWithColor({
                        productSkuCode: sku || '',
                        colorHex: `${hex}`,
                    })
                );

                if (!response.payload) {
                    throw new Error('some error');
                }
                const { categoryName, parentCategoryId, colors, name } =
                    response.payload as ProductInformationType;
                const colorName = colors.filter((color) => {
                    return color.id === currentColor.hex;
                });
                const translitCategName = transliterate(categoryName);
                const translitProdName = transliterate(name);
                const translitColorName = transliterate(colorName[0].name);
                dispatch(updateProductSku(skuCode));
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
                setIsLinkClicked({ sku, color: hex, isClicked: false });
                navigate(redirectUrl);
            } else if (productPageHex) {
                const redirectUrl = `/catalog/${transliterate(
                    productPageCategoryName
                )}&categoryId=${productCategoryId}/product?name=${transliterate(
                    productPageName
                )}&color=${transliterate(
                    productPageHex.name
                )}&sku=${sku}&hex=${hex.replace('#', '')}`;
                navigate(redirectUrl);
            }
        } catch (error: any) {
            setIsLinkClicked({ sku, color: hex, isClicked: false });
        }
    };
    return (
        <>
            <NavLink
                className="product-card__slider-link"
                to={`/prefetch/${skuCode}/${currentColor.hex.replace('#', '')}`}
                onClick={(e) => handleLinkClick(e, skuCode, currentColor.hex)}
            >
                {productPageLoading === 'pending' &&
                isLinkClicked.isClicked &&
                isLinkClicked.sku === skuCode ? (
                    <div className="product-card__preload-page">
                        <span className="product-card-preload__loading-dots">
                            <span className="product-card-preload__loading-dot" />
                            <span className="product-card-preload__loading-dot" />
                            <span className="product-card-preload__loading-dot" />
                        </span>
                    </div>
                ) : (
                    ''
                )}
                <div className="product-card__slider">
                    <div className="product-card__image-overflow">
                        {loading === 'pending' ? (
                            <div className="product-card__image-wrapper">
                                <Loader />
                            </div>
                        ) : (
                            ''
                        )}
                        {colorDtoSort.length === 0 && (
                            <div className="product-card__image-wrapper">
                                <img
                                    className="product-card__image"
                                    src={imageNotFound}
                                    alt={name}
                                />
                            </div>
                        )}
                        {colorDtoSort.map((color, index) => {
                            return (
                                <div
                                    className={`product-card__image-wrapper ${
                                        currentColor.hex === color.id
                                            ? 'active'
                                            : ''
                                    }`}
                                    key={`slider-image-${skuCode}${color.id}`}
                                >
                                    {renderedImage(name, index)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </NavLink>
            <div className="product-card__content swiper-no-swiping">
                <div className="product-card__content-top">
                    <h2 className="product-card__title">
                        <NavLink
                            className="product-card__title-link"
                            to={`/prefetch/${skuCode}/${currentColor.hex.replace(
                                '#',
                                ''
                            )}`}
                            onClick={(e) =>
                                handleLinkClick(e, skuCode, currentColor.hex)
                            }
                        >
                            {name}
                        </NavLink>
                    </h2>
                    <fieldset className="product-card__color-checkboxes">
                        {colorDtoSort.map((color, index) => {
                            const { name, id, quantityStatus } = color;
                            return (
                                <label
                                    className="product-card__checkbox-label"
                                    key={nextId('color-radio')}
                                >
                                    <input
                                        className="product-card__color-checkbox"
                                        type="radio"
                                        name={uniqIdForInputName}
                                        aria-label={name}
                                        value={id}
                                        checked={
                                            currentColor.name === name ||
                                            (!isColorChosen && index === 0)
                                        }
                                        onChange={() =>
                                            handleSlideChange(
                                                name,
                                                index,
                                                id,
                                                quantityStatus
                                            )
                                        }
                                        onClick={() => {
                                            setCurrentColor({
                                                name,
                                                hex: id,
                                                quantityStatus,
                                            });
                                            setIsColorChosen(true);
                                        }}
                                    />
                                    <span
                                        className={`product-card__checked-checkbox ${
                                            quantityStatus ===
                                            'Немає в наявності'
                                                ? 'product-card__checked-checkbox_not-available'
                                                : ''
                                        }`}
                                        style={{ backgroundColor: `${id}` }}
                                    />
                                </label>
                            );
                        })}
                    </fieldset>
                </div>
                <p className="product-card__description">{shortDescription}</p>
            </div>
        </>
    );
};

export default memo(SliderImages);
