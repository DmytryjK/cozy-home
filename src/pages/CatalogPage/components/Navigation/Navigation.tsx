/* eslint-disable react/jsx-no-useless-fragment */
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogProductsSlice';
import Pagination2 from '../../../../shared-components/Pagination2/Pagination2';
import { updateCurrentPage } from '../../../../store/reducers/catalogFilterSlice';

const Navigation = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isPaginationInit, setIsPaginationInit] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    const parentCategoryId = useAppSelector(
        (state) => state.catalogFilters.filtersBody.parentCategoryId
    );
    const subCategoryId = useAppSelector(
        (state) => state.catalogFilters.filtersBody.subCategoryId
    );
    const countOfPages = useAppSelector(
        (state) => state.catalogFilters.filterOptions?.countOfPages
    );
    const currentPageStore = useAppSelector(
        (state) => state.catalogFilters.currentPage
    );

    useEffect(() => {
        setCurrentPage(0);
    }, [parentCategoryId, subCategoryId]);

    useEffect(() => {
        if (currentPage !== currentPageStore) {
            setCurrentPage(currentPageStore);
        }
    }, [currentPageStore]);

    useEffect(() => {
        dispatch(updateCurrentPage(currentPage));
        if (isPaginationInit) return;
        dispatch(
            fetchCatalogProductsByFilters({
                page: currentPage,
            })
        );
        setIsPaginationInit(true);
    }, [currentPage]);

    return (
        <Pagination2
            countOfPages={countOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setIsPaginationInit={setIsPaginationInit}
        />
    );
};

export default Navigation;
