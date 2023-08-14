import './EnlargedPhoto.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper';
import nextId from 'react-id-generator';
import { useEffect } from 'react';
import productPageSprite from '../../../../../assets/icons/product-page/product-pageSprite.svg';
import productImages from '../../../../../assets/images/product-page';

type Props = {
    setlargePhotoActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const EnlargedPhoto = (props: Props) => {
    const { setlargePhotoActive } = props;

    const handleKeyPress = (e: any) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            setlargePhotoActive(false);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="block-wrapper">
            <div className="enlarged-block">
                <div className="enlarged-block__content">
                    <div className="enlarged-block__content_header">
                        <div className="enlarged-block__content_header_sliderCounter">
                            <p>1/{productImages.length}</p>
                        </div>
                        <button
                            type="button"
                            className="enlarged-block__content_header_close"
                            onClick={() => setlargePhotoActive(false)}
                        >
                            <svg width="40" height="40">
                                <use href={`${productPageSprite}#close-icon`} />
                            </svg>
                        </button>
                    </div>
                    <Swiper
                        loop
                        navigation
                        modules={[Navigation, Thumbs]}
                        grabCursor
                        className="product-images__enlarged_slider"
                    >
                        {productImages.map((image) => (
                            <SwiperSlide
                                key={nextId('swiper-enlarged-image')}
                                onClick={() => setlargePhotoActive(true)}
                            >
                                <img src={image} alt="Enlarged slider images" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default EnlargedPhoto;
