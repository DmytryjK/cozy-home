import { useState, MouseEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    fetchProductInfoByScuWithColor,
    updateProductSku,
} from '../../../../store/reducers/productInformationSlice';
import ProductImagesSlider from '../ProductImagesSlider/ProductImagesSlider';
import ProductRating from '../ProductRating/ProductRating';
import ColorSelection from '../ColorSelection/ColorSelection';
import ProductPrice from '../ProductPrice/ProductPrice';
import AddProductBlock from '../AddProductBlock/AddProductBlock';
import Accordeon from '../Accordeon/Accordeon';
import pluralizeUkrainian from '../../../../helpers/pluralizeUkrainian';
import renderServerData from '../../../../helpers/renderServerData';
import type { ProductInformationType } from '../../../../types/types';

const ProductInfoContainer = () => {
    const [search, setSearch] = useSearchParams();
    const skuParams = search.get('sku');
    const hexParams = search.get('hex');
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
    const currentColor = useAppSelector(
        (state) => state.productInformation.currentColor
    );
    const currentSku = useAppSelector(
        (state) => state.productInformation.currentSku
    );
    const loading = useAppSelector((state) => state.productInformation.loading);
    const error = useAppSelector((state) => state.productInformation.error);
    const dispatch = useAppDispatch();
    const lenis = useLenis(({ scroll }) => {});
    const variant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.7,
                easing: 'easy-out',
            },
        },
    };

    useEffect(() => {
        if (!skuParams || !hexParams) return;
        dispatch(updateProductSku(skuParams));
        localStorage.setItem('productSkuCode', skuParams || '');
        localStorage.setItem(
            'currentColor',
            JSON.stringify({
                hex: `#${hexParams}`,
            })
        );
        if (
            !skuCode ||
            skuCode !== skuParams ||
            currentColor?.id !== `#${hexParams}`
        ) {
            dispatch(
                fetchProductInfoByScuWithColor({
                    productSkuCode: skuParams,
                    colorHex: `#${hexParams}`,
                })
            );
        }
    }, [skuParams, hexParams]);

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

    const renderData = () => {
        return (
            <motion.div
                className="product-page__wrapper container"
                variants={variant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
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
            </motion.div>
        );
    };

    return (
        <div className="product-page__wrapper container">
            {renderServerData({
                loading,
                error,
                content: renderData,
            })}
            {/* {loading !== 'pending' ? (
                <motion.div
                    className="product-page__wrapper container"
                    variants={variant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
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
                </motion.div>
            ) : (
                ''
            )} */}
        </div>
    );
};

export default ProductInfoContainer;
