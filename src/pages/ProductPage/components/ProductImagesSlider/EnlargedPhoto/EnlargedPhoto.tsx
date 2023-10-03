import './EnlargedPhoto.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Navigation } from 'swiper';
import nextId from 'react-id-generator';
import { useEffect, useState } from 'react';
import productPageSprite from '../../../../../assets/icons/product-page/product-pageSprite.svg';
import { ResponseData } from '../ProductImagesSlider';

type Props = {
    setLargePhotoActive: React.Dispatch<React.SetStateAction<boolean>>;
    largePhotoActive: boolean;
    handleSecondSwiper: (swiper: any) => void;
    firstSwiper: null;
    handleSlideChange: (swiper: any) => void;
    activeIndex: number;
    popUpImages: ResponseData[] | null;
};

const EnlargedPhoto = (props: Props) => {
    const {
        setLargePhotoActive,
        largePhotoActive,
        handleSecondSwiper,
        firstSwiper,
        activeIndex,
        handleSlideChange,
        popUpImages,
    } = props;

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            setLargePhotoActive(false);
        }
    });

    const renderSlider = () => {
        if (popUpImages?.length === 0) return null;
        return (
            <Swiper
                navigation
                slidesPerView={1}
                modules={[Navigation, Controller]}
                onSwiper={handleSecondSwiper}
                onSlideChange={handleSlideChange}
                controller={{ control: firstSwiper }}
                grabCursor
                className="product-images__enlarged_slider"
            >
                {popUpImages?.map((popUpImage) => (
                    <SwiperSlide key={nextId('swiper-enlarged-image')}>
                        <img
                            src={
                                windowWidth > 700
                                    ? popUpImage.desktopPopUpImagePath
                                    : popUpImage.mobilePopUpImagePath
                            }
                            alt="Enlarged slider images"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    };

    return (
        <div className="enlarged-block">
            <div className="enlarged-block__content">
                <div className="enlarged-block__content_header">
                    <div className="enlarged-block__content_header_sliderCounter">
                        <p>{`${activeIndex + 1}/${popUpImages?.length}`}</p>
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
            </div>
            {renderSlider()}
        </div>
    );
};

export default EnlargedPhoto;
