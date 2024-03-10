import { MouseEvent, memo } from 'react';
import { NavLink } from 'react-router-dom';
import renderServerData from '../../../helpers/renderServerData';
import { useAppSelector } from '../../../hooks/hooks';
import { SubCategoryType } from '../Header';
import transliterate from '../../../utils/transliterate';
import './DropdownMenu.scss';
import '../Header.scss';

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
            const transliteratedCategoryName = transliterate(name);
            return (
                <ul
                    key={`dropdown-category-${id}-${name}`}
                    className="dropdown-menu__list"
                >
                    <li className="dropdown-menu__list_title">
                        <NavLink
                            to={`/catalog/${transliteratedCategoryName}&categoryId=${id}`}
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
                                        key={`dropdown-subcategory-${subId}-${subName}`}
                                        className="dropdown-menu__list_items_item"
                                    >
                                        <NavLink
                                            to={`/catalog/${transliteratedCategoryName}&categoryId=${id}&subId=${subId}`}
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
