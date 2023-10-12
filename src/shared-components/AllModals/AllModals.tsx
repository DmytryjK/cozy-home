import PopUpCart from './components/PopUpCart/PopUpCart';
import PopUpInStockNotification from './components/PopUpInStockNotification/PopUpInStockNotification';
import './AllModals.scss';
import PopUpForgottenPassword from './components/PopUpForgottenPassword/PopUpForgottenPassword';

const AllModals = () => {
    return (
        <>
            <PopUpCart />
            <PopUpInStockNotification />
            <PopUpForgottenPassword />
        </>
    );
};

export default AllModals;
