import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

type Props = {
    error: null | unknown;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    renderProducts: () => (JSX.Element | null)[];
};

const RenderContent = (props: Props) => {
    const { error, loading, renderProducts } = props;
    let content: (JSX.Element | null) | (JSX.Element | null)[] = null;

    const render = () => {
        if (error) {
            content = <ErrorMessage />;
        } else if (loading === 'pending') {
            content = <Loader />;
        } else if (loading === 'succeeded') {
            content = renderProducts();
        }
        return content;
    };

    return <> {render()} </>;
};

export default RenderContent;
