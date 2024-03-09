import { useEffect, useState } from 'react';
import './PagePreloader.scss';

type Props = {
    headerRef: React.MutableRefObject<HTMLDivElement | null>;
    footerRef: React.MutableRefObject<HTMLDivElement | null>;
};
const PagePreloader = (props: Props) => {
    const { headerRef, footerRef } = props;
    const [headerHeight, setHeaderHeight] = useState(0);
    const [footerHeight, setFooterHeight] = useState(0);
    const [totalHeight, setTotalHeight] = useState(0);
    useEffect(() => {
        if (headerRef.current && footerRef.current) {
            setHeaderHeight(
                +getComputedStyle(headerRef.current).height.replace('px', '')
            );
            setFooterHeight(
                +getComputedStyle(footerRef.current).height.replace('px', '') +
                    +getComputedStyle(footerRef.current).marginTop.replace(
                        'px',
                        ''
                    )
            );
        }
    }, [headerRef, footerRef]);

    useEffect(() => {
        if (headerHeight && footerHeight) {
            setTotalHeight(+headerHeight + +footerHeight);
        }
    }, [headerHeight, footerHeight]);

    return (
        <div
            className="page-preloader"
            style={
                {
                    '--layout-height': `${totalHeight}px`,
                } as React.CSSProperties
            }
        />
    );
};

export default PagePreloader;
