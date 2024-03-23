import { useState, useEffect, useCallback, memo } from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import Loader from '../../Loaders/components/Loader';
import imageNotFound from '../../../assets/images/error-images/image-not-found_small.png';
import type {
    Loading,
    ProductCardType,
    ColorDtoList,
} from '../../../types/types';
import { API_BASE } from '../../../utils/API_BASE';
import usePrefetchProduct from '../../../hooks/usePrefetchProduct';
import { PrefetchProductPageLoader } from '../../Loaders';
import { ErrorMessageSmall } from '../../UserMessages/UserMessages';
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
    sortedColorDto: ColorDtoList[];
};

const SliderImages = (props: Props) => {
    const { productData, currentColor, setCurrentColor, sortedColorDto } =
        props;
    const { skuCode, name, shortDescription, imageDtoList } = productData;
    const [currentIndexColor, setCurrentIndexColor] = useState<number>(0);
    const [isColorChosen, setIsColorChosen] = useState(false);
    const [imagesData, setImagesData] = useState<ImagesData>({});

    const [imageSrc, setImageSrc] = useState<string>('');
    const [loading, setLoading] = useState<Loading>('succeeded');
    const [error, setError] = useState<unknown | null>(null);

    const {
        loadingPrefetch,
        handleProductClick,
        errorPrefetch,
        isLinkClicked,
        isCanceledByUser,
    } = usePrefetchProduct();

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout> | null = null;
        if (!isColorChosen && imageDtoList.length > 0) {
            timeout = setTimeout(() => {
                const { name, id, quantityStatus } = sortedColorDto[0];
                setCurrentColor({ name, hex: id, quantityStatus });
                setCurrentIndexColor(0);
            });
        }
        return () => clearTimeout(timeout || '');
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
            if (Object.keys(imagesData).length < sortedColorDto.length) {
                setImagesData((prev) => ({
                    ...prev,
                    [currentIndexColor]: {
                        imageSrc,
                    },
                }));
            }
        }
    }, [imageSrc, imageDtoList]);

    const handleSlideChange = useCallback(
        (color: string, index: number, id: string, quantityStatus: string) => {
            setCurrentColor({ name: color, hex: id, quantityStatus });
            setIsColorChosen(true);
            setCurrentIndexColor(index);
            setLoading('idle');
            async function fetchData() {
                try {
                    setImageSrc('');
                    setLoading('pending');

                    const response = await fetch(
                        `${API_BASE}image/product-color`,
                        {
                            method: 'POST',
                            body: JSON.stringify({
                                productSkuCode: skuCode,
                                colorHex: id,
                            }),
                            headers: {
                                'Content-type':
                                    'application/json; charset=UTF-8',
                            },
                        }
                    );

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
            if (error === null && imagesData && !imagesData[index]?.imageSrc) {
                fetchData();
            }
        },
        [imagesData]
    );

    return (
        <>
            <NavLink
                className="product-card__slider-link"
                to={`/prefetch/${skuCode}/${currentColor.hex.replace('#', '')}`}
                onClick={(e) => {
                    e.preventDefault();
                    handleProductClick(e, skuCode, currentColor.hex);
                }}
            >
                {loadingPrefetch === 'pending' &&
                    isLinkClicked.isClicked &&
                    isLinkClicked.sku === skuCode &&
                    !isCanceledByUser && (
                        <PrefetchProductPageLoader className="product-card-preloader" />
                    )}
                {errorPrefetch && (
                    <ErrorMessageSmall text="Помилка завантаження" />
                )}
                <div className="product-card__slider">
                    <div className="product-card__image-overflow">
                        {loading === 'pending' && (
                            <div className="product-card__image-wrapper">
                                <Loader />
                            </div>
                        )}
                        {sortedColorDto.length === 0 && (
                            <div className="product-card__image-wrapper">
                                <img
                                    className="product-card__image"
                                    src={imageNotFound}
                                    alt={name}
                                />
                            </div>
                        )}
                        {sortedColorDto.map((color, index) => {
                            return (
                                <div
                                    className={`product-card__image-wrapper ${
                                        currentColor.hex === color.id
                                            ? 'active'
                                            : ''
                                    }`}
                                    key={`slider-image-${skuCode}${color.id}`}
                                >
                                    {loading === 'pending' ? (
                                        <Loader />
                                    ) : (
                                        <LazyLoad height={350}>
                                            <img
                                                className="product-card__image"
                                                src={
                                                    imagesData[index]
                                                        ?.imageSrc || ''
                                                }
                                                loading="lazy"
                                                width={304}
                                                height={350}
                                                alt={name}
                                            />
                                        </LazyLoad>
                                    )}
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
                            onClick={(e) => {
                                e.preventDefault();
                                handleProductClick(
                                    e,
                                    skuCode,
                                    currentColor.hex
                                );
                            }}
                        >
                            {name}
                        </NavLink>
                    </h2>
                    <fieldset className="product-card__color-checkboxes">
                        {sortedColorDto.map((color, index) => {
                            const { name, id, quantityStatus } = color;
                            return (
                                <label
                                    className="product-card__checkbox-label"
                                    key={`color-label-${skuCode}-${id}`}
                                >
                                    <input
                                        className="product-card__color-checkbox"
                                        type="radio"
                                        name={`${name}-${skuCode}`}
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
                                        style={{
                                            backgroundColor: `${id}`,
                                        }}
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
