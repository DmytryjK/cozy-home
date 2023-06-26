import arrowIcon from '../../../assets/icons/catalogue/arrow-catalogue.svg';

type Props = {
    src: string;
    alt: string;
    title: string;
};

const CatalogueItem = (props: Props) => {
    const { src, alt, title } = props;
    return (
        <a href="/" className="catalogue__item">
            <img src={src} alt={alt} className="catalogue__item_img" />
            <div className="catalogue__item_content">
                <h2 className="catalogue__item_content_title">{title}</h2>
                <img src={arrowIcon} alt="Детальніше" />
            </div>
        </a>
    );
};

export default CatalogueItem;
