import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
    resetFilters,
    updateCurrentPage,
} from '../../../../../store/reducers/catalogFilterSlice';
import ErrorMessage from '../../../../../shared-components/UserMessages/ErrorMessage';
import Loader from '../../../../../shared-components/Loader';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/hooks';
import './ProductLoader.scss';

const ProductLoader = () => {
    const { categoryName, subCategoryName } = useParams();
    const [clearedFilters, setClearedFilters] = useState<boolean>(false);
    const { loading, error, catalogProducts } = useAppSelector(
        (state) => state.catalogProducts
    );
    const isFiltersCleared = useAppSelector(
        (state) => state.catalogFilters.isFiltersCleared
    );
    const id = useAppSelector(
        (state) => state.catalogFilters.filtersBody.parentCategoryId
    );
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isFiltersCleared) return;
        if (!clearedFilters) return;
        dispatch(updateCurrentPage(0));
    }, [isFiltersCleared, clearedFilters]);

    const renderItems = () => {
        if (catalogProducts.length === 0 && loading === 'pending') return '';
        if (error) {
            return <ErrorMessage />;
        }
        if (loading !== 'succeeded' && loading !== 'idle') {
            return (
                <div className="catalog-products__loading-wrapper">
                    <Loader maxHeight="80dvh" />
                </div>
            );
        }
        if (catalogProducts.length === 0 && loading === 'succeeded') {
            return (
                <div className="nothing-to-search">
                    <p className="nothing-to-search__text">
                        Вашому вибору відповідає 0 товарів. <br />
                        Будь ласка, спробуйте прибрати один або кілька фільтрів.
                    </p>
                    <button
                        className="nothing-to-search__clear-filters"
                        type="button"
                        onClick={() => {
                            if (!id) return;
                            if (subCategoryName) {
                                navigate(`/catalog/${categoryName}`);
                                return;
                            }
                            dispatch(resetFilters(id));
                            setClearedFilters(true);
                        }}
                    >
                        <div className="nothing-to-search__clear-filters_text">
                            Скасувати всі фільтри{' '}
                        </div>
                    </button>
                </div>
            );
        }
        return '';
    };
    return <>{renderItems()}</>;
};

export default ProductLoader;
