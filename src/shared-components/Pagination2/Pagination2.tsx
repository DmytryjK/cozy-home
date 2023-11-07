/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import nextId from 'react-id-generator';
import paginationSprite from '../../assets/icons/pagination/pagination-sprites.svg';
import moveUserToPageUp from '../../utils/moveUserToPageUp';
import './Pagination2.scss';

const Pagination2 = ({
    countOfPages,
    currentPage,
    setCurrentPage,
    setIsPaginationInit,
}: {
    countOfPages: number | undefined;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    setIsPaginationInit: Dispatch<SetStateAction<boolean>>;
}) => {
    const [pages, setPages] = useState<number[]>([]);

    useEffect(() => {
        if (!countOfPages) {
            setPages([]);
            return;
        }
        const temporaryPages = [];
        for (let i = 1; i <= countOfPages; i += 1) {
            temporaryPages.push(i);
        }
        setPages([...temporaryPages]);
    }, [countOfPages]);

    useEffect(() => {
        if (pages.length === 0) {
            setCurrentPage(0);
            return;
        }
        if (pages.length - 1 < currentPage && currentPage !== 0) {
            setCurrentPage(pages.length - 1);
        }
    }, [pages, currentPage]);

    useEffect(() => {
        if (pages.length === 0) return;
        if (currentPage === null) return;
        setCurrentPage(currentPage);
        moveUserToPageUp();
    }, [currentPage]);

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
                        currentPage === page - 1 ? 'active' : ''
                    }`}
                    type="button"
                    data-value={page}
                    onClick={() => {
                        setCurrentPage(page - 1);
                        setIsPaginationInit(false);
                    }}
                >
                    {page}
                </button>
            </li>
        );
    };

    const inlineStyle = () => {
        const styles: { [key: string]: string } = {};
        if (pages.length === 0) {
            styles.display = 'none';
        } else {
            styles.display = 'inline-block';
        }
        return styles;
    };

    const renderPagination = () => {
        return pages.map((page, index) => {
            if (currentPage < 3) {
                if (index === 4 && pages.length > 5) {
                    return getDots();
                }
                if (index > 4 && index < pages.length - 1) {
                    return '';
                }
            }
            if (currentPage >= 3 && currentPage < pages.length - 3) {
                if (index === 1 || index === currentPage + 2) {
                    return getDots();
                }
                if (
                    (index > 0 && index < currentPage - 1) ||
                    (index > currentPage + 1 && index < pages.length - 1)
                ) {
                    return '';
                }
            }
            if (currentPage >= pages.length - 3 && pages.length > 5) {
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
        <>
            {countOfPages ? (
                <div className="pagination" style={{ ...inlineStyle() }}>
                    <ul className=" pagination__list">{renderPagination()}</ul>
                    <button
                        className="pagination__prev-btn"
                        type="button"
                        onClick={() => {
                            setCurrentPage(currentPage - 1);
                            setIsPaginationInit(false);
                        }}
                        disabled={currentPage <= 0}
                    >
                        <svg width={24} height={24} className="prev-btn__icon">
                            <use href={`${paginationSprite}#prev`} />
                        </svg>
                    </button>
                    <button
                        className="pagination__next-btn"
                        type="button"
                        onClick={() => {
                            setCurrentPage(currentPage + 1);
                            setIsPaginationInit(false);
                        }}
                        disabled={currentPage >= pages.length - 1}
                    >
                        <svg width={24} height={24} className="next-btn__icon">
                            <use href={`${paginationSprite}#next`} />
                        </svg>
                    </button>
                </div>
            ) : (
                ''
            )}
        </>
    );
};

export default Pagination2;
