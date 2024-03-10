import './PrefetchProductPageLoader.scss';

type Props = {
    className?: string;
    isLine?: boolean;
};
const PrefetchProductPageLoader = (props: Props) => {
    const { className, isLine } = props;
    return (
        <div
            className={`prefetch-page ${className || ''} ${
                isLine ? 'second-loader' : ''
            }`}
        >
            <span className="prefetch-page__loading-dots">
                <span className="prefetch-page__loading-dot" />
                <span className="prefetch-page__loading-dot" />
                <span className="prefetch-page__loading-dot" />
            </span>
        </div>
    );
};

export default PrefetchProductPageLoader;
