import './Skeleton.scss';

const Skeleton = () => {
    return (
        <div className="card-skeleton">
            <div className="card-skeleton__image" />
            <div className="card-skeleton__content">
                <div className="card-skeleton__text-wrapper">
                    <div className="card-skeleton__text1" />
                    <div className="card-skeleton__text2" />
                </div>
                <div className="card-skeleton__bottom">
                    <div className="card-skeleton__price" />
                    <div className="card-skeleton__cart" />
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
