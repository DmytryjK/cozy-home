import {
    ReactNode,
    useEffect,
    useState,
    useContext,
    createContext,
    useMemo,
    useCallback,
    SetStateAction,
    Dispatch,
    memo,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import {
    getUserProfileData,
    getUserFavorites,
    getUserFavoritCategories,
    getUserFavoritByCategory,
    resetFavoriteStatus,
} from '../../../store/reducers/userActionsSlice';
import UserContacts from './UserContacts/UserContacts';
import UserFavorites from './UserFavorites/UserFavorites';
import UserPasswordReset from './UserPasswordReset/UserPasswordReset';
import MobileContent from './MobileContent/MobileContent';
import { LinkType, UserActiveLinkContext } from '../UserCabinet';
import listOfRoutes from '../ListOfRoutes';
import DesktopContent from './DesktopContent/DesktopContent';
import type { NavigationCategory } from '../../../types/types';
import './CabinetContent.scss';

type FavoriteCurrentPage = {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    activeCategory: NavigationCategory;
    setActiveCategory: Dispatch<SetStateAction<NavigationCategory>>;
    isPaginationInit: boolean;
    setIsPaginationInit: Dispatch<SetStateAction<boolean>>;
};

export const FavoritesContext = createContext<FavoriteCurrentPage>({
    currentPage: 0,
    setCurrentPage: () => {},
    activeCategory: {
        name: 'Всі товари',
        id: '',
    },
    setActiveCategory: () => {},
    isPaginationInit: true,
    setIsPaginationInit: () => {},
});

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

const CabinetContent = () => {
    const PAGE_PAGINATION_SIZE = 2;
    const [currentScreenSize, setCurrentScreenSize] = useState<
        'desktop' | 'mobile' | null
    >(null);
    const { activeLink, setActiveLink } = useContext(UserActiveLinkContext);
    const [currentPage, setCurrentPage] = useState(0);
    const [isPaginationInit, setIsPaginationInit] = useState(true);
    const [activeCategory, setActiveCategory] = useState<NavigationCategory>({
        name: 'Всі товари',
        id: '',
    });
    const { jwtToken } = useAppSelector((state) => state.auth);
    const userFavorites = useAppSelector(
        (state) => state.userActions.userFavorites
    );
    const loadingAddToFavorite = useAppSelector(
        (state) => state.userActions.loadingAddToFavorite
    );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        dispatch(getUserProfileData());
        dispatch(getUserFavoritCategories());
        return () => {
            dispatch(resetFavoriteStatus());
        };
    }, []);

    useEffect(() => {
        if (isPaginationInit) return;
        if (activeCategory.id) {
            dispatch(
                getUserFavoritByCategory({
                    id: activeCategory.id,
                    size: PAGE_PAGINATION_SIZE,
                    page: currentPage,
                })
            );
        } else {
            dispatch(
                getUserFavorites({
                    page: currentPage,
                    size: PAGE_PAGINATION_SIZE,
                })
            );
        }
    }, [currentPage, isPaginationInit]);

    useEffect(() => {
        if (!activeCategory.id) {
            dispatch(
                getUserFavorites({
                    page: currentPage,
                    size: PAGE_PAGINATION_SIZE,
                })
            );
            return;
        }
        setCurrentPage(0);
        dispatch(
            getUserFavoritByCategory({
                id: activeCategory.id,
                size: PAGE_PAGINATION_SIZE,
            })
        );
    }, [activeCategory.id]);

    useEffect(() => {
        if (!userFavorites) return;
        if (loadingAddToFavorite !== 'succeeded') return;
        dispatch(getUserFavoritCategories());

        if (userFavorites.products.length === 1) {
            if (currentPage !== 0) {
                setCurrentPage(currentPage - 1);
                return;
            }
            if (activeCategory.id) {
                setActiveCategory({
                    name: 'Всі товари',
                    id: '',
                });
                return;
            }
            // dispatch(
            //     getUserFavorites({
            //         page: currentPage,
            //         size: 6,
            //     })
            // );
        }

        if (activeCategory.id) {
            dispatch(
                getUserFavoritByCategory({
                    id: activeCategory.id,
                    size: PAGE_PAGINATION_SIZE,
                    page: currentPage,
                })
            );
        } else {
            dispatch(
                getUserFavorites({
                    page: currentPage,
                    size: PAGE_PAGINATION_SIZE,
                })
            );
        }
    }, [loadingAddToFavorite]);

    const checkSize = useCallback(() => {
        const screenWidth = window.screen.width;
        if (screenWidth <= 961) {
            setCurrentScreenSize('mobile');
        } else {
            setCurrentScreenSize('desktop');
        }
    }, []);

    useEffect(() => {
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
                        currentPage,
                        setCurrentPage,
                        activeCategory,
                        setActiveCategory,
                        setIsPaginationInit,
                        isPaginationInit,
                    }),
                    [currentPage, activeCategory, isPaginationInit]
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
