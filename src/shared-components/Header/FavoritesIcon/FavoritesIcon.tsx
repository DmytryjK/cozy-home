import {
    useEffect,
    useState,
    memo,
    MouseEvent,
    MouseEventHandler,
} from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import { API_SECURE } from '../../../utils/API_BASE';
import fetchData from '../../../utils/fetchData';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';

let controller: any;
const FavoritesIcon = () => {
    const [favoritesQuantity, setFavoritesQuantity] = useState(0);
    const loadingAddToFavoritesStatus = useAppSelector(
        (state) => state.userActions.loadingAddToFavorite
    );
    const loadingUserFavorites = useAppSelector(
        (state) => state.userActions.loadingUserFavorites
    );
    const jwtToken = useAppSelector((state) => state.auth.jwtToken);

    function fetchFavorites() {
        if (controller) {
            controller.abort();
        }

        controller = new AbortController();

        fetchData({
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            request: `${API_SECURE}user/favorites?page=${0}&size=${6}`,
            signal: controller.signal,
        })
            .then((data) => data.json())
            .then((res) => {
                if (!res) return;
                setFavoritesQuantity(res.countOfProducts || 0);
            })
            .catch((err) => {});
    }

    useEffect(() => {
        if (!jwtToken) return;
        if (loadingAddToFavoritesStatus === 'succeeded') {
            fetchFavorites();
        }
    }, [loadingAddToFavoritesStatus, jwtToken]);

    useEffect(() => {
        if (jwtToken) {
            fetchFavorites();
        }
    }, [jwtToken]);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (favoritesQuantity === 0 || !jwtToken) {
            event.preventDefault();
        }
    };

    return (
        <NavLink
            to="/cabinet/favorites"
            aria-label="Open favorite"
            className="header__icons-favorite"
            onClick={handleClick}
        >
            <svg width="21" height="21">
                <use href={`${headerSprite}#favorite-icon`} />
            </svg>
            <span className="header__icons_favorite-counter">
                {favoritesQuantity}
            </span>
        </NavLink>
    );
};

export default memo(FavoritesIcon);
