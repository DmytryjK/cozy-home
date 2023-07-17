import { useEffect, useState } from 'react';
import './ArrowUp.scss';

const ArrowUp = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [userScrollTop, setUserScrollTop] = useState<number>();
    const [userScrollBottom, setUserScrollBottom] = useState<number>();
    const scrollPosition = () => {
        const scrollTop = window.scrollY;
        const { scrollHeight, clientHeight } = document.documentElement;
        const scrollBottom = scrollHeight - clientHeight - scrollTop;
        setUserScrollTop(scrollTop);
        setUserScrollBottom(scrollBottom);
    };
    useEffect(() => {
        document.addEventListener('scroll', scrollPosition);
        return () => document.removeEventListener('scroll', scrollPosition);
    }, []);

    useEffect(() => {
        if (
            userScrollTop &&
            userScrollTop >= 0 &&
            userScrollBottom &&
            userScrollBottom > 250
        ) {
            setIsActive(true);
            return;
        }
        setIsActive(false);
    }, [userScrollTop, userScrollBottom]);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={`arrow-up ${isActive ? 'active' : ''}`}
            type="button"
            aria-label="arrow-up"
            onClick={handleScrollToTop}
        />
    );
};

export default ArrowUp;
