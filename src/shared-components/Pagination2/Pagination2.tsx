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
}: {
    countOfPages: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}) => {
    const [clickedPage, setClickedPage] = useState<number>(0);
    const [isPaginationInit, setIsPaginationInit] = useState<boolean>(true);
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
        if (clickedPage === null) return;
        setIsPaginationInit(false);
        setCurrentPage(clickedPage);
    }, [clickedPage]);

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
                        clickedPage === page - 1 ? 'active' : ''
                    }`}
                    type="button"
                    data-value={page}
                    onClick={() => {
                        setClickedPage(page - 1);
                        moveUserToPageUp();
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
            if (clickedPage < 3) {
                if (index === 4 && pages.length > 5) {
                    return getDots();
                }
                if (index > 4 && index < pages.length - 1) {
                    return '';
                }
            }
            if (clickedPage >= 3 && clickedPage < pages.length - 3) {
                if (index === 1 || index === clickedPage + 2) {
                    return getDots();
                }
                if (
                    (index > 0 && index < clickedPage - 1) ||
                    (index > clickedPage + 1 && index < pages.length - 1)
                ) {
                    return '';
                }
            }
            if (clickedPage >= pages.length - 3 && pages.length > 5) {
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
        <div className="pagination" style={{ ...inlineStyle() }}>
            <ul className=" pagination__list">{renderPagination()}</ul>
            <button
                className="pagination__prev-btn"
                type="button"
                onClick={() => {
                    setClickedPage(clickedPage - 1);
                }}
                disabled={clickedPage <= 0}
            >
                <svg width={24} height={24} className="prev-btn__icon">
                    <use href={`${paginationSprite}#prev`} />
                </svg>
            </button>
            <button
                className="pagination__next-btn"
                type="button"
                onClick={() => {
                    setClickedPage(clickedPage + 1);
                }}
                disabled={clickedPage >= pages.length - 1}
            >
                <svg width={24} height={24} className="next-btn__icon">
                    <use href={`${paginationSprite}#next`} />
                </svg>
            </button>
        </div>
    );
};

export default Pagination2;
