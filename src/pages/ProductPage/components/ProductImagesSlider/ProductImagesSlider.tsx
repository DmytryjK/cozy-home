import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Controller } from 'swiper';
import nextId from 'react-id-generator';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import EnlargedPhoto from './EnlargedPhoto/EnlargedPhoto';
import FullScreenLoader from '../../../../shared-components/FullScreenLoader/FullScreenLoader';
import Loader from '../../../../shared-components/Loader';
import { API_BASE } from '../../../../utils/API_BASE';
import './ProductImagesSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export interface ResponseData {
    id: string;
    desktopPopUpImagePath: string;
    mobilePopUpImagePath: string;
}

type Props = {
    colorChange: boolean;
};

const ProductImagesSlider = ({ colorChange }: Props) => {
    const { skuCode } = useAppSelector(
        (state) => state.productInformation.productInfo
    );

    const currentColor = useAppSelector(
        (state) => state.productInformation.currentColor
    );

    const imagesFromStore = useAppSelector(
        (state) => state.productInformation.productInfo.images
    );

    const [popUpImages, setPopUpImages] = useState<ResponseData[] | null>([]);
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [largePhotoActive, setLargePhotoActive] = useState<boolean>(false);
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [isPopUpLoading, setIsPopUpLoading] = useState(false);

    const handleSliderClick = async (index: number) => {
        setIsPopUpLoading(true);
        try {
            const requestBody = {
                productSkuCode: skuCode,
                colorHex: currentColor?.id,
            };

            const response = await fetch(`${API_BASE}image/popup-image`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error('Request failed');
            }

            const data: ResponseData[] = await response.json();
            setPopUpImages(data);

            setActiveIndex(index);
            setLargePhotoActive(true);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsPopUpLoading(false);
        }
    };

    const swiperRef = useRef<any>(null);

    useEffect(() => {
        if (swiperRef.current) {
            const { swiper } = swiperRef.current;
            swiper?.slideTo(0);
            setActiveIndex(0);
        }
    }, [currentColor, imagesFromStore]);

    const handleFirstSwiper = (swiper: any) => {
        setFirstSwiper(swiper);
    };

    const handleSecondSwiper = (swiper: any) => {
        setSecondSwiper(swiper);
    };

    const handleSlideChange = (swiper: any) => {
        setActiveIndex(swiper.activeIndex);
    };

    const renderSlider = () => {
        return (
            <>
                {isPopUpLoading && <FullScreenLoader />}
                <div className="product-images">
                    <div className="product-images__main-image">
                        {colorChange && (
                            <Loader className="slider-image__loader" />
                        )}
                        <Swiper
                            ref={swiperRef}
                            spaceBetween={10}
                            navigation
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Navigation, Thumbs, Controller]}
                            onSwiper={handleFirstSwiper}
                            controller={{ control: secondSwiper }}
                            className="product-images__slider"
                        >
                            {imagesFromStore &&
                                imagesFromStore.map((image, index) => (
                                    <SwiperSlide
                                        key={nextId('swiper-image')}
                                        onClick={() => handleSliderClick(index)}
                                    >
                                        <img
                                            src={image.desktopImagePath}
                                            alt="Slider images"
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={10}
                            slidesPerView={4}
                            watchSlidesProgress
                            modules={[Navigation, Thumbs]}
                            className="product-images__slider-thumbs"
                        >
                            {imagesFromStore &&
                                imagesFromStore.map((image, index) => (
                                    <SwiperSlide
                                        key={nextId('swiper-image')}
                                        className={
                                            activeIndex === index
                                                ? 'swiper-slide-thumb-active'
                                                : ''
                                        }
                                    >
                                        <div className="product-images__slider-thumbs-wrapper">
                                            <img
                                                src={image.sliderImagePath}
                                                alt="Slider images"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>

                {largePhotoActive && (
                    <EnlargedPhoto
                        setLargePhotoActive={setLargePhotoActive}
                        largePhotoActive={largePhotoActive}
                        handleSecondSwiper={handleSecondSwiper}
                        firstSwiper={firstSwiper}
                        activeIndex={activeIndex}
                        handleSlideChange={handleSlideChange}
                        popUpImages={popUpImages}
                    />
                )}
            </>
        );
    };

    return <>{renderSlider()}</>;
};

export default ProductImagesSlider;
