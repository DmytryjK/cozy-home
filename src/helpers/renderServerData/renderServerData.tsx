import ErrorMessage from '../../shared-components/ErrorMessage';
import Loader from '../../shared-components/Loader';

type Props = {
    error: null | unknown;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    content: () => JSX.Element | JSX.Element[];
};

const renderServerData = (props: Props) => {
    const { error, loading, content } = props;
    let render: JSX.Element | JSX.Element[] = <Loader minHeight="100%" />;

    if (error) {
        render = <ErrorMessage />;
    } else if (loading === 'succeeded') {
        render = content();
    }

    return render;
};

export default renderServerData;
