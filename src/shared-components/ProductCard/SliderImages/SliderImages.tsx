import { useState, useEffect, useRef, memo } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import nextId from 'react-id-generator';
import type swiper from 'swiper';
import { useAppDispatch } from '../../../hooks/hooks';
import {
    updateProductColor,
    updateProductSku,
} from '../../../store/reducers/productInformationSlice';
import 'swiper/css';
import 'swiper/css/pagination';
import Loader from '../../Loader';
import ErrorMessage from '../../ErrorMessage';
import imageNotFound from '../../../assets/images/error-images/image-not-found_small.png';
import {
    Loading,
    ProductCardType,
    ColorDtoList,
    ImageDtoList,
} from '../../../types/types';
import { API_BASE } from '../../../utils/API_BASE';

type TSwiper = swiper & {
    slides: {
        swiperSlideSize: number;
    }[];
};

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
    currentColor: { name: string; hex: string; quantityStatus: string };
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
    const cardSliderRef = useRef<TSwiper>();
    const {
        productData,
        imagesData,
        setImagesData,
        currentColor,
        setCurrentColor,
    } = props;
    const { skuCode, name, shortDescription, colorDtoList, imageDtoList } =
        productData;

    const [currentIndexColor, setCurrentIndexColor] = useState<number>(0);
    const [isColorChosen, setIsColorChosen] = useState(false);
    const uniqIdForInputName = nextId('color-');

    const [imageSrc, setImageSrc] = useState<string>('');
    const [loading, setLoading] = useState<Loading>('succeeded');
    const [error, setError] = useState<unknown | null>(null);

    const dispatch = useAppDispatch();

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

    const handleSlideChange = (
        color: string,
        index: number,
        id: string,
        quantityStatus: string
    ) => {
        setCurrentColor({ name: color, hex: id, quantityStatus });
        setIsColorChosen(true);
        setCurrentIndexColor(index);

        if (cardSliderRef?.current) {
            cardSliderRef.current.slideTo(index);
        }

        async function fetchData() {
            try {
                setImageSrc('');
                setLoading('idle');

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

                setLoading('pending');
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
        let result: JSX.Element = <Loader />;
        if (error || loading === 'succeeded') {
            result = (
                <img
                    className="product-card__image"
                    src={imagesData[index] ? imagesData[index].imageSrc : ''}
                    alt={name}
                />
            );
        }
        return result;
    };

    const handleLinkClick = () => {
        localStorage.setItem('productSkuCode', skuCode);
        localStorage.setItem(
            'currentColor',
            JSON.stringify({
                hex: currentColor.hex,
                colorName: currentColor.name,
                colorStatus: '',
            })
        );
        dispatch(updateProductSku(skuCode));
        dispatch(
            updateProductColor({
                name: currentColor.name,
                id: currentColor.hex,
                quantityStatus: '',
            })
        );
    };

    return (
        <>
            <NavLink
                className="product-card__slider-link"
                to={`/product/${skuCode}${currentColor.hex}`}
                onMouseDown={handleLinkClick}
            >
                <Swiper
                    className="product-card__slider"
                    slidesPerView={1}
                    allowTouchMove={false}
                    onSwiper={(swiper) => {
                        cardSliderRef.current = swiper as TSwiper;
                    }}
                    onSlideChange={(swiper) => {
                        colorDtoSort.forEach((item, index) => {
                            if (swiper.activeIndex === index) {
                                const { name, id, quantityStatus } = item;
                                setCurrentColor({
                                    name,
                                    hex: id,
                                    quantityStatus,
                                });
                            }
                        });
                        setIsColorChosen(true);
                    }}
                >
                    {colorDtoSort.length === 0 && (
                        <SwiperSlide>
                            <div className="product-card__image-wrapper">
                                <img
                                    className="product-card__image"
                                    src={imageNotFound}
                                    alt={name}
                                />
                            </div>
                        </SwiperSlide>
                    )}
                    {colorDtoSort.map((color, index) => {
                        return (
                            <SwiperSlide
                                key={`slider-image-${skuCode} ${color.id}`}
                            >
                                <div className="product-card__image-wrapper">
                                    {renderedImage(name, index)}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </NavLink>
            <div className="product-card__content swiper-no-swiping">
                <div className="product-card__content-top">
                    <h2 className="product-card__title">
                        <NavLink
                            className="product-card__title-link"
                            to={`/product/${skuCode}${currentColor.hex}`}
                            // reloadDocument
                            onMouseDown={handleLinkClick}
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
