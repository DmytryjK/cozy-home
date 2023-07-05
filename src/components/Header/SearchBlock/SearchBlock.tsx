import './SearchBlock.scss';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';

type Props = {
    handleSearchHide: () => void;
};

const SearchBlock = (props: Props) => {
    const { handleSearchHide } = props;
    return (
        <div className="mobileSearch">
            <label className="mobileSearch__block">
                <svg
                    className="mobileSearch__block_searchIcon"
                    width="21"
                    height="21"
                >
                    <use href={`${headerSprite}#search-icon`} />
                </svg>
                <input
                    type="text"
                    placeholder="Пошук"
                    className="mobileSearch__block_input"
                />
                <button
                    type="button"
                    className="mobileSearch__block_closeIcon"
                    onClick={handleSearchHide}
                >
                    <svg width="12" height="12">
                        <use href={`${headerSprite}#close-icon`} />
                    </svg>
                </button>
            </label>
        </div>
    );
};

export default SearchBlock;
