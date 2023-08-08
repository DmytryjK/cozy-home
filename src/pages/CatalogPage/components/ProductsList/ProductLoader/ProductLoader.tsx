import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { fetchCatalogProductsByFilters } from '../../../../../store/reducers/catalogProductsSlice';
import {
    fetchFiltersOptionsForFilteredProducts,
    resetFilters,
} from '../../../../../store/reducers/catalogFilterSlice';
import ErrorMessage from '../../../../../shared-components/ErrorMessage';
import Loader from '../../../../../shared-components/Loader';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/hooks';
import './ProductLoader.scss';

const ProductLoader = () => {
    const { categoryName, subCategoryName } = useParams();
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
        dispatch(
            fetchCatalogProductsByFilters({
                page: 0,
                isFiltersActive: false,
            })
        );
        dispatch(
            fetchFiltersOptionsForFilteredProducts({
                isFiltersActive: true,
            })
        );
    }, [isFiltersCleared]);

    const renderItems = () => {
        if (error) {
            return <ErrorMessage />;
        }
        if (loading !== 'succeeded') {
            return (
                <div className="catalog-products__loading-wrapper">
                    <Loader maxHeight="80dvh" />
                </div>
            );
        }
        if (catalogProducts.length === 0 && loading === 'succeeded') {
            return (
                <div className="nothing-to-search">
                    <div>Нажаль ми нічого не змогли знайти :(</div>
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
                        }}
                    >
                        <div className="nothing-to-search__clear-filters_text">
                            Скасувати фільтри{' '}
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
