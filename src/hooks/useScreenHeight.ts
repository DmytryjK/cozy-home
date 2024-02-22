import { useEffect, useState } from 'react';

const useScreenHeight = () => {
    const [screenHeight, setScreenHeight] = useState<number | null>(null);

    const screenSizeChecker = () => {
        setScreenHeight(window.innerHeight);
    };

    useEffect(() => {
        screenSizeChecker();
        window.addEventListener('resize', screenSizeChecker);

        return () => window.removeEventListener('resize', screenSizeChecker);
    }, []);
    return screenHeight;
};

export default useScreenHeight;
