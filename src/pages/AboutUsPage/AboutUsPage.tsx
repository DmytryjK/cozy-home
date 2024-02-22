import { useState, useEffect } from 'react';
import useScreenHeight from '../../hooks/useScreenHeight';
import Breadcrumbs from '../../shared-components/Breadcrumbs/Breadcrumbs';
import AboutUs from './AboutUs/AboutUs';
import OurValues from './OurValues/OurValues';
import OurServices from './OurServices/OurServices';
import OurGuarantees from './OurGuarantees/OurGuarantees';
import ContactUs from './ContactUs/ContactUs';
import './AboutUsPage.scss';

const AboutUsPage = () => {
    const [offset, setOffset] = useState<string>('0px');
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
        <div className="about-us-page">
            <Breadcrumbs />
            <AboutUs offset={offset} />
            <OurValues offset={offset} />
            <OurServices offset={offset} />
            <OurGuarantees offset={offset} />
            <ContactUs offset={offset} />
        </div>
    );
};

export default AboutUsPage;
