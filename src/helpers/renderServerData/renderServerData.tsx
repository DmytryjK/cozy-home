import ErrorMessage from '../../shared-components/UserMessages/ErrorMessage';
import Loader from '../../shared-components/Loaders/components/Loader';

type Props = {
    error: null | unknown;
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    content: () => JSX.Element | JSX.Element[];
    showPrevState?: boolean;
    loaderClassName?: string;
    customLoader?: JSX.Element[];
    isComponentActive?: boolean;
};

const renderServerData = (props: Props) => {
    const {
        error,
        loading,
        content,
        showPrevState,
        loaderClassName,
        customLoader,
        isComponentActive,
    } = props;

    let render: JSX.Element | JSX.Element[] =
        customLoader ||
        (isComponentActive === true ? (
            <Loader className={loaderClassName} />
        ) : (
            <span />
        ));

    if (error) {
        render = (
            <ErrorMessage
                message={(error as { message: string }).message || undefined}
            />
        );
    } else if (loading === 'succeeded') {
        render = content();
    }

    if (showPrevState && loading !== 'succeeded') {
        render = (
            <>
                {isComponentActive === true ? (
                    <Loader className={loaderClassName} />
                ) : (
                    <span />
                )}
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
    isComponentActive: true,
};

export default renderServerData;
