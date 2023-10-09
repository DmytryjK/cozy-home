import { Dispatch, SetStateAction } from 'react';
import './ShowHidePusswordBtn.scss';

const ShowHidePusswordBtn = ({
    setIsPasswordHide,
    isPasswordHide,
}: {
    setIsPasswordHide: Dispatch<SetStateAction<boolean>>;
    isPasswordHide: boolean;
}) => {
    return (
        <button
            className="show-hide-password"
            type="button"
            aria-label="показати / приховати пароль"
            title="показати / приховати пароль"
            onClick={() => setIsPasswordHide(!isPasswordHide)}
        />
    );
};

export default ShowHidePusswordBtn;
