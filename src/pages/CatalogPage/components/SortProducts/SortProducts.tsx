import { useState, useEffect, FormEvent } from 'react';
import nextId from 'react-id-generator';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogProductsSlice';
import { updateFilterSortParam } from '../../../../store/reducers/catalogFilterSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import './SortProducts.scss';

const SortProducts = () => {
    const [currentSortOption, setCurrentSortOption] = useState<string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const filtersSortParam = useAppSelector(
        (state) => state.catalogFilters.filtersSort
    );
    const dispatch = useAppDispatch();
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

    useEffect(() => {
        if (!isActive) return;
        dispatch(fetchCatalogProductsByFilters({}));
    }, [filtersSortParam]);

    const handleSortItems = (
        fieldName: string,
        direction: string,
        e: FormEvent<HTMLInputElement>
    ) => {
        const target = e.target as HTMLInputElement;
        setCurrentSortOption(target.value);
        dispatch(updateFilterSortParam({ fieldName, direction }));
    };

    const sortFields = [
        {
            title: 'від дешевих до дорогих',
            fieldName: 'price',
            direction: 'asc',
        },
        {
            title: 'від дорогих до дешевих',
            fieldName: 'price',
            direction: 'desc',
        },
        {
            title: 'за рейтингом',
            fieldName: 'averageRating',
            direction: 'desc',
        },
    ];

    const renderSortFields = () => {
        return sortFields.map((sortFiled, index) => {
            const { title, fieldName, direction } = sortFiled;
            return (
                <div className="sort__field" key={nextId('sort-field')}>
                    <input
                        className="sort__input"
                        id={`input-${fieldName}${index}`}
                        type="radio"
                        name="sort"
                        checked={fieldName === filtersSortParam?.fieldName}
                        value={title}
                        onChange={(e) =>
                            handleSortItems(fieldName, direction, e)
                        }
                    />
                    <label
                        className="sort__label"
                        htmlFor={`input-${fieldName}${index}`}
                    >
                        {title}
                    </label>
                </div>
            );
        });
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
                        {filtersSortParam
                            ? currentSortOption
                            : 'за популярністю'}
                    </span>
                </button>
                <fieldset className="sort__custom-fields">
                    {renderSortFields()}
                </fieldset>
            </div>
        </div>
    );
};

export default SortProducts;
