import './ProductImagesSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Controller } from 'swiper';

import nextId from 'react-id-generator';
import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';
import EnlargedPhoto from './EnlargedPhoto/EnlargedPhoto';

const ProductImagesSlider = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [largePhotoActive, setLargePhotoActive] = useState<boolean>(false);
    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const { images } = useAppSelector(
        (state) => state.productInformation.productInfo
    );

    const handleSlideClick = (index: number) => {
        setActiveIndex(index);
        setLargePhotoActive(true);
    };

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
        if (images.length === 0) return null;
        return (
            <>
                <div className="product-images">
                    <div className="product-images__main-image">
                        <Swiper
                            spaceBetween={10}
                            navigation
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[Navigation, Thumbs, Controller]}
                            onSwiper={handleFirstSwiper}
                            controller={{ control: secondSwiper }}
                            className="product-images__slider"
                        >
                            {images.map((image, index) => (
                                <SwiperSlide
                                    key={nextId('swiper-image')}
                                    onClick={() => handleSlideClick(index)}
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
                            {images.map((image, index) => (
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
                    />
                )}
            </>
        );
    };

    return <>{renderSlider()}</>;
};

export default ProductImagesSlider;
