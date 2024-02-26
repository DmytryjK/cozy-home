import { useEffect, useRef, useState, memo } from 'react';
import { motion } from 'framer-motion';
import nextId from 'react-id-generator';
import { useAppSelector } from '../../../../../hooks/hooks';
import headerSprite from '../../../../../assets/icons/header/header-sprite.svg';
import renderServerData from '../../../../../helpers/renderServerData';
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
    const MAX_SHOW_CATEGORIES = 2;

    const { loading, error, data } = useAppSelector((state) => state.search);
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

    const splitPhrase = (productName: string) => {
        const regex = new RegExp(searchValue, 'i');
        const parts = productName.split(regex);
        const result: string[] = [];
        for (let i = 0; i < parts.length - 1; i += 1) {
            result.push(parts[i].replace(' ', '\u00A0'));
            result.push(searchValue.replace(' ', '\u00A0'));
        }
        result.push(parts[parts.length - 1].replace(' ', '\u00A0'));
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
                                    searchValue ? (
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
                                <a
                                    className="searchBlock__product-link"
                                    href={`/product/${skuCode}${colorHex}`}
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
                                            {price} UAH
                                        </span>
                                        {priceWithDiscount ? (
                                            <span className="searchBlock__product-price_discount">
                                                {priceWithDiscount} UAH
                                            </span>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
                <h3 className="searchBlock__title-second">Категорії товарів</h3>
                <ul className="searchBlock__list searchBlock__list_categories">
                    {data.categories.map((category, index) => {
                        const { countOfProducts, id, name } = category;
                        return index < MAX_SHOW_CATEGORIES ? (
                            <li
                                key={`searched-categories-${name}-${id}`}
                                className="searchBlock__category-item"
                            >
                                <a
                                    className="searchBlock__category-link"
                                    href={`/catalog/${name}`}
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
                                </a>
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
                                return index >= MAX_SHOW_CATEGORIES ? (
                                    <li
                                        key={`searched-categories-${name}-${id}`}
                                        className="searchBlock__category-item"
                                    >
                                        <a
                                            className="searchBlock__category-link"
                                            href={`/catalog/${name}`}
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
                                        </a>
                                    </li>
                                ) : (
                                    ''
                                );
                            })}
                        </ul>
                    </li>
                    {data.categories.length > 2 ? (
                        <button
                            className="searchBlock__list-toggle-btn"
                            type="button"
                            onClick={handleToggleList}
                        >
                            {isCategoriesListOpened
                                ? 'Менше категорій'
                                : 'Більше категорій'}
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
