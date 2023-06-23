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
        <div className="container">
            <section className="catalogue">
                <CatalogueItem title="Дивани" alt="Дивани" src={Sofas} />
                <CatalogueItem title="Крісла" alt="Крісла" src={Chairs} />
                <CatalogueItem title="Столи" alt="Столи" src={Tables} />
                <CatalogueItem title="Комоди" alt="Комоди" src={Dressers} />
                <CatalogueItem title="Стільці" alt="Стільці" src={Сhairs_v2} />
                <CatalogueItem title="Ліжка" alt="Ліжка" src={Beds} />
            </section>
        </div>
    );
};

export default CatalogueBlock;
