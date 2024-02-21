import { useState, MouseEvent } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { useAppSelector } from '../../../../hooks/hooks';
import ProductImagesSlider from '../ProductImagesSlider/ProductImagesSlider';
import ProductRating from '../ProductRating/ProductRating';
import ColorSelection from '../ColorSelection/ColorSelection';
import ProductPrice from '../ProductPrice/ProductPrice';
import AddProductBlock from '../AddProductBlock/AddProductBlock';
import Accordeon from '../Accordeon/Accordeon';
import pluralizeUkrainian from '../../../../helpers/pluralizeUkrainian';
import Loader from '../../../../shared-components/Loader';

const ProductInfoContainer = () => {
    const [colorChange, setColorChange] = useState(false);
    const skuCode = useAppSelector(
        (state) => state.productInformation.productInfo.skuCode
    );
    const name = useAppSelector(
        (state) => state.productInformation.productInfo.name
    );
    const countOfReviews = useAppSelector(
        (state) => state.productInformation.productInfo.countOfReviews
    );
    const { loading } = useAppSelector((state) => state.productInformation);

    const lenis = useLenis(({ scroll }) => {
        // called every scroll
    });

    const handleClick = (
        event: MouseEvent<HTMLAnchorElement>,
        anchor: string
    ) => {
        event.preventDefault();
        if (anchor) {
            const scrollToOptions: any = {
                offset: -100,
                lerp: 0.1,
                duration: 1.3,
                easing: (rawValue: number) => rawValue, // Example easing function
                immediate: false,
                lock: false,
                force: false,
            };

            lenis?.scrollTo(anchor, scrollToOptions);
        }
    };

    return (
        <div className="product-page__wrapper container">
            {loading === 'pending' ? (
                <Loader className="product-page__loader" />
            ) : (
                ''
            )}
            <ProductImagesSlider colorChange={colorChange} />
            <div className="product-page-right-content-wrapper">
                <h1 className="product-page__title">{name}</h1>
                <div className="product-page__extra-info">
                    <p className="product-page__sku">{skuCode}</p>
                    <ProductRating />
                    <a
                        className="product-page__feedbacks-link"
                        href="#customer-review"
                        onClick={(event) =>
                            handleClick(event, '#customer-review')
                        }
                    >
                        {pluralizeUkrainian(countOfReviews, [
                            'відгуг',
                            'відгука',
                            'відгуків',
                        ])}
                    </a>
                </div>
                <ColorSelection setColorChange={setColorChange} />
                <ProductPrice />
                <AddProductBlock />
                <Accordeon />
            </div>
        </div>
    );
};

export default ProductInfoContainer;
