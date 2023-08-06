import loader from '../../assets/icons/loading/loader.svg';
import './Loader.scss';

const LoadingContent = ({ minHeight }: { minHeight: string }) => {
    return (
        <div className="content-loader" style={{ minHeight }}>
            <img className="content-loader_image" src={loader} alt="" />
        </div>
    );
};

export default LoadingContent;
