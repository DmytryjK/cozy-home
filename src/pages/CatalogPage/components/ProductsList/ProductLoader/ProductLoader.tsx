import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
    resetFilters,
    updateCurrentPage,
} from '../../../../../store/reducers/catalogFilterSlice';
import ErrorMessage from '../../../../../shared-components/UserMessages/ErrorMessage';
import { PrefetchProductPageLoader } from '../../../../../shared-components/Loaders';
import { useAppSelector, useAppDispatch } from '../../../../../hooks/hooks';
import transliterate from '../../../../../utils/transliterate';
import './ProductLoader.scss';

const ProductLoader = () => {
    const { categoryParams } = useParams();
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
    const categories = useAppSelector((state) => state.categories.data);
    const currentCategory = categories.filter((category) => category.id === id);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isFiltersCleared) return;
        if (!clearedFilters) return;
        dispatch(updateCurrentPage(0));
    }, [isFiltersCleared, clearedFilters]);

    const renderItems = () => {
        if (error) {
            return <ErrorMessage />;
        }
        if (loading === 'pending') {
            return (
                <>
                    <PrefetchProductPageLoader isLine />
                    <div className="catalog-products__loading-wrapper" />
                </>
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
                            const { name, id } = currentCategory[0];
                            if (!id) return;
                            dispatch(resetFilters(id));
                            setClearedFilters(true);
                            if (
                                categoryParams &&
                                categoryParams.indexOf('&subId') > 0
                            ) {
                                navigate(
                                    `/catalog/${transliterate(
                                        name
                                    )}&categoryId=${id}`
                                );
                            }
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
