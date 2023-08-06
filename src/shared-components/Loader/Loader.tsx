import loader from '../../assets/icons/loading/loader.svg';
import './Loader.scss';

type PositionType = 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';

const LoadingContent = ({
    height = '100%',
    maxHeight = '100%',
    position = 'static',
}: {
    height?: string;
    maxHeight?: string;
    position?: PositionType;
}) => {
    return (
        <div className="content-loader" style={{ height, maxHeight, position }}>
            <img className="content-loader_image" src={loader} alt="" />
        </div>
    );
};

LoadingContent.defaultProps = {
    height: '100%',
    maxHeight: '100%',
    position: 'static',
};

export default LoadingContent;
