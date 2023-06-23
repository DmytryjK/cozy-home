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
                        Відчуйте привабливість нашої колекції Trendy Loft
                        Furniture, яка ідеально поєднує в собі елегантність і
                        сучасність.{' '}
                    </p>
                    <a href="/">
                        <button
                            className="mainBanner__content_button"
                            type="button"
                        >
                            Детальніше
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MainBanner;
