import headerSprites from '../../assets/icons/header/header-sprite.svg';
import './AddToFavoriteBtn.scss';

const AddToFavoriteBtn = () => {
    return (
        <button
            className="favorite-btn"
            type="button"
            aria-label="додати в обране"
        >
            <svg className="favorite-btn__icon" width="21" height="18">
                <use href={`${headerSprites}#favorite-icon`} />
            </svg>
        </button>
    );
};

export default AddToFavoriteBtn;
