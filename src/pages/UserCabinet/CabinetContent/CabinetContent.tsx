import { ReactNode, useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';
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

    const navigate = useNavigate();
    const { pathname } = useLocation();

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
            pathname === '/cabinet' &&
            (activeLink?.href === '' || !activeLink)
        ) {
            setActiveLink({
                title: listOfRoutes[0].title,
                href: listOfRoutes[0].href,
            });
        }
    }, [currentScreenSize, activeLink, pathname]);

    useEffect(() => {
        if (!activeLink) return;
        if (activeLink.href === '' && currentScreenSize === 'mobile') {
            navigate('/cabinet');
        } else {
            navigate(`${activeLink.href}`);
        }
    }, [activeLink, currentScreenSize]);

    useEffect(() => {
        listOfRoutes.forEach((route) => {
            if (pathname === route.href && activeLink?.href !== route.href) {
                setActiveLink({
                    title: route.title,
                    href: route.href,
                });
            }
        });
    }, [pathname]);

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
