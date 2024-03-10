import Loader from '../Loader';
import './FullScreenLoader.scss';

const FullScreenLoader = () => {
    return (
        <div className="full-screen-loader">
            <div className="overlay" />
            <Loader />
        </div>
    );
};

export default FullScreenLoader;
