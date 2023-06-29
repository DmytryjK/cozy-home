import arrowIcon from '../../../assets/icons/catalogue/arrow-catalogue.svg';

type Props = {
    src: string;
    alt: string;
    title: string;
    className: string;
};

const CatalogueItem = (props: Props) => {
    const { src, alt, title, className } = props;
    return (
        <a href="/" className={className}>
            <img src={src} alt={alt} className="catalogue__item_img" />
            <div className="catalogue__item_content">
                <h2 className="catalogue__item_content_title">{title}</h2>
                <img src={arrowIcon} alt="Детальніше" />
            </div>
        </a>
    );
};

export default CatalogueItem;
