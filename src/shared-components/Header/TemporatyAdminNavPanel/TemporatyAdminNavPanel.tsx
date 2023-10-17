import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
    userLogOut,
    temporaryDelUser,
} from '../../../store/reducers/authSlice';
import './TemporatyAdminNavPanel.scss';

const TemporatyAdminNavPanel = () => {
    const dispatch = useAppDispatch();
    const { jwtToken } = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState<string>('');
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
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="admin-panel__btn" type="submit">
                    delete user
                </button>
            </form>
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
