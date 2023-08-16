/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './test.scss';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper';
import nextId from 'react-id-generator';
import { useAppSelector } from '../../../../hooks/hooks';

export default function Test() {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const { images } = useAppSelector(
        (state) => state.productInformation.productInfo
    );

    // const images = [
    //     'https://swiperjs.com/demos/images/nature-1.jpg',
    //     'https://swiperjs.com/demos/images/nature-2.jpg',
    //     'https://swiperjs.com/demos/images/nature-3.jpg',
    //     'https://swiperjs.com/demos/images/nature-4.jpg',
    //     'https://swiperjs.com/demos/images/nature-5.jpg',
    //     'https://swiperjs.com/demos/images/nature-6.jpg',
    // ];

    const renderSlider = () => {
        if (images.length === 0) return null;
        return (
            <>
                <Swiper
                    loop
                    spaceBetween={10}
                    navigation
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper2"
                >
                    {images.map((image) => (
                        <SwiperSlide
                            key={nextId('swiper-image')}
                            // onClick={() => setlargePhotoActive(true)}
                        >
                            <img
                                src={image.sliderImagePath}
                                alt="Slider images"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode
                    watchSlidesProgress
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                >
                    {images.map((image) => (
                        <SwiperSlide
                            key={nextId('swiper-image')}
                            // onClick={() => setlargePhotoActive(true)}
                        >
                            <img
                                src={image.sliderImagePath}
                                alt="Slider images"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        );
    };

    return <>{renderSlider()}</>;
}
