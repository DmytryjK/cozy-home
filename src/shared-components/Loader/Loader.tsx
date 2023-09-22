import loader from '../../assets/icons/loading/loader.svg';
import './Loader.scss';

const LoadingContent = ({
    height = '100%',
    maxHeight = '100%',
    className = '',
}: {
    height?: string;
    maxHeight?: string;
    className?: string;
}) => {
    return (
        <div
            className={`content-loader ${className}`}
            style={{ height, maxHeight }}
        >
            <img className="content-loader_image" src={loader} alt="" />
        </div>
    );
};

LoadingContent.defaultProps = {
    height: '100%',
    maxHeight: '100%',
    className: '',
};

export default LoadingContent;
