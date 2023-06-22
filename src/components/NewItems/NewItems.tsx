import ProductCard from '../ProductCard/ProductCard';
import './NewItems.scss';

const NewItems = () => {
    return (
        <section className="new-items">
            <div className="container">
                <div className="new-items__top">
                    <h2 className="new-items__title">Новинки</h2>
                    <a className="new-items__see-all" href="/">
                        Дивитись всі
                    </a>
                </div>
                <ul className="new-items__cards">
                    <li className="new-items__card">
                        <ProductCard />
                    </li>
                    <li className="new-items__card">
                        <ProductCard />
                    </li>
                    <li className="new-items__card">
                        <ProductCard />
                    </li>
                    <li className="new-items__card">
                        <ProductCard />
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default NewItems;
