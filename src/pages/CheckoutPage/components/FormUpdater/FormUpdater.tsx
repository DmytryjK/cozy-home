import { useEffect, memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setOrderData } from '../../../../store/reducers/orderSlice';
import type { OrderData } from '../../../../types/types';

const FormUpdater = () => {
    const orderData = useAppSelector((state) => state.order.data);
    const localOrderData: OrderData | null = JSON.parse(
        localStorage.getItem('orderData') || JSON.stringify(null)
    );

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localOrderData) {
            dispatch(setOrderData(localOrderData));
        }
    }, []);

    useEffect(() => {
        if (orderData) {
            localStorage.setItem('orderData', JSON.stringify(orderData));
        }
    }, [orderData]);
    return (
        <div
            style={{
                display: 'none',
                userSelect: 'none',
                visibility: 'hidden',
            }}
        >
            ''
        </div>
    );
};

export default memo(FormUpdater);
