import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLenis } from '@studio-freight/react-lenis';
import './Aside.scss';

type Props = {
    activeLinkIndex: number;
};

const Aside = (props: Props) => {
    const lenis = useLenis(({ scroll }) => {});
    const [screenWidth, setScreenWidth] = useState(window.screen.width);
    const { activeLinkIndex } = props;
    const { hash } = useLocation();
    const navigationLinks = [
        {
            name: 'Умови доставки',
            id: 'delivery-conditions',
        },
        {
            name: 'Важливі положення щодо доставки та оплати ',
            id: 'payment',
        },
        {
            name: 'Перевірка статусу замовлення',
            id: 'delivery-status',
        },
        {
            name: 'Обмін на повернення товарів ',
            id: 'refund-orders',
        },
    ];

    useEffect(() => {
        lenis?.scrollTo(`${hash}`, {
            offset: screenWidth > 960 ? -130 : -110,
            duration: 1.4,
        });
    }, []);

    useEffect(() => {
        localStorage.setItem('currentDeliveryTab', `${activeLinkIndex}`);
        return () => localStorage.setItem('currentDeliveryTab', '');
    }, [activeLinkIndex]);

    useEffect(() => {
        const screenChecker = () => {
            setScreenWidth(window.screen.width);
        };
        window.addEventListener('scroll', screenChecker);

        return () => window.removeEventListener('scroll', screenChecker);
    }, []);
    return (
        <aside className="aside">
            <ul className="aside__list">
                {navigationLinks.map((link, index) => {
                    const { id, name } = link;
                    return (
                        <li key={`desktop-${id}`} className="aside__item">
                            <a
                                className={`aside__item-link ${
                                    activeLinkIndex === index
                                        ? 'active-link'
                                        : ''
                                }`}
                                href={`#${id}`}
                                onClick={() => {
                                    lenis?.scrollTo(`#${id}`, {
                                        offset: screenWidth > 960 ? -100 : -130,
                                        duration: 1.4,
                                    });
                                }}
                            >
                                {name}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Aside;
