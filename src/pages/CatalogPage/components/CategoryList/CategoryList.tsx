import { Dispatch, SetStateAction, useEffect } from 'react';
import {
    useParams,
    NavLink,
    useLocation,
    useSearchParams,
} from 'react-router-dom';
import renderServerData from '../../../../helpers/renderServerData';
import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
    fetchFiltersOptionsByCategory,
    updateFilterSortParam,
    updateGlobalFiltersQuery,
    updateCurrentCategory,
    updateCurrentPage,
    setIsFiltersActive,
} from '../../../../store/reducers/catalogFilterSlice';
import { fetchCatalogProductsByCategories } from '../../../../store/reducers/catalogProductsSlice';
import useFetch from '../../../../hooks/useFetch';
import './CategoryList.scss';
import { Loading } from '../../../../types/types';
import transliterate from '../../../../utils/transliterate';

type CategoriesType = {
    id: string;
    name: string;
    spriteIcon: string;
};

type Props = {
    setActiveCategory: Dispatch<
        SetStateAction<{ id: string; name: string } | null>
    >;
};

const CategoryList = (props: Props) => {
    const { setActiveCategory } = props;
    const { categoryParams } = useParams();
    const { pathname } = useLocation();
    const [searchQuery, setSearchQuery] = useSearchParams();
    const searchKeyword = searchQuery.get('search');

    const categoryId: string | undefined = categoryParams
        ?.substring(
            categoryParams.indexOf('categoryId='),
            categoryParams.indexOf('&subId') !== -1
                ? categoryParams.indexOf('&subId')
                : categoryParams.length
        )
        .replace('categoryId=', '');
    const subcategoryId: string | undefined = categoryParams
        ?.substring(
            categoryParams.indexOf('&subId') !== -1
                ? categoryParams.indexOf('&subId')
                : categoryParams.length,
            categoryParams.length
        )
        .replace('&subId=', '');

    const dispatch = useAppDispatch();
    const {
        loading,
        error,
        data,
    }: { loading: Loading; error: null | unknown; data: CategoriesType[] } =
        useFetch('category');
    const categories = useAppSelector((state) => state.categories.data);

    const filtersCategoryId = useAppSelector(
        (state) => state.catalogFilters.filterOptions?.parentCategoryId
    );
    const subCategories = useAppSelector(
        (state) => state.catalogFilters.filtersBody.subCategories
    );
    const isFiltersActive = useAppSelector(
        (state) => state.catalogFilters.isFiltersActive
    );
    const page = useAppSelector((state) => state.catalogFilters.currentPage);

    useEffect(() => {
        if (data.length === 0 || loading !== 'succeeded') return;
        if (categories.length === 0) return;

        const id = categoryId || '';
        dispatch(updateCurrentPage(0));
        if (searchKeyword) return;
        if (
            !subcategoryId &&
            categoryId &&
            (filtersCategoryId !== categoryId ||
                subCategories ||
                isFiltersActive ||
                page > 0)
        ) {
            dispatch(
                fetchFiltersOptionsByCategory({ categoryId: id, page: 0 })
            );
            dispatch(fetchCatalogProductsByCategories({ id, page: 0 }));
            dispatch(updateFilterSortParam(null));
            dispatch(updateCurrentCategory(id));
            dispatch(setIsFiltersActive(false));
        } else if (subcategoryId) {
            dispatch(updateCurrentCategory(id));
            dispatch(
                updateGlobalFiltersQuery({
                    subCategories: [subcategoryId],
                })
            );
            dispatch(fetchCatalogProductsByCategories({ id: subcategoryId }));
            dispatch(
                fetchFiltersOptionsByCategory({
                    categoryId: id,
                    subcategoryId,
                })
            );
            dispatch(setIsFiltersActive(true));
        }
    }, [loading, data, pathname, categories]);

    useEffect(() => {
        if (data.length === 0) return;
        data.forEach((category) => {
            if (category.id === categoryId) {
                const { id, name } = category;
                setActiveCategory({ id, name });
            }
        });
    }, [data, pathname]);

    const renderedItems = () => {
        return data.map((category) => {
            const { name, id, spriteIcon } = category;
            return (
                <li
                    className="category-list__item"
                    key={`catalog-category-nav${id}`}
                >
                    <NavLink
                        to={`/catalog/${transliterate(name)}&categoryId=${id}`}
                        onClick={() => {
                            setActiveCategory({
                                id,
                                name,
                            });
                        }}
                        className={`category-list__link ${
                            id === categoryId ? 'active' : ''
                        }`}
                    >
                        <svg
                            className="category-list__icon"
                            width="44"
                            height="44"
                        >
                            <use href={`${categoriesSprite}#${spriteIcon}`} />
                        </svg>
                        <span className="category-list__title">{name}</span>
                    </NavLink>
                </li>
            );
        });
    };

    return (
        <section className="category">
            <div className="container">
                <ul className="category-list">
                    {renderServerData({
                        loading,
                        error,
                        content: renderedItems,
                    })}
                </ul>
            </div>
        </section>
    );
};

export default CategoryList;
