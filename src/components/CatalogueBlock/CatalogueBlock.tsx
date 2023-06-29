import './CatalogueBlock.scss';
import Sofas from '../../assets/images/catalogue/image_1.png';
import Chairs from '../../assets/images/catalogue/image_2.png';
import Tables from '../../assets/images/catalogue/image_3.png';
import Dressers from '../../assets/images/catalogue/image_4.png';
import Сhairs_v2 from '../../assets/images/catalogue/image_5.png';
import Beds from '../../assets/images/catalogue/image_6.png';
import CatalogueItem from './CatalogueItem/CatalogueItem';

const CatalogueBlock = () => {
    return (
        <section className="catalogue">
            <div className="container">
                <CatalogueItem
                    title="Дивани"
                    alt="Дивани"
                    src={Sofas}
                    className="catalogue__item item1"
                />
                <CatalogueItem
                    title="Крісла"
                    alt="Крісла"
                    src={Chairs}
                    className="catalogue__item item2"
                />
                <CatalogueItem
                    title="Столи"
                    alt="Столи"
                    src={Tables}
                    className="catalogue__item item3"
                />
                <CatalogueItem
                    title="Комоди"
                    alt="Комоди"
                    src={Dressers}
                    className="catalogue__item item4"
                />
                <CatalogueItem
                    title="Стільці"
                    alt="Стільці"
                    src={Сhairs_v2}
                    className="catalogue__item item5"
                />
                <CatalogueItem
                    title="Ліжка"
                    alt="Ліжка"
                    src={Beds}
                    className="catalogue__item item6"
                />
            </div>
        </section>
    );
};

export default CatalogueBlock;
