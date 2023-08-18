import './ProductImagesSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, FreeMode } from 'swiper';

import nextId from 'react-id-generator';
import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/hooks';

type Props = {
    setlargePhotoActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductImagesSlider = (props: Props) => {
    const { setlargePhotoActive } = props;
    const { images } = useAppSelector(
        (state) => state.productInformation.productInfo
    );

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

    const renderSlider = () => {
        if (images.length === 0) return null;
        return (
            <div className="product-images">
                <div className="product-images__main-image">
                    <Swiper
                        loop
                        spaceBetween={10}
                        navigation
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="product-images__slider"
                    >
                        {images.map((image) => (
                            <SwiperSlide
                                key={nextId('swiper-image')}
                                onClick={() => setlargePhotoActive(true)}
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
                        loop
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode
                        watchSlidesProgress
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="product-images__slider-thumbs"
                    >
                        {images.map((image) => (
                            <SwiperSlide key={nextId('swiper-image')}>
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
        );
    };

    return <>{renderSlider()}</>;
};

export default ProductImagesSlider;
