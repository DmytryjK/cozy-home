import categoriesSprite from '../../../../assets/icons/categories/categories-sprite.svg';
import './CategoryList.scss';

const CategoryList = () => {
    return (
        <section className="category">
            <div className="container">
                <ul className="category-list">
                    <li className="category-list__item">
                        <a className="category-list__link active" href="/">
                            <svg
                                className="category-list__icon"
                                width="44"
                                height="44"
                            >
                                <use href={`${categoriesSprite}#sofas`} />
                            </svg>
                            <h2 className="category-list__title">ДИВАНИ</h2>
                        </a>
                    </li>
                    <li className="category-list__item">
                        <a className="category-list__link" href="/">
                            <svg
                                className="category-list__icon"
                                width="44"
                                height="44"
                            >
                                <use href={`${categoriesSprite}#arm-chairs`} />
                            </svg>
                            <h2 className="category-list__title">КРІСЛА</h2>
                        </a>
                    </li>
                    <li className="category-list__item">
                        <a className="category-list__link" href="/">
                            <svg
                                className="category-list__icon"
                                width="44"
                                height="44"
                            >
                                <use href={`${categoriesSprite}#dressers`} />
                            </svg>
                            <h2 className="category-list__title">КОМОДИ</h2>
                        </a>
                    </li>
                    <li className="category-list__item">
                        <a className="category-list__link" href="/">
                            <svg
                                className="category-list__icon"
                                width="44"
                                height="44"
                            >
                                <use href={`${categoriesSprite}#decor`} />
                            </svg>
                            <h2 className="category-list__title">ДЕКОР</h2>
                        </a>
                    </li>
                    <li className="category-list__item">
                        <a className="category-list__link" href="/">
                            <svg
                                className="category-list__icon"
                                width="44"
                                height="44"
                            >
                                <use href={`${categoriesSprite}#cabinets`} />
                            </svg>
                            <h2 className="category-list__title">ШАФИ</h2>
                        </a>
                    </li>
                    <li className="category-list__item">
                        <a className="category-list__link" href="/">
                            <svg
                                className="category-list__icon"
                                width="44"
                                height="44"
                            >
                                <use href={`${categoriesSprite}#tables`} />
                            </svg>
                            <h2 className="category-list__title">СТОЛИ</h2>
                        </a>
                    </li>
                    <li className="category-list__item">
                        <a className="category-list__link" href="/">
                            <svg
                                className="category-list__icon"
                                width="44"
                                height="44"
                            >
                                <use href={`${categoriesSprite}#chairs`} />
                            </svg>
                            <h2 className="category-list__title">СТІЛЬЦІ</h2>
                        </a>
                    </li>
                    <li className="category-list__item">
                        <a className="category-list__link" href="/">
                            <svg
                                className="category-list__icon"
                                width="44"
                                height="44"
                            >
                                <use href={`${categoriesSprite}#bed`} />
                            </svg>
                            <h2 className="category-list__title">ЛІЖКА</h2>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default CategoryList;
