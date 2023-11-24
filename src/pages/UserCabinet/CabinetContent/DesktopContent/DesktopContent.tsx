import { useContext, memo } from 'react';
import { renderUserCabinetContent } from '../CabinetContent';
import { UserActiveLinkContext } from '../../UserCabinet';

const DesktopContent = () => {
    const { activeLink } = useContext(UserActiveLinkContext);
    return <>{renderUserCabinetContent(activeLink)}</>;
};

export default memo(DesktopContent);
