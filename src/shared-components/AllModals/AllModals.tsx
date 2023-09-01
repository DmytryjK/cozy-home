import PopUpCart from './components/PopUpCart/PopUpCart';
import PopUpInStockNotification from './components/PopUpInStockNotification/PopUpInStockNotification';
import './AllModals.scss';

const AllModals = () => {
    return (
        <>
            <PopUpCart />
            <PopUpInStockNotification />
        </>
    );
};

export default AllModals;
