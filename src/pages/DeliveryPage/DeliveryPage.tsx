import { useState, useEffect } from 'react';
import useScreenHeight from '../../hooks/useScreenHeight';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import Aside from './Aside/Aside';
import DeliveryContent from './DeliveryContent/DeliveryContent';
import './DeliveryPage.scss';

const DeliveryPage = () => {
    const [offset, setOffset] = useState<string>('0px');
    const activeLinkIndexLocal = localStorage.getItem('currentDeliveryTab');
    const [activeLinkIndex, setActiveLinkIndex] = useState<number>(
        activeLinkIndexLocal ? +activeLinkIndexLocal : 0
    );
    const height = useScreenHeight();

    useEffect(() => {
        if (!height) return;

        if (height >= 1300) {
            setOffset('150px');
        } else if (height >= 900) {
            setOffset('90px');
        } else if (height < 850) {
            setOffset('60px');
        }
    }, [height]);

    return (
        <div className="delivery-page">
            <Breadcrumbs />
            <div className="container delivery-page__wrapper">
                <Aside activeLinkIndex={activeLinkIndex} />
                <DeliveryContent
                    setActiveLinkIndex={setActiveLinkIndex}
                    offset={offset}
                />
            </div>
        </div>
    );
};

export default DeliveryPage;
