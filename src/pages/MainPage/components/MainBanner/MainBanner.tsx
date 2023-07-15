import mainMannerImage from '../../../../assets/images/main-banner/main-banner_opt.png';
import mainMannerImageWebp from '../../../../assets/images/main-banner/main-banner.webp';
import mainMannerImagePhone from '../../../../assets/images/main-banner/main-banner_phone_opt.png';
import mainMannerImageWebpPhone from '../../../../assets/images/main-banner/main-banner_phone.webp';
import './MainBanner.scss';

const MainBanner = () => {
    return (
        <div className="mainBanner">
            <div className="container">
                <div className="mainBanner__content">
                    <h2 className="mainBanner__content_subtitle">
                        NEW ARRIVALS
                    </h2>
                    <h1 className="mainBanner__content_title">
                        TRENDY LOFT FURNITURE
                    </h1>
                    <p className="mainBanner__content_text">
                        Відчуйте привабливість нашої колекції{' '}
                        <span className="mainBanner__content_text_bold">
                            Trendy Loft Furniture
                        </span>
                        , яка ідеально поєднує в собі елегантність і сучасність.{' '}
                    </p>
                    <a href="/" className="mainBanner__content_link">
                        Детальніше
                    </a>
                </div>
            </div>
            <picture>
                <source
                    className="mainBanner__background-img"
                    media="(max-width: 768px)"
                    type="image/webp"
                    srcSet={mainMannerImageWebpPhone}
                />
                <source
                    className="mainBanner__background-img"
                    media="(max-width: 768px)"
                    type="image/png"
                    srcSet={mainMannerImagePhone}
                />
                <source
                    className="mainBanner__background-img"
                    type="image/webp"
                    srcSet={mainMannerImageWebp}
                />
                <img
                    className="mainBanner__background-img"
                    src={mainMannerImage}
                    alt="Vintage Loft Heritage Collection"
                />
            </picture>
        </div>
    );
};

export default MainBanner;