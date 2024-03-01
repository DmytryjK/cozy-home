import { useEffect, useState, useRef, RefObject } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Navigation } from 'swiper';
import productPageSprite from '../../../../../assets/icons/product-page/product-pageSprite.svg';
import { ResponseData } from '../ProductImagesSlider';
import './EnlargedPhoto.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

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
    const test = useRef<HTMLDivElement>(null);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    const closeSlider = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
            !target.closest('.swiper-slide') &&
            !target.closest('.enlarged-block__content_header_sliderCounter') &&
            !target.closest('.swiper-button-next') &&
            !target.closest('.swiper-button-prev')
        ) {
            setLargePhotoActive(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        test.current?.addEventListener('click', closeSlider);

        return () => {
            test.current?.removeEventListener('click', closeSlider);
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
                className="product-images__enlarged_slider"
            >
                {popUpImages?.map((popUpImage) => (
                    <SwiperSlide key={popUpImage.id}>
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
        <div className="enlarged-block" ref={test}>
            <div className="enlarged-block__content">
                <div className="enlarged-block__content_header">
                    <div className="enlarged-block__content_header_sliderCounter">
                        <p>{`${activeIndex + 1}/${popUpImages?.length}`}</p>
                    </div>

                    <button
                        type="button"
                        className="enlarged-block__content_header_close"
                        aria-label="закрити"
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
