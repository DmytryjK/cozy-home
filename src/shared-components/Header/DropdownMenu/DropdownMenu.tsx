import { MouseEvent } from 'react';
import './DropdownMenu.scss';
import '../Header.scss';
import nextId from 'react-id-generator';
import { NavLink } from 'react-router-dom';
import renderServerData from '../../../helpers/renderServerData';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { updateGlobalFiltersQuery } from '../../../store/reducers/catalogFilterSlice';
import {
    fetchCatalogProductsBySubCategories,
    fetchCatalogProductsByCategories,
} from '../../../store/reducers/catalogProductsSlice';
import { SubCategoryType } from '../Header';

type Props = {
    handleMouseOut: (event: MouseEvent) => void;
    isOpen: boolean;
};

const DropdownMenu = (props: Props) => {
    const { isOpen, handleMouseOut } = props;
    const { error, loading, data } = useAppSelector(
        (state) => state.categories
    );
    const dispatch = useAppDispatch();

    const renderedCategories = () => {
        return data.map((category) => {
            const { name, id } = category;
            return (
                <ul
                    key={nextId('main-page-item')}
                    className="dropdown-menu__list"
                >
                    <li className="dropdown-menu__list_title">
                        <NavLink
                            to={`/catalog/${name}`}
                            onClick={() => {
                                dispatch(
                                    updateGlobalFiltersQuery({
                                        parentCategoryId: id,
                                    })
                                );
                                dispatch(fetchCatalogProductsByCategories(id));
                            }}
                        >
                            {name}
                        </NavLink>
                    </li>
                    <ul className="dropdown-menu__list_items">
                        {category.categoryDtos.map(
                            (subCategory: SubCategoryType) => {
                                const subId = subCategory.id;
                                const subName = subCategory.name;
                                return (
                                    <li
                                        key={nextId('main-page-item')}
                                        className="dropdown-menu__list_items_item"
                                    >
                                        <NavLink
                                            to={`/catalog/${name}/${subName}`}
                                            onClick={() => {
                                                dispatch(
                                                    updateGlobalFiltersQuery({
                                                        subCategories: [subId],
                                                    })
                                                );
                                                dispatch(
                                                    fetchCatalogProductsBySubCategories(
                                                        subId
                                                    )
                                                );
                                            }}
                                        >
                                            {subName}
                                        </NavLink>
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </ul>
            );
        });
    };

    return (
        <div
            className={`dropdown-menu ${isOpen ? 'dropdown-menu-active' : ''}`}
            onMouseLeave={handleMouseOut}
        >
            <div className="container">
                {renderServerData({
                    error,
                    loading,
                    content: renderedCategories,
                })}
            </div>
        </div>
    );
};

export default DropdownMenu;
