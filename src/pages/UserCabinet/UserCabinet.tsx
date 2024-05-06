import {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useMemo,
    memo,
} from 'react';
import { LazyMotion, m, domAnimation } from 'framer-motion';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import CabinetNavigation from './CabinetNavigation/CabinetNavigation';
import CabinetContent from './CabinetContent/CabinetContent';
import './UserCabinet.scss';

export type LinkType = {
    title: string;
    href: string;
};

type ActiveLinkContextType = {
    activeLink: LinkType | null;
    setActiveLink: Dispatch<SetStateAction<LinkType | null>>;
};

export const UserActiveLinkContext = createContext<ActiveLinkContextType>({
    activeLink: null,
    setActiveLink: () => {},
});

const UserCabinet = () => {
    const [activeLink, setActiveLink] = useState<LinkType | null>(null);
    const variant = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                delay: 0.1,
                easing: 'easy-out',
            },
        },
    };
    return (
        <>
            <Breadcrumbs />
            <LazyMotion features={domAnimation} strict>
                <m.section
                    initial="hidden"
                    variants={variant}
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="cabinet"
                >
                    <div className="container">
                        <div className="cabinet__wrapper">
                            <UserActiveLinkContext.Provider
                                value={useMemo(
                                    () => ({ activeLink, setActiveLink }),
                                    [activeLink]
                                )}
                            >
                                <CabinetNavigation />
                                <CabinetContent />
                            </UserActiveLinkContext.Provider>
                        </div>
                    </div>
                </m.section>
            </LazyMotion>
        </>
    );
};

export default memo(UserCabinet);
