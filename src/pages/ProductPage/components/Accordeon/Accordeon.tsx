import { useState, useEffect } from 'react';
import './Accordeon.scss';

const Accordeon = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const accordeonItemsText = document.querySelectorAll(
        '.accordeon__item-text'
    );
    const accordeonItems = document.querySelectorAll('.accordeon__item');

    function autoCalculateHeightOfItem() {
        accordeonItems.forEach((item, index) => {
            const currentHeight = `${accordeonItemsText[index].scrollHeight}px`;
            const currentItem = item as HTMLElement;
            currentItem.style.setProperty('--content-height', currentHeight);
        });
    }

    useEffect(() => {
        window.addEventListener('resize', autoCalculateHeightOfItem);

        return () =>
            window.removeEventListener('resize', autoCalculateHeightOfItem);
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
                        <b>Крісло м'яке велюр Comfort</b> - це поєднання
                        затишку, комфорту і елегантного дизайну. Це крісло
                        створене, щоб забезпечити вам неперевершений рівень
                        зручності та розкішного вигляду в вашому інтер'єрі.
                        <br />
                        <br />
                        Конструкція <b>крісла Comfort</b> також заслуговує
                        уваги. Вона виготовлена з міцного дерев'яного каркасу,
                        що забезпечує стабільність і довговічність крісла. Пухка
                        подушка на сидінні та спинці забезпечує додатковий
                        комфорт і підтримку вашої спини, дозволяючи вам
                        розслабитися і відпочити. Його щедрі розміри і широке
                        сидіння надають достатньо місця для комфортного
                        розташування. Будь-який приміщення, будь то вітальня,
                        спальня або кабінет, стане більш затишним і стильним
                        завдяки присутності цього чудового крісла.
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
                            <tr>
                                <th className="table-title">Матеріал:</th>
                                <td className="table-text">Текстиль</td>
                            </tr>
                            <tr>
                                <th className="table-title">Категорія:</th>
                                <td className="table-text">Крісла</td>
                            </tr>
                            <tr>
                                <th className="table-title">Колекція:</th>
                                <td className="table-text">Tenderness</td>
                            </tr>
                            <tr>
                                <th className="table-title">Вага:</th>
                                <td className="table-text">3200 грам</td>
                            </tr>
                            <tr>
                                <th className="table-title">Висота:</th>
                                <td className="table-text">1100 мм</td>
                            </tr>
                            <tr>
                                <th className="table-title">Ширина:</th>
                                <td className="table-text">520 мм</td>
                            </tr>
                            <tr>
                                <th className="table-title">Глибина:</th>
                                <td className="table-text">520 мм</td>
                            </tr>
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
