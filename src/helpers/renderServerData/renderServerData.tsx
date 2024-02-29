import ErrorMessage from '../../shared-components/UserMessages/ErrorMessage';
import Loader from '../../shared-components/Loader';

type Props = {
    error: null | unknown;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    content: () => JSX.Element | JSX.Element[];
    showPrevState?: boolean;
    loaderClassName?: string;
    customLoader?: JSX.Element[];
};

const renderServerData = (props: Props) => {
    const {
        error,
        loading,
        content,
        showPrevState,
        loaderClassName,
        customLoader,
    } = props;

    let render: JSX.Element | JSX.Element[] = customLoader || (
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
    customLoader: '',
    quantityLoaderItems: 0,
};

export default renderServerData;
