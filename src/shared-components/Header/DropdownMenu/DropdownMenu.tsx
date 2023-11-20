import { MouseEvent, memo } from 'react';
import './DropdownMenu.scss';
import '../Header.scss';
import nextId from 'react-id-generator';
import { NavLink } from 'react-router-dom';
import renderServerData from '../../../helpers/renderServerData';
import { useAppSelector } from '../../../hooks/hooks';
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

    const renderedCategories = () => {
        return data.map((category) => {
            const { name, id } = category;
            return (
                <ul key={`category-${id}`} className="dropdown-menu__list">
                    <li className="dropdown-menu__list_title">
                        <NavLink to={`/catalog/${name}`} reloadDocument>
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
                                        key={`subcategory-${subId}`}
                                        className="dropdown-menu__list_items_item"
                                    >
                                        <NavLink
                                            to={`/catalog/${name}/${subName}`}
                                            reloadDocument
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

export default memo(DropdownMenu);
