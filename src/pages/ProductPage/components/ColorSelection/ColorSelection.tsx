import { NavLink, useLocation } from 'react-router-dom';
import nextId from 'react-id-generator';
import { updateProductColor } from '../../../../store/reducers/productInformationSlice';
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks';
import './ColorSelection.scss';

type ProductFetchInfoType = {
    currentColor: { id: string; name: string } | null;
    currentSku: string | null;
};
const ColorSelection = () => {
    const colorDtoList = useAppSelector(
        (state) => state.productInformation.productInfo.colors
    );
    const currentColor = useAppSelector(
        (state) => state.productInformation.currentColor
    );

    const dispatch = useAppDispatch();
    const currentPath = useLocation().pathname;

    return (
        <div className="color-selection">
            <span className="color-selection__color-descr">
                Колір: <span>{currentColor?.name}</span>
            </span>
            <ul className="color-selection__list">
                {colorDtoList.map((color) => {
                    const { id, name, quantityStatus } = color;
                    return (
                        <li
                            className={`color-selection__item ${
                                quantityStatus === 'Немає на складі' ||
                                quantityStatus === 'Немає в наявності'
                                    ? 'out-of-stock'
                                    : ''
                            }`}
                            key={nextId('product-color')}
                        >
                            <NavLink
                                className={`color-selection__link ${
                                    currentColor?.id === id ? 'active-link' : ''
                                }`}
                                to={`${currentPath}${id}`}
                                style={{ backgroundColor: `${id}` }}
                                onClick={() => {
                                    dispatch(
                                        updateProductColor({
                                            name,
                                            id,
                                        })
                                    );
                                    localStorage.setItem('hex', id);
                                    localStorage.setItem('colorName', name);
                                }}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default ColorSelection;
