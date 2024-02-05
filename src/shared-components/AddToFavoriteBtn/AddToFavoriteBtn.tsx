import { useEffect, memo, useState, RefObject } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
    toggleFavoriteProduct,
    resetFavoriteStatus,
} from '../../store/reducers/userActionsSlice';
import './AddToFavoriteBtn.scss';

interface PropsType {
    productSkuCode: string;
    isFavorite: boolean;
    reference?: RefObject<HTMLDivElement | null>;
}

const AddToFavoriteBtn = (props: PropsType) => {
    const { productSkuCode, isFavorite, reference } = props;
    const [isAddedToFavorite, setIsAddedToFavorite] = useState(isFavorite);
    const [isClicked, setIsClicked] = useState(false);
    const loading = useAppSelector(
        (state) => state.userActions.loadingAddToFavorite
    );
    const error = useAppSelector(
        (state) => state.userActions.errorAddToFavorite
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isClicked && error) {
            setIsClicked(false);
            setIsAddedToFavorite(!isAddedToFavorite);
            dispatch(resetFavoriteStatus());
        }
    }, [error, isClicked]);

    useEffect(() => {
        if (loading === 'succeeded' && isClicked) {
            dispatch(resetFavoriteStatus());
        }
    }, [loading]);

    useEffect(() => {
        if (!reference || !reference.current) return;
        if (isAddedToFavorite) {
            reference.current.style.cssText = 'transform: translateX(0)';
        } else {
            reference.current.style.cssText = '';
        }
    }, [isAddedToFavorite, reference]);

    return (
        <button
            className={`favorite-btn ${isAddedToFavorite ? 'active' : ''}`}
            onClick={() => {
                setIsClicked(true);
                setIsAddedToFavorite(!isAddedToFavorite);
                dispatch(toggleFavoriteProduct(productSkuCode));
            }}
            type="button"
            aria-label="додати в обране"
            tabIndex={-1}
        >
            <svg
                className="favorite-btn__icon"
                width="20"
                height="17"
                viewBox="0 0 20 17"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 2.11572C11.0063 0.78662 12.6206 0 14.4644 0C15.9321 0.00146 17.3389 0.58057 18.377 1.60986C19.4146 2.63965 19.9985 4.03516 20 5.49072C20 11.6904 10.7329 16.708 10.3384 16.9155C10.2344 16.9707 10.1182 17 10 17C9.8818 17 9.7656 16.9707 9.6616 16.9155C9.2671 16.708 0 11.6904 0 5.49072C0.00146 4.03516 0.58545 2.63965 1.62305 1.60986C2.66113 0.58057 4.06787 0.00146 5.53564 0C7.37939 0 8.9937 0.78662 10 2.11572Z"
                />
                <path
                    d="M14.4643 0C12.6205 0 11.0063 0.786435 10 2.11576C8.99375 0.786435 7.37946 0 5.53571 0C4.06806 0.00164083 2.66099 0.580669 1.6232 1.61005C0.585411 2.63944 0.00165423 4.03511 0 5.49088C0 11.6903 9.26696 16.7082 9.66161 16.9154C9.76562 16.9709 9.88189 17 10 17C10.1181 17 10.2344 16.9709 10.3384 16.9154C10.733 16.7082 20 11.6903 20 5.49088C19.9983 4.03511 19.4146 2.63944 18.3768 1.61005C17.339 0.580669 15.9319 0.00164083 14.4643 0ZM10 15.4807C8.36964 14.5384 1.42857 10.2458 1.42857 5.49088C1.42999 4.41085 1.86316 3.37546 2.63309 2.61176C3.40302 1.84807 4.44687 1.41841 5.53571 1.417C7.27232 1.417 8.73036 2.33451 9.33929 3.80819C9.3931 3.93814 9.48465 4.04928 9.60229 4.1275C9.71994 4.20572 9.85837 4.24748 10 4.24748C10.1416 4.24748 10.2801 4.20572 10.3977 4.1275C10.5154 4.04928 10.6069 3.93814 10.6607 3.80819C11.2696 2.33185 12.7277 1.417 14.4643 1.417C15.5531 1.41841 16.597 1.84807 17.3669 2.61176C18.1368 3.37546 18.57 4.41085 18.5714 5.49088C18.5714 10.2387 11.6286 14.5375 10 15.4807Z"
                    fill="#262626"
                />
            </svg>
        </button>
    );
};

export default memo(AddToFavoriteBtn);
