import { useEffect, useRef, useState, memo, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import nextId from 'react-id-generator';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/hooks';
import headerSprite from '../../../../../assets/icons/header/header-sprite.svg';
import renderServerData from '../../../../../helpers/renderServerData';
import addSpaceToPrice from '../../../../../utils/addSpaceToPrice';
import transliterate from '../../../../../utils/transliterate';
import {
    fetchProductInfoByScuWithColor,
    updateProductSku,
    updateProductColor,
} from '../../../../../store/reducers/productInformationSlice';
import type { ProductInformationType } from '../../../../../types/types';

import './SearchBlock.scss';

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    searchValue: string;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
    setIsMobileSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isMobileSearchOpen: boolean;
    setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBlock = (props: Props) => {
    const MAX_SHOW_CATEGORIES = 2;
    const {
        setIsOpen,
        searchValue,
        inputValue,
        setInputValue,
        setIsMobileSearchOpen,
        isMobileSearchOpen,
        setIsSearchFocus,
    } = props;
    const [isCategoriesListOpened, setIsCategoriesListOpened] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isLinkClicked, setIsLinkClicked] = useState<{
        sku: string;
        color: string;
        isClicked: boolean;
    }>({ sku: '', color: '', isClicked: false });

    const { loading, error, data } = useAppSelector((state) => state.search);
    const productPageLoading = useAppSelector(
        (state) => state.productInformation.loading
    );
    const productPageSku = useAppSelector(
        (state) => state.productInformation.currentSku
    );
    const productPageHex = useAppSelector(
        (state) => state.productInformation.currentColor
    );
    const productPageCategoryName = useAppSelector(
        (state) => state.productInformation.productInfo.categoryName
    );
    const productCategoryId = useAppSelector(
        (state) => state.productInformation.productInfo.parentCategoryId
    );
    const productPageName = useAppSelector(
        (state) => state.productInformation.productInfo.name
    );
    const toggleList = useRef<HTMLUListElement>(null);
    const searchedItems = useRef<HTMLDivElement>(null);

    const handleToggleList = () => {
        setIsCategoriesListOpened(!isCategoriesListOpened);
    };

    const autoCalculateHeightOfItem = (item: React.RefObject<any>) => {
        const currentHeight = `${item.current?.scrollHeight}px`;
        item.current?.style.setProperty('--list-height', currentHeight);
    };

    useEffect(() => {
        autoCalculateHeightOfItem(toggleList);
    }, []);

    const handleProductClick = async (
        e: MouseEvent<HTMLAnchorElement>,
        sku: string,
        hex: string
    ) => {
        e.preventDefault();
        setIsLinkClicked({ sku, color: hex, isClicked: true });

        if (
            productPageLoading === 'pending' &&
            isLinkClicked.isClicked &&
            isLinkClicked.sku === productPageSku
        ) {
            return;
        }

        try {
            if (
                !productPageSku ||
                productPageSku !== sku ||
                productPageHex?.id !== hex
            ) {
                const response = await dispatch(
                    fetchProductInfoByScuWithColor({
                        productSkuCode: sku || '',
                        colorHex: `${hex}`,
                    })
                );
                if (!response.payload) {
                    throw new Error('some error');
                }

                const { categoryName, parentCategoryId, colors, name } =
                    response.payload as ProductInformationType;
                const colorName = colors.filter((color) => {
                    return color.id === hex;
                });
                const translitCategName = transliterate(categoryName);
                const translitProdName = transliterate(name);
                const translitColorName = transliterate(colorName[0].name);

                dispatch(updateProductSku(sku));
                dispatch(
                    updateProductColor({
                        name: colorName[0].name,
                        id: colorName[0].id,
                        quantityStatus: colorName[0].quantityStatus,
                    })
                );
                const redirectUrl = `/catalog/${translitCategName}&categoryId=${parentCategoryId}/product?name=${translitProdName}&color=${translitColorName}&sku=${sku}&hex=${hex.replace(
                    '#',
                    ''
                )}`;
                setIsLinkClicked({ sku, color: hex, isClicked: false });
                setIsOpen(false);
                setIsMobileSearchOpen(false);
                navigate(redirectUrl);
            } else if (productPageHex) {
                const redirectUrl = `/catalog/${transliterate(
                    productPageCategoryName
                )}&categoryId=${productCategoryId}/product?name=${transliterate(
                    productPageName
                )}&color=${transliterate(
                    productPageHex.name
                )}&sku=${sku}&hex=${hex.replace('#', '')}`;
                setIsOpen(false);
                setIsMobileSearchOpen(false);
                navigate(redirectUrl);
            }
        } catch (error: any) {
            setIsLinkClicked({ sku, color: hex, isClicked: false });
        }
    };

    const splitPhrase = (productName: string) => {
        const regex = new RegExp(searchValue, 'i');
        const parts = productName.split(regex);
        let result: string[] = [];
        for (let i = 0; i < parts.length - 1; i += 1) {
            result.push(parts[i].replace(' ', '\u00A0'));
            result.push(searchValue.replace(' ', '\u00A0'));
        }
        result.push(parts[parts.length - 1].replace(' ', '\u00A0'));
        result = result.map((item) => item.toLowerCase());
        return result;
    };

    const searchedResults = () => {
        if (!data) {
            return <span />;
        }

        if (data.categories.length < 1 && data.products.length < 1) {
            return (
                <span>
                    За результатом пошуку "{searchValue}" нічого не знайдено
                </span>
            );
        }
        return (
            <motion.div
                initial={{ opacity: 0, display: 'none' }}
                animate={{
                    opacity: loading === 'succeeded' ? 1 : 0,
                    display: 'block',
                    transitionEnd: {
                        display: loading !== 'succeeded' ? 'none' : 'block',
                    },
                    transition: {
                        duration: 0.4,
                        ease: 'easeOut',
                    },
                }}
                ref={searchedItems}
            >
                <h3 className="searchBlock__title">Товари</h3>
                <ul className="searchBlock__list searchBlock__list_products">
                    {data.products.map((product) => {
                        const {
                            skuCode,
                            colorHex,
                            imagePath,
                            name,
                            price,
                            priceWithDiscount,
                        } = product;
                        const splittedPhrase = splitPhrase(name);
                        const splittedTitleBySearchWord = () => {
                            return splittedPhrase.map((item) => {
                                return item.replace('\u00A0', ' ') ===
                                    searchValue.toLowerCase() ? (
                                    <span
                                        key={nextId('splitted-text_search')}
                                        className="searchBlock__product-title_search"
                                    >
                                        {item}
                                    </span>
                                ) : (
                                    <span key={nextId('splitted-text')}>
                                        {item}
                                    </span>
                                );
                            });
                        };
                        return (
                            <li
                                className="searchBlock__product-item"
                                key={`searched-product-${skuCode}-${colorHex}`}
                            >
                                {productPageLoading === 'pending' &&
                                isLinkClicked.isClicked &&
                                isLinkClicked.sku === skuCode ? (
                                    <div className="preload-page">
                                        <span className="loading-dots">
                                            <span className="loading-dot" />
                                            <span className="loading-dot" />
                                            <span className="loading-dot" />
                                        </span>
                                    </div>
                                ) : (
                                    ''
                                )}
                                <NavLink
                                    className="searchBlock__product-link"
                                    to={`/prefetch/${skuCode}/${colorHex.replace(
                                        '#',
                                        ''
                                    )}`}
                                    onClick={(e) => {
                                        handleProductClick(
                                            e,
                                            skuCode,
                                            colorHex
                                        );
                                    }}
                                >
                                    <img
                                        className="searchBlock__product-img"
                                        src={imagePath}
                                        alt={name}
                                    />
                                    <h4 className="searchBlock__product-title">
                                        {splittedTitleBySearchWord()}
                                    </h4>
                                    <div className="searchBlock__product-price-wrapper">
                                        <span className="searchBlock__product-price">
                                            {addSpaceToPrice(price)} UAH
                                        </span>
                                        {priceWithDiscount ? (
                                            <span className="searchBlock__product-price_discount">
                                                {addSpaceToPrice(
                                                    priceWithDiscount
                                                )}{' '}
                                                UAH
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <h3 className="searchBlock__title-second">Категорії товарів</h3>
                <ul className="searchBlock__list searchBlock__list_categories">
                    {data.categories.map((category, index) => {
                        const { countOfProducts, id, name } = category;
                        const transliteratedName = transliterate(name);
                        return index < MAX_SHOW_CATEGORIES ? (
                            <li
                                key={`searched-categories-${name}-${id}`}
                                className="searchBlock__category-item"
                            >
                                <NavLink
                                    className="searchBlock__category-link"
                                    to={`/catalog/${transliteratedName}&categoryId=${id}?search=${searchValue}`}
                                    onClick={(e) => {
                                        setIsOpen(false);
                                        setIsMobileSearchOpen(false);
                                    }}
                                >
                                    <div className="searchBlock__category-text">
                                        <span>Дивитись </span>
                                        <span className="searchBlock__category-text_search">
                                            "{searchValue}"
                                        </span>
                                        <span> в категорії </span>
                                        <span className="searchBlock__category-text_second">
                                            {name}
                                        </span>
                                    </div>
                                    <span className="searchBlock__category-quantity">
                                        ({countOfProducts})
                                    </span>
                                </NavLink>
                            </li>
                        ) : (
                            ''
                        );
                    })}
                    <li className="searchBlock__category-item">
                        <ul
                            className={`searchBlock__list-category-inner ${
                                isCategoriesListOpened ? 'active' : ''
                            }`}
                            ref={toggleList}
                        >
                            {data.categories.map((category, index) => {
                                const { countOfProducts, id, name } = category;
                                const transliteratedName = transliterate(name);
                                return index >= MAX_SHOW_CATEGORIES ? (
                                    <li
                                        key={`searched-categories-${name}-${id}`}
                                        className="searchBlock__category-item"
                                    >
                                        <NavLink
                                            className="searchBlock__category-link"
                                            to={`/catalog/${transliteratedName}&categoryId=${id}?search=${searchValue}`}
                                            onClick={() => {
                                                setIsOpen(false);
                                                setIsMobileSearchOpen(false);
                                            }}
                                        >
                                            <div className="searchBlock__category-text">
                                                <span>Дивитись </span>
                                                <span className="searchBlock__category-text_search">
                                                    "{searchValue}"
                                                </span>
                                                <span> в категорії </span>
                                                <span className="searchBlock__category-text_second">
                                                    {name}
                                                </span>
                                            </div>
                                            <span className="searchBlock__category-quantity">
                                                ({countOfProducts})
                                            </span>
                                        </NavLink>
                                    </li>
                                ) : (
                                    ''
                                );
                            })}
                        </ul>
                    </li>
                    {data.categories.length > MAX_SHOW_CATEGORIES ? (
                        <button
                            className="searchBlock__list-toggle-btn"
                            type="button"
                            onClick={handleToggleList}
                        >
                            {isCategoriesListOpened
                                ? 'Показати менше категорій'
                                : 'Показати більше категорій'}
                        </button>
                    ) : (
                        ''
                    )}
                </ul>
            </motion.div>
        );
    };

    return (
        <motion.div
            className={`searchBlock ${
                inputValue && searchValue ? 'searchBlock-active' : ''
            }`}
            initial={{ opacity: 0, display: 'none' }}
            animate={{
                opacity: searchValue || isMobileSearchOpen ? 1 : 0,
                display: 'block',
                transitionEnd: {
                    display:
                        !searchValue && !isMobileSearchOpen ? 'none' : 'block',
                },
                transition: {
                    duration: 0.3,
                    ease: 'easeOut',
                },
            }}
            data-lenis-prevent
            data-lenis-prevent-wheel
            data-lenis-prevent-touch
        >
            <label className="searchBlock__block-label">
                <svg
                    className="searchBlock__block_searchIcon"
                    width="21"
                    height="21"
                >
                    <use href={`${headerSprite}#search-icon`} />
                </svg>
                <input
                    type="text"
                    placeholder="Пошук"
                    className="searchBlock__block_input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setIsSearchFocus(true)}
                />
                <button
                    type="button"
                    className="searchBlock__block_closeIcon"
                    aria-label="Close search"
                    onClick={() => {
                        setIsOpen(false);
                        setIsMobileSearchOpen(false);
                    }}
                >
                    <svg width="12" height="12">
                        <use href={`${headerSprite}#close-icon`} />
                    </svg>
                </button>
            </label>
            <div className="searchBlock__content-wrapper">
                {searchValue && inputValue
                    ? renderServerData({
                          error,
                          loading,
                          content: searchedResults,
                      })
                    : null}
            </div>
        </motion.div>
    );
};

export default memo(SearchBlock);
