import './ProductImagesSlider.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';

import nextId from 'react-id-generator';
import { useState } from 'react';
import productImages from '../../../../assets/images/product-page';

type Props = {
    setlargePhotoActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProductImagesSlider = (props: Props) => {
    const { setlargePhotoActive } = props;

    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div className="product-images">
            <div className="product-images__main-image">
                <Swiper
                    thumbs={{ swiper: thumbsSwiper }}
                    loop
                    navigation
                    modules={[Navigation, Thumbs]}
                    grabCursor
                    className="product-images__slider"
                >
                    {productImages.map((image) => (
                        <SwiperSlide
                            key={nextId('swiper-image')}
                            onClick={() => setlargePhotoActive(true)}
                        >
                            <img src={image} alt="Slider images" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop
                    spaceBetween={10}
                    slidesPerView={4}
                    modules={[Navigation, Thumbs]}
                    className="product-images__slider-thumbs"
                >
                    {productImages.map((image, index) => (
                        <SwiperSlide
                            key={nextId('swiper-image')}
                            className={`${
                                activeIndex === index
                                    ? 'swiper-slide-thumb-active'
                                    : ''
                            }`}
                        >
                            <div className="product-images__slider-thumbs-wrapper">
                                <img src={image} alt="Slider images" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductImagesSlider;
