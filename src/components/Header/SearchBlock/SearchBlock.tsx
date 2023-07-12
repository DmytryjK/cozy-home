import { useEffect } from 'react';
import headerSprite from '../../../assets/icons/header/header-sprite.svg';
import './SearchBlock.scss';

type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
};

const SearchBlock = (props: Props) => {
    const { setIsOpen, isOpen } = props;

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'visible';
    }, [isOpen]);

    return (
        <div className={`searchBlock ${isOpen ? 'searchBlock-active' : ''}`}>
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
                        onClick={() => setIsOpen(false)}
                    >
                        <svg width="12" height="12">
                            <use href={`${headerSprite}#close-icon`} />
                        </svg>
                    </button>
                </label>
            </div>
        </div>
    );
};

export default SearchBlock;
