import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { cacheImage, getCachedImage } from '../../../../../utils/cacheImage';
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
    const [cachedImageUrl, setCachedImageUrl] = useState('');

    useEffect(() => {
        cacheImage(srcImg);
        getCachedImage(srcImg).then((srcImg) => {
            setCachedImageUrl(srcImg);
        });
    }, []);
    return (
        <NavLink to={href} className={className}>
            <LazyLoad>
                <img
                    className="catalogue__item_img"
                    src={cachedImageUrl || srcImg}
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
