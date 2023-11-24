import {
    ReactNode,
    useEffect,
    useState,
    useContext,
    createContext,
    useMemo,
    memo,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
    getUserProfileData,
    getUserFavorites,
} from '../../../store/reducers/userActionsSlice';
import UserContacts from './UserContacts/UserContacts';
import UserFavorites from './UserFavorites/UserFavorites';
import UserPasswordReset from './UserPasswordReset/UserPasswordReset';
import MobileContent from './MobileContent/MobileContent';
import { LinkType, UserActiveLinkContext } from '../UserCabinet';
import listOfRoutes from '../ListOfRoutes';
import DesktopContent from './DesktopContent/DesktopContent';
import useFetch from '../../../hooks/useFetch';
import { Loading } from '../../../types/types';
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
        case listOfRoutes[2].href:
            res = <UserPasswordReset />;
            break;
        default:
            res = '';
    }
    return res;
};

export const FavoritesContext = createContext<{ loading: Loading; data: any }>({
    loading: 'idle',
    data: null,
});

const CabinetContent = () => {
    const [currentScreenSize, setCurrentScreenSize] = useState<
        'desktop' | 'mobile' | null
    >(null);
    const { activeLink, setActiveLink } = useContext(UserActiveLinkContext);
    const { jwtToken } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const { loading, data } = useFetch(
        `product/homepage/status?status=1&countOfProducts=12`
    );

    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(getUserProfileData());
        dispatch(
            getUserFavorites({
                page: 0,
                size: 6,
            })
        );
    }, []);

    useEffect(() => {
        const checkSize = () => {
            const screenWidth = window.screen.width;
            if (screenWidth <= 961) {
                setCurrentScreenSize('mobile');
            } else {
                setCurrentScreenSize('desktop');
            }
        };

        if (window.screen.width <= 961) {
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
        if (!jwtToken) return;
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
            <FavoritesContext.Provider
                value={useMemo(
                    () => ({
                        loading,
                        data,
                    }),
                    [loading, data]
                )}
            >
                {currentScreenSize === 'desktop' ? (
                    <DesktopContent />
                ) : (
                    <MobileContent />
                )}
            </FavoritesContext.Provider>
        </div>
    );
};

export default memo(CabinetContent);
