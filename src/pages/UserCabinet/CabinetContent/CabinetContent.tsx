import { ReactNode, useEffect, useState, useContext } from 'react';
import UserContacts from './UserContacts/UserContacts';
import UserFavorites from './UserFavorites/UserFavorites';
import MobileContent from './MobileContent/MobileContent';
import { LinkType, UserActiveLinkContext } from '../UserCabinet';
import listOfRoutes from '../ListOfRoutes';
import DesktopContent from './DesktopContent/DesktopContent';
import './CabinetContent.scss';

export const renderUserCabinetContent = (activeLink: LinkType | null) => {
    let res: '' | ReactNode = '';
    switch (activeLink?.href) {
        case listOfRoutes[0].href:
            res = <UserContacts />;
            break;
        case listOfRoutes[1].href:
            res = <UserFavorites />;
            break;
        default:
            res = '';
    }
    return res;
};

const CabinetContent = () => {
    const [currentScreenSize, setCurrentScreenSize] = useState<
        'desktop' | 'mobile' | null
    >(null);
    const { activeLink, setActiveLink } = useContext(UserActiveLinkContext);

    useEffect(() => {
        const checkSize = () => {
            const screenWidth = window.screen.width;
            if (screenWidth <= 767) {
                setCurrentScreenSize('mobile');
            } else {
                setCurrentScreenSize('desktop');
            }
        };

        if (window.screen.width <= 767) {
            setCurrentScreenSize('mobile');
        } else {
            setCurrentScreenSize('desktop');
        }

        window.addEventListener('resize', checkSize);

        return () => window.removeEventListener('resize', checkSize);
    }, []);

    useEffect(() => {
        if (
            currentScreenSize === 'desktop' &&
            (activeLink?.href === '' || !activeLink)
        ) {
            setActiveLink({
                title: listOfRoutes[0].title,
                href: listOfRoutes[0].href,
            });
        }
    }, [currentScreenSize, activeLink]);

    return (
        <div className="cabinet-content">
            {currentScreenSize === 'desktop' ? (
                <DesktopContent />
            ) : (
                <MobileContent />
            )}
        </div>
    );
};

export default CabinetContent;
