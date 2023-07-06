import catalogueSprite from '../../../assets/icons/catalogue/catalogue-sprite.svg';

type Props = {
    srcImg: string;
    srcWebp: string;
    alt: string;
    title: string;
    className: string;
};

const CatalogueItem = (props: Props) => {
    const { srcImg, srcWebp, alt, title, className } = props;
    return (
        <a href="/" className={className}>
            <picture>
                <source
                    className="catalogue__item_img"
                    type="image/webp"
                    srcSet={srcWebp}
                />
                <img className="catalogue__item_img" src={srcImg} alt={alt} />
            </picture>
            <div className="catalogue__item_content">
                <h2 className="catalogue__item_content_title">{title}</h2>
                <svg width="21" height="21">
                    <use href={`${catalogueSprite}#arrow-catalogue`} />
                </svg>
            </div>
        </a>
    );
};

export default CatalogueItem;
