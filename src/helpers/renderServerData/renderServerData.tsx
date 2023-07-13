import ErrorMessage from '../../components/ErrorMessage';
import Loader from '../../components/Loader';

type Props = {
    error: null | unknown;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    content: () => JSX.Element | JSX.Element[];
};

const renderServerData = (props: Props) => {
    const { error, loading, content } = props;
    let render: JSX.Element | JSX.Element[] = <Loader />;

    if (error) {
        render = <ErrorMessage />;
    } else if (loading === 'succeeded') {
        render = content();
    }

    return render;
};

export default renderServerData;
