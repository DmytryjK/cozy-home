import { useEffect, useState } from 'react';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import CabinetNavigation from './CabinetNavigation/CabinetNavigation';
import CabinetContent from './CabinetContent/CabinetContent';
import './UserCabinet.scss';

export type LinkType = {
    title: string;
    href: string;
};

const UserCabinet = () => {
    return (
        <>
            <Breadcrumbs />
            <section className="cabinet">
                <div className="container">
                    <div className="cabinet__wrapper">
                        <CabinetNavigation />
                        <CabinetContent />
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserCabinet;
