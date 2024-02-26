import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../../hooks/hooks';
import {
    fetchResultsBySearchValue,
    resetSearch,
} from '../../../store/reducers/searchSlice';
import debounce from '../../../utils/debounce';
import SearchBlock from './components/SearchBlock/SearchBlock';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';
import './Search.scss';

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    isMobileSearchOpen: boolean;
    setIsMobileSearchOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Search = (props: Props) => {
    const { setIsOpen, isOpen, isMobileSearchOpen, setIsMobileSearchOpen } =
        props;
    const desktopSearchInput = useRef<HTMLInputElement>(null);
    const [searchValue, setSearchValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isSearchFocus, setIsSearchFocus] = useState(false);
    const dispatch = useAppDispatch();

    const searchRequest = useCallback(
        debounce((inputValue) => {
            if (inputValue) {
                dispatch(fetchResultsBySearchValue(inputValue));
                setSearchValue(inputValue);
                setIsOpen(true);
                setIsMobileSearchOpen(true);
            }
        }, 500),
        []
    );

    const handleResetSearch = () => {
        dispatch(resetSearch());
        setSearchValue('');
        setInputValue('');
    };

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                dispatch(resetSearch());
            }, 300);
            setSearchValue('');
            setIsSearchFocus(false);
            desktopSearchInput.current?.blur();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isSearchFocus) {
            setIsOpen(true);
            if (inputValue) {
                searchRequest(inputValue);
            } else if (!isMobileSearchOpen) {
                handleResetSearch();
            }
        }
    }, [isSearchFocus, inputValue]);

    return (
        <>
            <div
                className={`header__search ${
                    isMobileSearchOpen ? 'mobile-active' : ''
                }`}
            >
                <div
                    className={`header__search-wrapper ${
                        isMobileSearchOpen ? 'mobile-active' : ''
                    }`}
                >
                    <svg className="header__search_icon" width="27" height="27">
                        <use href={`${headerSprite}#search-icon-header`} />
                    </svg>
                    <label>
                        <input
                            ref={desktopSearchInput}
                            type="text"
                            placeholder="Пошук"
                            className="header__search_input"
                            value={inputValue}
                            onFocus={() => setIsSearchFocus(true)}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </label>
                    <button
                        className={`header__search_clear-btn ${
                            inputValue ? 'active' : ''
                        }`}
                        type="button"
                        aria-label="очистити пошук"
                        onClick={handleResetSearch}
                    >
                        <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.474969 0.0794034C0.583625 -0.0264678 0.759791 -0.0264678 0.868446 0.0794034L9.91842 8.89746C10.0271 9.00333 10.0271 9.17498 9.91842 9.28085L9.52495 9.66425C9.41629 9.77012 9.24013 9.77012 9.13147 9.66425L0.0814917 0.846191C-0.027164 0.740319 -0.0271638 0.568668 0.0814919 0.462797L0.474969 0.0794034Z"
                                fill="#A3A3A3"
                            />
                            <path
                                d="M0.0815759 9.5372C-0.0270798 9.43133 -0.0270798 9.25968 0.0815759 9.15381L9.13155 0.335754C9.24021 0.229883 9.41638 0.229883 9.52503 0.335754L9.91851 0.719148C10.0272 0.825019 10.0272 0.99667 9.91851 1.10254L0.86853 9.9206C0.759875 10.0265 0.583709 10.0265 0.475053 9.9206L0.0815759 9.5372Z"
                                fill="#A3A3A3"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            <SearchBlock
                setIsOpen={setIsOpen}
                searchValue={searchValue}
                inputValue={inputValue}
                setInputValue={setInputValue}
                setIsMobileSearchOpen={setIsMobileSearchOpen}
                isMobileSearchOpen={isMobileSearchOpen}
                setIsSearchFocus={setIsSearchFocus}
            />
            <motion.div
                initial={{ opacity: 0, display: 'none' }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    display: 'block',
                    transitionEnd: {
                        display: !isOpen ? 'none' : 'block',
                    },
                    transition: {
                        duration: 0.3,
                        ease: 'easeOut',
                    },
                }}
                className="header__search-shadow"
                onClick={() => {
                    setIsOpen(false);
                    setIsMobileSearchOpen(false);
                }}
            />
        </>
    );
};

export default Search;
