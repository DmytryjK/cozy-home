import {
    useState,
    createContext,
    Dispatch,
    SetStateAction,
    useMemo,
    memo,
} from 'react';
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

    return (
        <>
            <Breadcrumbs />
            <section className="cabinet">
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
            </section>
        </>
    );
};

export default memo(UserCabinet);
