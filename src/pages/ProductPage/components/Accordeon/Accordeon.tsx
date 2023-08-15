import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import nextId from 'react-id-generator';
import { useAppSelector } from '../../../../hooks/hooks';
import './Accordeon.scss';

type CharactersDataType = {
    title: string;
    value:
        | string
        | string[]
        | number
        | boolean
        | { id: string; name: string }
        | Record<string, never>;
    unit?: string;
};

const Accordeon = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const accordeonItemsText = document.querySelectorAll(
        '.accordeon__item-text'
    );
    const accordeonItems = document.querySelectorAll('.accordeon__item');
    const productInfo = useAppSelector(
        (state) => state.productInformation.productInfo
    );

    const {
        description,
        categoryName,
        materials,
        collection,
        transformation,
        heightAdjustment,
        weight,
        height,
        width,
        depth,
        numberOfDoors,
        numberOfDrawers,
        bedLength,
        bedWidth,
        maxLoad,
    } = productInfo;

    const charactersData: CharactersDataType[] = [
        {
            title: 'Категорія',
            value: categoryName,
        },
        {
            title: 'Матеріали',
            value: materials,
        },
        {
            title: 'Колекції',
            value: collection.name,
        },
        {
            title: 'Механізм трансформації',
            value: transformation ? 'так' : false,
        },
        {
            title: 'Регулювання за висотою',
            value: heightAdjustment ? 'так' : false,
        },
        {
            title: 'Вага',
            value: weight,
            unit: 'кг',
        },
        {
            title: 'Висота',
            value: height,
            unit: 'см',
        },
        {
            title: 'Ширина',
            value: width,
            unit: 'см',
        },
        {
            title: 'Глибина',
            value: depth,
            unit: 'см',
        },
        {
            title: 'Кількість дверей',
            value: numberOfDoors,
            unit: 'шт',
        },
        {
            title: 'Кількість шухляд',
            value: numberOfDrawers,
            unit: 'шт',
        },
        {
            title: 'Довжина спального місця',
            value: bedLength,
            unit: 'см',
        },
        {
            title: 'Ширина спального місця',
            value: bedWidth,
            unit: 'см',
        },
        {
            title: 'Навантаження',
            value: maxLoad,
            unit: 'кг',
        },
    ];

    const charactersCurtrentInfo = charactersData.filter((character) => {
        if (character.value) {
            return -1;
        }
        return 0;
    });

    function autoCalculateHeightOfItem() {
        accordeonItems.forEach((item, index) => {
            const currentHeight = `${accordeonItemsText[index].scrollHeight}px`;
            const currentItem = item as HTMLElement;
            currentItem.style.setProperty('--content-height', currentHeight);
        });
    }

    useEffect(() => {
        window.addEventListener('resize', autoCalculateHeightOfItem);

        // return () =>
        //     window.removeEventListener('resize', autoCalculateHeightOfItem);
    }, []);

    autoCalculateHeightOfItem();
    return (
        <ul className="accordeon">
            <li
                className={`accordeon__item item-descr ${
                    activeTab === 'descr' ? 'active' : ''
                }`}
                data-name="descr"
            >
                <button
                    className="accordeon__item-btn"
                    type="button"
                    onClick={() =>
                        setActiveTab((prev) =>
                            prev === 'descr' ? null : 'descr'
                        )
                    }
                >
                    <span className="accordeon__item-title">Опис</span>
                </button>
                <div className="accordeon__item-inner">
                    <p className="accordeon__item-text item-descr__text">
                        {parse(description)}
                    </p>
                </div>
            </li>
            <li
                className={`accordeon__item item-characters ${
                    activeTab === 'characters' ? 'active' : ''
                }`}
                data-name="characters"
            >
                <button
                    className="accordeon__item-btn"
                    type="button"
                    onClick={() =>
                        setActiveTab((prev) =>
                            prev === 'characters' ? null : 'characters'
                        )
                    }
                >
                    <span className="accordeon__item-title">
                        Характеристики
                    </span>
                </button>
                <div className="accordeon__item-inner">
                    <table className="accordeon__item-text item-characters__table">
                        <tbody>
                            {charactersCurtrentInfo.map((character) => {
                                const { title, value, unit } = character;
                                if (
                                    typeof value === 'string' ||
                                    typeof value === 'number'
                                )
                                    return (
                                        <tr key={nextId('character-type')}>
                                            <th className="table-title">
                                                {title}:
                                            </th>
                                            <td className="table-text">
                                                {value} {unit || ''}
                                            </td>
                                        </tr>
                                    );
                                if (Array.isArray(value)) {
                                    return (
                                        <tr key={nextId('character-type')}>
                                            <th className="table-title">
                                                {title}:
                                            </th>
                                            {value.map((item, index) => {
                                                return (
                                                    <td
                                                        key={nextId(
                                                            'character-values'
                                                        )}
                                                        className="table-text"
                                                    >
                                                        {index <
                                                        value.length - 1
                                                            ? `${item},`
                                                            : item}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </table>
                </div>
            </li>
            <li
                className={`accordeon__item item-delivery ${
                    activeTab === 'delivery' ? 'active' : ''
                }`}
                data-name="delivery"
            >
                <button
                    className="accordeon__item-btn"
                    type="button"
                    onClick={() =>
                        setActiveTab((prev) =>
                            prev === 'delivery' ? null : 'delivery'
                        )
                    }
                >
                    <span className="accordeon__item-title">
                        Оплата та доставка
                    </span>
                </button>
                <div className="accordeon__item-inner">
                    <p className="accordeon__item-text item-delivery__text">
                        <b className="item-delivery__main">Оплата:</b> <br />
                        При отриманні накладеним платежем <b>(вся Україна)</b>
                        або готівкою кур'єру <b>(Київ)</b>
                        <br /> На банківську карту (передоплата)
                        <br /> На розрахунковий рахунок (передоплата)
                        <br />
                        <br />
                        <b className="item-delivery__main">Доставка:</b>
                        <br />
                        Безкоштовна доставка всіма поштовами службами:{' '}
                        <b>Нова Пошта</b>, <b>Автолюкс</b>, <b>Делівері</b>
                    </p>
                </div>
            </li>
        </ul>
    );
};

export default Accordeon;
