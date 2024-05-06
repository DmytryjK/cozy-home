import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
    userLogOut,
    temporaryDelUser,
    temporaryClearOrders,
} from '../../../store/reducers/authSlice';
import { updateCartInfoForAuthUser } from '../../../store/reducers/cartSlice';
import './TemporatyAdminNavPanel.scss';

const TemporatyAdminNavPanel = () => {
    const dispatch = useAppDispatch();
    const { jwtToken } = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState<string>('');
    const [emailOrder, setEmailOrder] = useState<string>('');
    return (
        <div className="admin-panel">
            <form
                className="admin-panel__del-user"
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(
                        temporaryDelUser({
                            email,
                            jwt: jwtToken,
                        })
                    );
                }}
            >
                <input
                    className="admin-panel__user-email"
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="admin-panel__btn" type="submit">
                    delete user
                </button>
            </form>
            <form
                className="admin-panel__del-user"
                onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(temporaryClearOrders({ email: emailOrder }));
                }}
            >
                <input
                    className="admin-panel__user-email"
                    type="email"
                    value={emailOrder}
                    placeholder="email"
                    onChange={(e) => setEmailOrder(e.target.value)}
                />
                <button className="admin-panel__btn" type="submit">
                    delete orders
                </button>
            </form>
            <button
                className="admin-panel__btn"
                type="button"
                onClick={() => {
                    dispatch(updateCartInfoForAuthUser({ customData: [] }));
                    console.log('updating cart...');
                }}
            >
                Clear cart
            </button>
            <button
                className="admin-panel__btn"
                type="button"
                onClick={() => {
                    dispatch(userLogOut(jwtToken));
                }}
            >
                logout
            </button>
        </div>
    );
};

export default TemporatyAdminNavPanel;
