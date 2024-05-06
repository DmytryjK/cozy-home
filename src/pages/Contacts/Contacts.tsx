import { LazyMotion, m, domAnimation } from 'framer-motion';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import Showrooms from './Showrooms/Showrooms';
import Social from './Social/Social';
import './Contacts.scss';

const Contacts = () => {
    return (
        <LazyMotion features={domAnimation}>
            <m.div
                className="contacts"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: {
                        duration: 0.7,
                        delay: 0,
                    },
                }}
                exit={{
                    opacity: 0,
                    display: 'none',
                }}
            >
                <Breadcrumbs />
                <h1 className="contacts__title contacts__title_no-display">
                    Контакти
                </h1>
                <Social />
                <Showrooms />
            </m.div>
        </LazyMotion>
    );
};

export default Contacts;
