import PopUpCart from './components/PopUpCart/PopUpCart';
import PopUpInStockNotification from './components/PopUpInStockNotification/PopUpInStockNotification';
import './AllModals.scss';
import PopUpForgottenPassword from './components/PopUpForgottenPassword/PopUpForgottenPassword';
import PopUpCreateNewPassword from './components/PopUpCreateNewPassword/PopUpCreateNewPassword';

const AllModals = () => {
    return (
        <>
            <PopUpCart />
            <PopUpInStockNotification />
            <PopUpForgottenPassword />
            <PopUpCreateNewPassword />
        </>
    );
};

export default AllModals;
