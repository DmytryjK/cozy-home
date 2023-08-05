import { useState, useEffect, FormEvent } from 'react';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogProductsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import './SortProducts.scss';

const SortProducts = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [currentSortOption, setCurrentSortOption] = useState<string>('');

    const closeSelect = (e: any) => {
        if (
            !e.target.closest('.sort__custom-fields') &&
            !e.target.closest('.sort__custom-select')
        ) {
            setIsActive(false);
        }
    };

    useEffect(() => {
        if (isActive) {
            document.addEventListener('click', closeSelect);
        }

        return () => document.removeEventListener('click', closeSelect);
    }, [isActive]);

    const handleChangeInputs = (event: FormEvent<HTMLFieldSetElement>) => {
        const target = event.target as HTMLInputElement;
        setCurrentSortOption(target.value);
    };

    return (
        <div className="main-content__sort sort">
            <div className={`sort__custom-select ${isActive ? 'active' : ''}`}>
                <button
                    className="sort__open-btn"
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                >
                    <span className="btn__text">Сортувати</span>{' '}
                    <span className="btn__current-option">
                        {currentSortOption || 'за популярністю'}
                    </span>
                </button>
                <fieldset
                    className="sort__custom-fields"
                    onChange={handleChangeInputs}
                >
                    <div className="sort__field">
                        <input
                            className="sort__input"
                            id="input-ascending"
                            type="radio"
                            name="sort"
                            value="від дешевих до дорогих"
                        />
                        <label
                            className="sort__label"
                            htmlFor="input-ascending"
                        >
                            від дешевих до дорогих
                        </label>
                    </div>
                    <div className="sort__field">
                        <input
                            className="sort__input"
                            id="input-descending"
                            type="radio"
                            name="sort"
                            value="від дорогих до дешевих"
                        />
                        <label
                            className="sort__label"
                            htmlFor="input-descending"
                        >
                            від дорогих до дешевих
                        </label>
                    </div>
                    <div className="sort__field">
                        <input
                            className="sort__input"
                            id="input-popular"
                            type="radio"
                            name="sort"
                            value="за популярністю"
                        />
                        <label className="sort__label" htmlFor="input-popular">
                            за популярністю
                        </label>
                    </div>
                    <div className="sort__field">
                        <input
                            className="sort__input"
                            id="input-rating"
                            type="radio"
                            name="sort"
                            value="за рейтингом"
                        />
                        <label className="sort__label" htmlFor="input-rating">
                            за рейтингом
                        </label>
                    </div>
                </fieldset>
            </div>
        </div>
    );
};

export default SortProducts;
