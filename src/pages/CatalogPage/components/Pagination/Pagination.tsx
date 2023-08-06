/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect } from 'react';
import nextId from 'react-id-generator';
import paginationSprite from '../../../../assets/icons/pagination/pagination-sprites.svg';
import { fetchCatalogProductsByFilters } from '../../../../store/reducers/catalogProductsSlice';
import './Pagination.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';

const Pagination = () => {
    const [isInitialRendered, setIsInitialRendered] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pages, setPages] = useState<number[]>([]);
    const countOfPages = useAppSelector(
        (state) => state.catalogFilters.filterOptions?.countOfPages
    );
    const dispatch = useAppDispatch();
    const id = useAppSelector(
        (state) => state.catalogFilters.filtersBody.parentCategoryId
    );

    useEffect(() => {
        if (!countOfPages) return;
        const temporaryPages = [];
        for (let i = 1; i <= countOfPages; i += 1) {
            temporaryPages.push(i);
        }
        setPages([...temporaryPages]);
    }, [countOfPages]);

    useEffect(() => {
        if (pages.length === 0) return;
        if (isInitialRendered) {
            setIsInitialRendered(false);
            return;
        }
        const updatedPage = (currentPage - 1).toString();
        dispatch(fetchCatalogProductsByFilters({ page: updatedPage }));
    }, [currentPage, isInitialRendered]);

    const getDots = () => {
        return (
            <li className="pagination__item" key={nextId('page-dots')}>
                <span className="pagination__dots">...</span>
            </li>
        );
    };

    const getPages = (page: number) => {
        return (
            <li className="pagination__item" key={nextId('page-')}>
                <button
                    className={`pagination__page-btn ${
                        currentPage === page ? 'active' : ''
                    }`}
                    type="button"
                    data-value={page}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            </li>
        );
    };

    const renderPagination = () => {
        return pages.map((page, index) => {
            if (currentPage < 4) {
                if (index === 4 && pages.length > 5) {
                    return getDots();
                }
                if (index > 4 && index < pages.length - 1) {
                    return '';
                }
            }
            if (currentPage >= 4 && currentPage < pages.length - 2) {
                if (
                    index === currentPage - 3 ||
                    (index === currentPage + 1 && index !== pages.length - 1)
                ) {
                    return getDots();
                }
                if (
                    (index > 0 && index < currentPage - 3) ||
                    (index > currentPage + 1 && index < pages.length - 1)
                ) {
                    return '';
                }
            }
            if (currentPage >= pages.length - 2 && pages.length > 5) {
                if (index === 1) {
                    return getDots();
                }
                if (index > 0 && index < pages.length - 4) {
                    return '';
                }
            }
            return getPages(page);
        });
    };

    return (
        <div className="main-content__pagination pagination">
            <ul className=" pagination__list">{renderPagination()}</ul>
            <button
                className="pagination__prev-btn"
                type="button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage <= 1}
            >
                <svg width={24} height={24} className="prev-btn__icon">
                    <use href={`${paginationSprite}#prev`} />
                </svg>
            </button>
            <button
                className="pagination__next-btn"
                type="button"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage >= pages.length}
            >
                <svg width={24} height={24} className="next-btn__icon">
                    <use href={`${paginationSprite}#next`} />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
