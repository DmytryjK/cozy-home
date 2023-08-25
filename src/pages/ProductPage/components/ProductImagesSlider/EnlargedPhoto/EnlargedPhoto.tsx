import './EnlargedPhoto.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Navigation } from 'swiper';
import nextId from 'react-id-generator';
import { useEffect } from 'react';
import productPageSprite from '../../../../../assets/icons/product-page/product-pageSprite.svg';
import { useAppSelector } from '../../../../../hooks/hooks';

type Props = {
    setLargePhotoActive: React.Dispatch<React.SetStateAction<boolean>>;
    largePhotoActive: boolean;
    handleSecondSwiper: (swiper: any) => void;
    firstSwiper: null;
    handleSlideChange: (swiper: any) => void;
    activeIndex: number;
};

const EnlargedPhoto = (props: Props) => {
    const {
        setLargePhotoActive,
        largePhotoActive,
        handleSecondSwiper,
        firstSwiper,
        activeIndex,
        handleSlideChange,
    } = props;
    const { images } = useAppSelector(
        (state) => state.productInformation.productInfo
    );

    useEffect(() => {
        if (largePhotoActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }

        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [largePhotoActive]);

    const renderSlider = () => {
        if (images.length === 0) return null;
        return (
            <Swiper
                navigation
                modules={[Navigation, Controller]}
                onSwiper={handleSecondSwiper}
                onSlideChange={handleSlideChange}
                controller={{ control: firstSwiper }}
                grabCursor
                className="product-images__enlarged_slider"
            >
                {images.map((image) => (
                    <SwiperSlide key={nextId('swiper-enlarged-image')}>
                        <img
                            src={image.desktopImagePath}
                            alt="Enlarged slider images"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    };

    return (
        <div className="block-wrapper">
            <div className="enlarged-block">
                <div className="enlarged-block__content">
                    <div className="enlarged-block__content_header">
                        <div className="enlarged-block__content_header_sliderCounter">
                            <p>{`${activeIndex + 1}/${images.length}`}</p>
                        </div>
                        <button
                            type="button"
                            className="enlarged-block__content_header_close"
                            onClick={() => setLargePhotoActive(false)}
                        >
                            <svg width="40" height="40">
                                <use href={`${productPageSprite}#close-icon`} />
                            </svg>
                        </button>
                    </div>
                    {renderSlider()}
                </div>
            </div>
        </div>
    );
};

export default EnlargedPhoto;
