import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import catalogueSprite from '../../../../../assets/icons/catalogue/catalogue-sprite.svg';

type Props = {
    className: string;
    srcImg: string;
    alt: string;
    title: string;
    href: string;
};

const CatalogueItem = (props: Props) => {
    const { srcImg, alt, title, className, href } = props;
    return (
        <NavLink to={href} className={className}>
            <LazyLoad height={250}>
                <img
                    className="catalogue__item_img"
                    src={srcImg}
                    width={304}
                    height={250}
                    loading="lazy"
                    alt={alt}
                />
            </LazyLoad>
            <div className="catalogue__item_content">
                <h2 className="catalogue__item_content_title">{title}</h2>
                <svg width="21" height="21">
                    <use href={`${catalogueSprite}#arrow-catalogue`} />
                </svg>
            </div>
        </NavLink>
    );
};

export default CatalogueItem;
