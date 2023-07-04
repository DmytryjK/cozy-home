import './CatalogueBlock.scss';
import Sofas from '../../assets/images/catalogue/image_1.png';
import Chairs from '../../assets/images/catalogue/image_2.png';
import Tables from '../../assets/images/catalogue/image_3.png';
import Dressers from '../../assets/images/catalogue/image_4.png';
import Сhairs_v2 from '../../assets/images/catalogue/image_5.png';
import Beds from '../../assets/images/catalogue/image_6.png';
import SofasWebp from '../../assets/images/catalogue/image_1.webp';
import ChairsWebp from '../../assets/images/catalogue/image_2.webp';
import TablesWebp from '../../assets/images/catalogue/image_3.webp';
import DressersWebp from '../../assets/images/catalogue/image_4.webp';
import Сhairs_v2Webp from '../../assets/images/catalogue/image_5.webp';
import BedsWebp from '../../assets/images/catalogue/image_6.webp';
import CatalogueItem from './CatalogueItem/CatalogueItem';

const CatalogueBlock = () => {
    return (
        <section className="catalogue">
            <div className="container">
                <CatalogueItem
                    title="Дивани"
                    alt="Дивани"
                    srcImg={Sofas}
                    srcWebp={SofasWebp}
                    className="catalogue__item item1"
                />
                <CatalogueItem
                    title="Крісла"
                    alt="Крісла"
                    srcImg={Chairs}
                    srcWebp={ChairsWebp}
                    className="catalogue__item item2"
                />
                <CatalogueItem
                    title="Столи"
                    alt="Столи"
                    srcImg={Tables}
                    srcWebp={TablesWebp}
                    className="catalogue__item item3"
                />
                <CatalogueItem
                    title="Комоди"
                    alt="Комоди"
                    srcImg={Dressers}
                    srcWebp={DressersWebp}
                    className="catalogue__item item4"
                />
                <CatalogueItem
                    title="Стільці"
                    alt="Стільці"
                    srcImg={Сhairs_v2}
                    srcWebp={Сhairs_v2Webp}
                    className="catalogue__item item5"
                />
                <CatalogueItem
                    title="Ліжка"
                    alt="Ліжка"
                    srcImg={Beds}
                    srcWebp={BedsWebp}
                    className="catalogue__item item6"
                />
            </div>
        </section>
    );
};

export default CatalogueBlock;
