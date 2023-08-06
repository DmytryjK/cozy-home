import { useState, useEffect, useRef } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import nextId from 'react-id-generator';
import type swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import Loader from '../../Loader';
import ErrorMessage from '../../ErrorMessage';
import imageNotFound from '../../../assets/images/error-images/image-not-found_small.png';
import { Loading, ProductCardType } from '../../../types/types';
import API_BASE from '../../../utils/API_BASE';

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
};

const SliderImages = (props: Props) => {
    const cardSliderRef = useRef<TSwiper>();
    const { productData, imagesData, setImagesData } = props;
    const { skuCode, name, shortDescription, colorDtoList, imageDtoList } =
        productData;

    const [currentColor, setCurrentColor] = useState<string>('');
    const [currentIndexColor, setCurrentIndexColor] = useState<number>(0);
    const [isColorChosen, setIsColorChosen] = useState(false);
    const uniqIdForInputName = nextId('color-');

    const [imageSrc, setImageSrc] = useState<string>('');
    const [loading, setLoading] = useState<Loading>('succeeded');
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        if (!isColorChosen && imageDtoList.length > 0) {
            setCurrentColor(colorDtoList[0].name);
        }
    }, [isColorChosen, imageDtoList]);

    useEffect(() => {
        setImagesData({
            [currentIndexColor]: {
                imageSrc: imageDtoList[0]?.imagePath || imageNotFound,
            },
        });
    }, [imageDtoList]);

    useEffect(() => {
        if (imageSrc) {
            if (Object.keys(imagesData).length < colorDtoList.length) {
                setImagesData((prev) => ({
                    ...prev,
                    [currentIndexColor]: {
                        imageSrc,
                    },
                }));
            }
        }
    }, [imageSrc, imageDtoList]);

    const handleSlideChange = (color: string, index: number, id: string) => {
        setCurrentColor(color);
        setIsColorChosen(true);
        setCurrentIndexColor(index);

        if (cardSliderRef?.current) {
            cardSliderRef.current.slideTo(index);
        }

        async function fetchData() {
            try {
                setImageSrc('');
                setLoading('idle');

                const response = await fetch(
                    `${API_BASE()}image/product_color`,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            productSkuCode: skuCode,
                            hex: id,
                            preview: true,
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    }
                );

                setLoading('pending');
                const result: ImageSrc = await response.json();

                if (!response.ok) throw new Error('something went wrong');

                setImageSrc(result.imagePath);
                setError(null);
                setLoading('succeeded');
            } catch (errors) {
                setError(errors);
                setLoading('failed');
            }
        }
        if (
            error === null &&
            imagesData &&
            Object.keys(imagesData).length < colorDtoList.length
        )
            fetchData();
    };

    const renderedImage = (name: string, index: number) => {
        let result: JSX.Element = <Loader minHeight="100%" />;
        if (error) {
            result = <ErrorMessage />;
        } else if (loading === 'succeeded') {
            result = (
                <img
                    className="product-card__image"
                    src={
                        imagesData[index]
                            ? imagesData[index].imageSrc
                            : imageNotFound
                    }
                    alt={name}
                />
            );
        }
        return result;
    };

    return (
        <>
            <a className="product-card__slider-link" href={`/${name}`}>
                <Swiper
                    className="product-card__slider"
                    slidesPerView={1}
                    allowTouchMove={false}
                    onSwiper={(swiper) => {
                        cardSliderRef.current = swiper as TSwiper;
                    }}
                    onSlideChange={(swiper) => {
                        colorDtoList.forEach((item, index) => {
                            if (swiper.activeIndex === index) {
                                setCurrentColor(item.name);
                            }
                        });
                        setIsColorChosen(true);
                    }}
                >
                    {colorDtoList.length === 0 && (
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
                    {colorDtoList.map((color, index) => {
                        return (
                            <SwiperSlide key={nextId('productCard-slides')}>
                                <div className="product-card__image-wrapper">
                                    {renderedImage(name, index)}
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </a>
            <div className="product-card__content swiper-no-swiping">
                <div className="product-card__content-top">
                    <h2 className="product-card__title">
                        <a className="product-card__title-link" href="/">
                            {name}
                        </a>
                    </h2>
                    <fieldset className="product-card__color-checkboxes">
                        {colorDtoList.map((color, index) => {
                            const { name, id } = color;
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
                                            currentColor === name ||
                                            (!isColorChosen && index === 0)
                                        }
                                        onChange={() =>
                                            handleSlideChange(name, index, id)
                                        }
                                    />
                                    <span
                                        className="product-card__checked-checkbox"
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

export default SliderImages;
