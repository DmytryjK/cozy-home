import headerSprite from '../../../../assets/icons/header/header-sprite.svg';
import './GlobalSiteLoader.scss';

const GlobalSiteLoader = () => {
    return (
        <div className="global-loader">
            <svg className="global-loader__site-logo">
                <use href={`${headerSprite}#ch`} />
            </svg>
            <svg className="global-loader__site-logo">
                <use href={`${headerSprite}#oo`} />
            </svg>
            <svg className="global-loader__site-logo">
                <use href={`${headerSprite}#zm`} />
            </svg>
            <svg className="global-loader__site-logo">
                <use href={`${headerSprite}#ye`} />
            </svg>
        </div>
    );
};

export default GlobalSiteLoader;
