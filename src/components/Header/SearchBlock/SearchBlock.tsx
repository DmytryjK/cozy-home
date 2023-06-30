import './SearchBlock.scss';
import searchIcon from '../../../assets/icons/header/search-icon.svg';
import closeIcon from '../../../assets/icons/header/close-icon.svg';

type Props = {
    handleSearchHide: () => void;
};

const SearchBlock = (props: Props) => {
    const { handleSearchHide } = props;
    return (
        <div className="mobileSearch">
            <label className="mobileSearch__block">
                <img
                    src={searchIcon}
                    alt="Search"
                    className="mobileSearch__block_searchIcon"
                />
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
                    <img src={closeIcon} alt="Close" />
                </button>
            </label>
        </div>
    );
};

export default SearchBlock;
