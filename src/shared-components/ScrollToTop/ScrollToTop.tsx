import { useEffect } from 'react';
import { useLenis } from '@studio-freight/react-lenis';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
    const { pathname } = useLocation();
    const lenis = useLenis(({ scroll }) => {
        //
    });
    useEffect(() => {
        lenis?.scrollTo(0, {
            immediate: true,
        });
    }, [pathname]);

    return null;
}
