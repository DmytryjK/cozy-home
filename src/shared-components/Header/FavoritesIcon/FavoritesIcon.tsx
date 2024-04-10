import { useEffect, useState, memo, MouseEvent, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import { API_SECURE } from '../../../utils/API_BASE';
import fetchData from '../../../utils/fetchData';
import { Loader } from '../../Loaders';
import type { Loading } from '../../../types/types';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';

let controller: any;
const FavoritesIcon = ({
    isMobile,
    additionalText,
}: {
    isMobile?: boolean;
    additionalText?: string;
}) => {
    const [favoritesQuantity, setFavoritesQuantity] = useState(0);
    const loadingAddToFavoritesStatus = useAppSelector(
        (state) => state.userActions.loadingAddToFavorite
    );
    const jwtToken = useAppSelector((state) => state.auth.jwtToken);
    const [loadingQuantity, setLoadingQuantity] = useState<Loading>('idle');

    const fetchFavorites = useCallback(() => {
        setLoadingQuantity('pending');
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
                setLoadingQuantity('succeeded');
            })
            .catch((err) => {
                if (err.message.includes('aborted')) {
                    setLoadingQuantity('pending');
                } else {
                    setLoadingQuantity('failed');
                }
            });
    }, [loadingAddToFavoritesStatus === 'succeeded', jwtToken]);

    useEffect(() => {
        if (!jwtToken) return;
        if (loadingAddToFavoritesStatus === 'succeeded') {
            fetchFavorites();
        }
    }, [loadingAddToFavoritesStatus, jwtToken]);

    useEffect(() => {
        if (jwtToken) {
            fetchFavorites();
        } else {
            setFavoritesQuantity(0);
        }
    }, [jwtToken]);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (!jwtToken) {
            event.preventDefault();
        }
    };

    return (
        <NavLink
            to="/cabinet/favorites"
            aria-label="Open favorite"
            className={`header__icons-favorite ${
                isMobile ? 'header__icons-favorite_mobile' : ''
            }`}
            onClick={handleClick}
        >
            <svg width="21" height="21">
                <use href={`${headerSprite}#favorite-icon`} />
            </svg>
            <span className="header__icons_favorite-counter">
                {(loadingQuantity === 'succeeded' || !jwtToken) &&
                    favoritesQuantity}
                {loadingQuantity === 'pending' && (
                    <Loader className="header__icons_favorite-counter-loading" />
                )}
            </span>
            {additionalText ? <div>{additionalText}</div> : ''}
        </NavLink>
    );
};

export default memo(FavoritesIcon);
