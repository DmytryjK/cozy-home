import ErrorMessage from '../../shared-components/UserMessages/ErrorMessage';
import Loader from '../../shared-components/Loader';

type Props = {
    error: null | unknown;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    content: () => JSX.Element | JSX.Element[];
    showPrevState?: boolean;
    loaderClassName?: string;
};

const renderServerData = (props: Props) => {
    const { error, loading, content, showPrevState, loaderClassName } = props;
    let render: JSX.Element | JSX.Element[] = (
        <Loader className={loaderClassName} />
    );
    if (error) {
        render = <ErrorMessage />;
    } else if (loading === 'succeeded') {
        render = content();
    }

    if (showPrevState && loading !== 'succeeded') {
        render = (
            <>
                <Loader className={loaderClassName} />
                {content()}
            </>
        );
    }

    return render;
};

renderServerData.defultProps = {
    showPrevState: false,
    loaderClassName: '',
};

export default renderServerData;
