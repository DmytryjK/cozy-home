import loader from '../../assets/icons/loading/loader.svg';
import './Loader.scss';

const LoadingContent = () => {
    return (
        <div className="content-loader">
            <img className="content-loader_image" src={loader} alt="" />
        </div>
    );
};

export default LoadingContent;
